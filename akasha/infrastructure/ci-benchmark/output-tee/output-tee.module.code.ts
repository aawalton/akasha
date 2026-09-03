import { mkdir, readdir, rm, stat } from "node:fs/promises"
import { homedir } from "node:os"
import { dirname, join } from "node:path"

export const LOCAL_LOGS_ROOT = join(homedir(), ".cache", "pipeline-engine", "local-logs")
export const TAIL_BYTES = 2000
const MAX_LOG_AGE_MS = 7 * 24 * 60 * 60 * 1000

export function resolveLogPath(seq: number, workflowName: string, stepName: string): string {
  return join(LOCAL_LOGS_ROOT, String(seq), workflowName, `${stepName}.log`)
}

export interface StreamProcessOutputOpts {
  proc: {
    stdout: ReadableStream<Uint8Array>
    stderr: ReadableStream<Uint8Array>
    exited: Promise<number>
  }
  prefix: string
  logPath?: string
  terminal?: {
    stdout?: { write: (data: string) => unknown }
    stderr?: { write: (data: string) => unknown }
  }
}

export interface StreamProcessOutputResult {
  exitCode: number
  tail: () => Promise<string>
}

export async function streamProcessOutput(
  opts: StreamProcessOutputOpts
): Promise<StreamProcessOutputResult> {
  type FileSink = ReturnType<ReturnType<typeof Bun.file>["writer"]>
  let sink: FileSink | undefined
  if (opts.logPath != null) {
    await mkdir(dirname(opts.logPath), { recursive: true })
    sink = Bun.file(opts.logPath).writer()
  }

  const tailChunks: Uint8Array[] = []
  let tailBytes = 0
  function captureTail(chunk: Uint8Array): undefined {
    tailChunks.push(chunk)
    tailBytes += chunk.length
    while (tailBytes > TAIL_BYTES && tailChunks.length > 1) {
      const dropped = tailChunks.shift()
      if (dropped) tailBytes -= dropped.length
    }
  }

  async function drain(
    stream: ReadableStream<Uint8Array>,
    terminal: { write: (data: string) => unknown } | undefined
  ): Promise<void> {
    const reader = stream.getReader()
    const dec = new TextDecoder()
    let carry = ""
    try {
      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        if (sink) sink.write(value)
        captureTail(value)
        if (terminal) {
          const text = carry + dec.decode(value, { stream: true })
          const lastNl = text.lastIndexOf("\n")
          if (lastNl === -1) {
            carry = text
          } else {
            const completeLines = text.slice(0, lastNl + 1)
            carry = text.slice(lastNl + 1)
            terminal.write(completeLines.replace(/^(.+)$/gm, `${opts.prefix}$1`))
          }
        }
      }
      if (terminal && carry.length > 0) {
        terminal.write(`${opts.prefix}${carry}\n`)
      }
    } finally {
      reader.releaseLock()
    }
  }

  const [, , exitCode] = await Promise.all([
    drain(opts.proc.stdout, opts.terminal?.stdout),
    drain(opts.proc.stderr, opts.terminal?.stderr),
    opts.proc.exited,
  ])

  if (sink) {
    await sink.flush()
    sink.end()
  }

  return {
    exitCode,
    async tail(): Promise<string> {
      if (opts.logPath != null) {
        const file = Bun.file(opts.logPath)
        const size = file.size
        const start = Math.max(0, size - TAIL_BYTES)
        return await file.slice(start).text()
      }
      const buf = new Uint8Array(tailBytes)
      let offset = 0
      for (const chunk of tailChunks) {
        buf.set(chunk, offset)
        offset += chunk.length
      }
      const text = new TextDecoder().decode(buf)
      return text.length > TAIL_BYTES ? text.slice(-TAIL_BYTES) : text
    },
  }
}

export async function pruneLocalLogs(
  rootDir: string = LOCAL_LOGS_ROOT,
  maxAgeMs: number = MAX_LOG_AGE_MS
): Promise<void> {
  let entries: string[]
  try {
    entries = await readdir(rootDir)
  } catch {
    return
  }
  const cutoff = Date.now() - maxAgeMs
  await Promise.all(
    entries.map(async (name) => {
      const full = join(rootDir, name)
      try {
        const s = await stat(full)
        if (s.mtimeMs < cutoff) {
          await rm(full, { recursive: true, force: true })
        }
      } catch {}
    })
  )
}
