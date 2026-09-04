import { type ChildProcess, spawn } from "node:child_process"
import type { Readable } from "node:stream"

export const REFUSAL_LEASE = "lease"

export const REFUSAL_GONE = "gone"

export const REFUSAL_OVER_LEASE = "over-lease"

export const REFUSAL_HUNG = "hung"

export const REFUSAL_START = "start"

export const REFUSAL_DISPOSED = "disposed"

const START_ANOTHER: ReadonlySet<string> = new Set([REFUSAL_LEASE, REFUSAL_GONE])

export class CommandServerRefusal extends Error {
  readonly refusal: string

  constructor(refusal: string, message: string) {
    super(message)
    this.name = "CommandServerRefusal"
    this.refusal = refusal
  }
}

export interface ServedAnswer {
  readonly stdout: string
  readonly stderr: string
  readonly code: number
  readonly ageMs: number
  readonly pid: number
}

export interface CommandServerAt {
  readonly bun: string
  readonly serverFile: string
  readonly env: NodeJS.ProcessEnv
  readonly startTimeoutMs: number
  readonly leaseBoundMs?: number
  readonly onNoise?: (text: string) => void
}

interface Waiting {
  readonly settle: (answer: ServedAnswer) => void
  readonly refuse: (err: Error) => void
  readonly timer: ReturnType<typeof setTimeout>
}

interface Session {
  readonly child: ChildProcess
  readonly waiting: Map<number, Waiting>
  leaseMs: number
  lost: boolean
}

function refusalOf(refusal: string, saying: string): CommandServerRefusal {
  return new CommandServerRefusal(refusal, `the command server refuses (${refusal}): ${saying}`)
}

export type Serving = {
  readonly ask: (
    command: string,
    args: readonly string[],
    timeoutMs: number
  ) => Promise<ServedAnswer>
  readonly dispose: () => undefined
}

export function servingFrom(at: CommandServerAt): Serving {
  let session: Session | null = null
  let starting: Promise<Session> | null = null
  let nextId = 1
  let disposed = false

  async function ask(
    command: string,
    args: readonly string[],
    timeoutMs: number
  ): Promise<ServedAnswer> {
    const asking = await open()
    const id = nextId++
    const answer = await new Promise<ServedAnswer>((settle, refuse) => {
      const timer = setTimeout(() => {
        asking.waiting.delete(id)
        retire(asking, "SIGKILL")
        refuse(
          refusalOf(
            REFUSAL_HUNG,
            `${command} was not answered within ${timeoutMs}ms, so the server was killed`
          )
        )
      }, timeoutMs)
      asking.waiting.set(id, { settle, refuse, timer })
      try {
        asking.child.stdin?.write(`${JSON.stringify({ id, verb: command, args: [...args] })}\n`)
      } catch (thrown) {
        clearTimeout(timer)
        asking.waiting.delete(id)
        refuse(refusalOf(REFUSAL_GONE, `the ask could not be written: ${String(thrown)}`))
      }
    })
    const bound = at.leaseBoundMs ?? asking.leaseMs
    if (answer.ageMs > bound) {
      retire(asking, "SIGTERM")
      throw refusalOf(
        REFUSAL_OVER_LEASE,
        `${command} was answered by a server ${answer.ageMs}ms old, past its bound of ${bound}ms`
      )
    }
    return answer
  }

  function dispose(): undefined {
    disposed = true
    if (session !== null) {
      retire(session, "SIGTERM")
    }
    return undefined
  }

  async function open(): Promise<Session> {
    if (disposed) {
      throw refusalOf(REFUSAL_DISPOSED, "this client has been disposed and starts no server")
    }
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
        child = spawn(at.bun, [at.serverFile], {
          env: at.env,
          stdio: ["pipe", "pipe", "pipe", "pipe"],
        })
      } catch (thrown) {
        refuse(refusalOf(REFUSAL_START, `bun could not be started: ${String(thrown)}`))
        return
      }
      const protocol = child.stdio[3] as Readable | undefined
      if (protocol === undefined || protocol === null) {
        child.kill("SIGKILL")
        refuse(
          refusalOf(REFUSAL_START, "the fourth pipe every answer comes back on was not opened")
        )
        return
      }
      const fresh: Session = { child, waiting: new Map(), leaseMs: 0, lost: false }
      let settled = false
      const timer = setTimeout(() => {
        if (settled) {
          return
        }
        settled = true
        retire(fresh, "SIGKILL")
        refuse(refusalOf(REFUSAL_START, `no hello arrived within ${at.startTimeoutMs}ms`))
      }, at.startTimeoutMs)

      const noise = (text: string): undefined => {
        at.onNoise?.(text)
        return undefined
      }
      child.stdout?.setEncoding("utf8")
      child.stdout?.on("data", (chunk: string) => noise(`stdout: ${chunk}`))
      child.stderr?.setEncoding("utf8")
      child.stderr?.on("data", (chunk: string) => noise(`stderr: ${chunk}`))
      child.on("error", (err) => {
        lose(fresh, `the command server could not be run: ${String(err)}`)
        if (!settled) {
          settled = true
          clearTimeout(timer)
          refuse(refusalOf(REFUSAL_START, String(err)))
        }
      })
      child.on("exit", (code, signal) => {
        lose(fresh, `the command server exited (code ${String(code)}, signal ${String(signal)})`)
        if (!settled) {
          settled = true
          clearTimeout(timer)
          refuse(refusalOf(REFUSAL_START, `it exited before saying hello (code ${String(code)})`))
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
            fresh.leaseMs = typeof said["leaseMs"] === "number" ? said["leaseMs"] : 0
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
    if (said["ok"] !== true) {
      const refusal = typeof said["refusal"] === "string" ? said["refusal"] : "refused"
      const saying = typeof said["saying"] === "string" ? said["saying"] : JSON.stringify(said)
      if (refusal === REFUSAL_LEASE) {
        retire(one, "SIGTERM")
      }
      held.refuse(refusalOf(refusal, saying))
      return undefined
    }
    held.settle({
      stdout: typeof said["stdout"] === "string" ? said["stdout"] : "",
      stderr: typeof said["stderr"] === "string" ? said["stderr"] : "",
      code: typeof said["code"] === "number" ? said["code"] : 0,
      ageMs: typeof said["ageMs"] === "number" ? said["ageMs"] : Number.POSITIVE_INFINITY,
      pid: typeof said["pid"] === "number" ? said["pid"] : 0,
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
      held.refuse(refusalOf(REFUSAL_GONE, saying))
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

export async function askServed(
  client: Serving,
  command: string,
  args: readonly string[],
  timeoutMs: number
): Promise<ServedAnswer> {
  try {
    return await client.ask(command, args, timeoutMs)
  } catch (thrown) {
    if (thrown instanceof CommandServerRefusal && START_ANOTHER.has(thrown.refusal)) {
      return client.ask(command, args, timeoutMs)
    }
    throw thrown
  }
}
