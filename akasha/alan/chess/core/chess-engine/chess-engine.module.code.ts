import { OperationalError } from "@akasha/errors-core/exit-code"
import { z } from "zod"

const BIN_SCHEMA = z.string().min(1).optional()

function binOverride(envVar: string): string | undefined {
  return BIN_SCHEMA.parse(process.env[envVar])
}

const DEFAULT_TIMEOUT_MS = 15_000

export function resolveStockfishPath(): string {
  const override = binOverride("CHESS_STOCKFISH_BIN")
  if (override !== undefined) {
    return override
  }
  const found = Bun.which("stockfish")
  if (found === null) {
    throw new OperationalError(
      "stockfish binary not found on PATH and CHESS_STOCKFISH_BIN unset — install it (`brew install stockfish`) or set CHESS_STOCKFISH_BIN"
    )
  }
  return found
}

export function stockfishAvailable(): boolean {
  if (binOverride("CHESS_STOCKFISH_BIN") !== undefined) {
    return true
  }
  return Bun.which("stockfish") !== null
}

export function resolveLc0Path(): string {
  const override = binOverride("CHESS_LC0_BIN")
  if (override !== undefined) {
    return override
  }
  const found = Bun.which("lc0")
  if (found === null) {
    throw new OperationalError(
      "lc0 binary not found on PATH and CHESS_LC0_BIN unset — install it (`brew install lc0`) or set CHESS_LC0_BIN"
    )
  }
  return found
}

export function lc0Available(): boolean {
  if (binOverride("CHESS_LC0_BIN") !== undefined) {
    return true
  }
  return Bun.which("lc0") !== null
}

export interface EngineRunSpec {
  readonly bin?: string
  readonly options?: readonly string[]
  readonly commands: readonly string[]
  readonly until: (line: string) => boolean
  readonly timeoutMs?: number
}

export async function runEngine(spec: EngineRunSpec): Promise<readonly string[]> {
  const bin = spec.bin ?? resolveStockfishPath()
  const timeoutMs = spec.timeoutMs ?? DEFAULT_TIMEOUT_MS

  const proc = Bun.spawn([bin], { stdin: "pipe", stdout: "pipe", stderr: "ignore" })

  const input = ["uci", "isready", ...(spec.options ?? []), ...spec.commands, ""].join("\n")
  proc.stdin.write(input)
  proc.stdin.flush()

  const lines: string[] = []
  let settled = false
  const finish = (): undefined => {
    if (settled) {
      return
    }
    settled = true
    try {
      proc.stdin.write("quit\n")
      proc.stdin.flush()
      proc.stdin.end()
    } catch {}
    proc.kill()
  }

  const timer = setTimeout(() => {
    finish()
  }, timeoutMs)

  try {
    const decoder = new TextDecoder()
    let buffer = ""
    for await (const chunk of proc.stdout) {
      buffer += decoder.decode(chunk, { stream: true })
      let nl = buffer.indexOf("\n")
      while (nl !== -1) {
        const line = buffer.slice(0, nl).replace(/\r$/, "")
        buffer = buffer.slice(nl + 1)
        lines.push(line)
        if (spec.until(line)) {
          finish()
          clearTimeout(timer)
          return lines
        }
        nl = buffer.indexOf("\n")
      }
    }
  } finally {
    clearTimeout(timer)
    finish()
  }

  if (!lines.some((l) => spec.until(l))) {
    throw new OperationalError(
      `engine "${bin}" did not emit the expected terminal line within ${timeoutMs}ms`
    )
  }
  return lines
}
