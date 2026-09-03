import { type ChildProcess, spawn } from "node:child_process"
import { existsSync } from "node:fs"
import * as os from "node:os"
import * as path from "node:path"
import type { Readable } from "node:stream"

const START_TIMEOUT_MS = 15_000

const WRITE_TIMEOUT_MS = 60_000

const DRAIN_TIMEOUT_MS = 5_000

const WRITER_MAIN = "observation-writer-main.module.code.ts"

export interface WriterAsk {
  readonly act: string
  readonly pageType: string
  readonly name: string
  readonly url: string
  readonly method: string
  readonly headers: Record<string, string>
  readonly body: string
}

export interface WriterAnswer {
  readonly ok: boolean
  readonly status: number
  readonly body: unknown
  readonly saying?: string
}

export interface WriterAt {
  readonly bun: string
  readonly mainFile: string
  readonly env: NodeJS.ProcessEnv
  readonly onNoise?: (text: string) => void
}

interface Waiting {
  readonly settle: (answer: WriterAnswer) => void
  readonly refuse: (err: Error) => void
  readonly timer: ReturnType<typeof setTimeout>
}

interface Session {
  readonly child: ChildProcess
  readonly waiting: Map<number, Waiting>
  lost: boolean
}

export function writerMainIn(akashaRoot: string): string {
  return path.join(akashaRoot, "akasha", "editor-extension", "observation-writer-main", WRITER_MAIN)
}

export function bunIn(homeDirectory: string = os.homedir()): string {
  const directory = path.join(homeDirectory, ".bun", "bin")
  if (!existsSync(path.join(directory, "bun"))) {
    throw new Error(`bun is not installed in ${directory}, and the observation writer needs it`)
  }
  return path.join(directory, "bun")
}

export type Writing = {
  readonly ask: (one: WriterAsk) => Promise<WriterAnswer>
  readonly dispose: () => Promise<void>
}

export function writingTo(at: WriterAt): Writing {
  let session: Session | null = null
  let starting: Promise<Session> | null = null
  let nextId = 1
  let disposed = false

  async function ask(one: WriterAsk): Promise<WriterAnswer> {
    if (disposed) {
      throw new Error("the observation writer has been disposed and starts no child")
    }
    const held = session
    if (held !== null && !held.lost) {
      return handOver(held, one)
    }

    const asking = await open()
    if (disposed) {
      if (session === asking) {
        retire(asking, "SIGKILL")
      }
      throw new Error("the observation writer was disposed while this write was being handed over")
    }
    return handOver(asking, one)
  }

  function handOver(asking: Session, one: WriterAsk): Promise<WriterAnswer> {
    const id = nextId++
    return new Promise<WriterAnswer>((settle, refuse) => {
      const timer = setTimeout(() => {
        asking.waiting.delete(id)
        retire(asking, "SIGKILL")
        refuse(new Error(`the observation writer did not answer within ${WRITE_TIMEOUT_MS}ms`))
      }, WRITE_TIMEOUT_MS)
      timer.unref?.()
      asking.waiting.set(id, { settle, refuse, timer })
      try {
        asking.child.stdin?.write(`${JSON.stringify({ id, ...one })}\n`)
      } catch (thrown) {
        clearTimeout(timer)
        asking.waiting.delete(id)
        refuse(new Error(`the observation write could not be handed over: ${String(thrown)}`))
      }
    })
  }

  async function dispose(): Promise<void> {
    disposed = true
    const going = session
    if (going === null || going.lost) {
      return
    }
    session = null
    await new Promise<void>((done) => {
      const timer = setTimeout(() => {
        try {
          going.child.kill("SIGKILL")
        } catch {}
        done()
      }, DRAIN_TIMEOUT_MS)
      timer.unref?.()
      going.child.on("exit", () => {
        clearTimeout(timer)
        done()
      })
      try {
        going.child.stdin?.end()
      } catch {
        clearTimeout(timer)
        done()
      }
    })
  }

  async function open(): Promise<Session> {
    const held = session
    if (held !== null && !held.lost) {
      return held
    }
    const already = starting
    if (already !== null) {
      return already
    }
    const began = start()
    starting = began
    try {
      const opened = await began
      session = opened
      return opened
    } finally {
      if (starting === began) {
        starting = null
      }
    }
  }

  function start(): Promise<Session> {
    return new Promise<Session>((ready, refuse) => {
      let child: ChildProcess
      try {
        child = spawn(at.bun, [at.mainFile], {
          env: at.env,
          stdio: ["pipe", "pipe", "pipe", "pipe"],
        })
      } catch (thrown) {
        refuse(new Error(`the observation writer could not be started: ${String(thrown)}`))
        return
      }
      const protocol = child.stdio[3] as Readable | undefined
      if (protocol === undefined || protocol === null) {
        child.kill("SIGKILL")
        refuse(new Error("the fourth pipe every answer comes back on was not opened"))
        return
      }
      const fresh: Session = { child, waiting: new Map(), lost: false }
      let settled = false
      const timer = setTimeout(() => {
        if (settled) {
          return
        }
        settled = true
        retire(fresh, "SIGKILL")
        refuse(new Error(`the observation writer said no hello within ${START_TIMEOUT_MS}ms`))
      }, START_TIMEOUT_MS)
      timer.unref?.()

      const noise = (text: string): undefined => {
        at.onNoise?.(text)
        return undefined
      }
      child.stdout?.setEncoding("utf8")
      child.stdout?.on("data", (chunk: string) => noise(`stdout: ${chunk.trimEnd()}`))
      child.stderr?.setEncoding("utf8")
      child.stderr?.on("data", (chunk: string) => noise(`stderr: ${chunk.trimEnd()}`))
      child.stdin?.on("error", (err) => {
        lose(fresh, `the observation writer could not be written to: ${String(err)}`)
      })
      child.on("error", (err) => {
        lose(fresh, `the observation writer could not be run: ${String(err)}`)
        if (!settled) {
          settled = true
          clearTimeout(timer)
          refuse(new Error(String(err)))
        }
      })
      child.on("exit", (code, signal) => {
        lose(
          fresh,
          `the observation writer exited (code ${String(code)}, signal ${String(signal)})`
        )
        if (!settled) {
          settled = true
          clearTimeout(timer)
          refuse(new Error(`it exited before saying hello (code ${String(code)})`))
        }
      })

      let held = ""
      protocol.setEncoding("utf8")
      protocol.on("data", (chunk: string) => {
        held += chunk
        for (;;) {
          const cut = held.indexOf("\n")
          if (cut < 0) {
            break
          }
          const line = held.slice(0, cut)
          held = held.slice(cut + 1)
          if (line.trim() === "") {
            continue
          }
          const said = readLine(line)
          if (said === null) {
            noise(
              `a line on the answer pipe was not JSON and was thrown away: ${line.slice(0, 200)}`
            )
            continue
          }
          if (typeof said["hello"] === "number") {
            if (settled) {
              continue
            }
            settled = true
            clearTimeout(timer)
            ready(fresh)
            continue
          }
          took(fresh, said)
        }
      })
    })
  }

  function took(one: Session, said: Record<string, unknown>): undefined {
    const id = said["id"]
    if (typeof id !== "number") {
      return undefined
    }
    const held = one.waiting.get(id)
    if (held === undefined) {
      return undefined
    }
    one.waiting.delete(id)
    clearTimeout(held.timer)
    held.settle({
      ok: said["ok"] === true,
      status: typeof said["status"] === "number" ? said["status"] : 500,
      body: said["body"] ?? null,
      ...(typeof said["saying"] === "string" ? { saying: said["saying"] } : {}),
    })
    return undefined
  }

  function lose(one: Session, saying: string): undefined {
    if (one.lost) {
      return undefined
    }
    one.lost = true
    if (session === one) {
      session = null
    }
    for (const [id, held] of [...one.waiting]) {
      one.waiting.delete(id)
      clearTimeout(held.timer)
      held.refuse(new Error(saying))
    }
    return undefined
  }

  function retire(one: Session, how: NodeJS.Signals): undefined {
    if (session === one) {
      session = null
    }
    one.lost = true
    try {
      one.child.stdin?.end()
    } catch {}
    try {
      one.child.kill(how)
    } catch {}
    return undefined
  }

  return { ask, dispose }
}

function readLine(line: string): Record<string, unknown> | null {
  try {
    const said: unknown = JSON.parse(line)
    return said === null || typeof said !== "object" ? null : (said as Record<string, unknown>)
  } catch {
    return null
  }
}
