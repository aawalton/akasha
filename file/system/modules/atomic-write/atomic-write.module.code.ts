import { chmodSync, renameSync, rmSync, statSync, writeFileSync } from "node:fs"
import { pause } from "akasha/code/modules/thread-pause/thread-pause.module.code.ts"

interface AtomicWriteOptions {
  readonly mode?: number
  readonly keepMode?: boolean
  readonly retryOnBusy?: boolean
  readonly onRetry?: (message: string) => void
}

const PERMISSIONS = 0o7777

function modeHeldAt(path: string): number | undefined {
  const held = statSync(path, { throwIfNoEntry: false })
  return held === undefined ? undefined : held.mode & PERMISSIONS
}

const MAX_ATTEMPTS = 5
const BACKOFF_MS = [200, 400, 800, 1600, 3200]

function isBusyError(err: unknown): boolean {
  if (err === null || typeof err !== "object" || !("code" in err)) return false
  const code = err.code
  return code === "EBUSY" || code === "EAGAIN"
}

const WRITTEN_BESIDE = /\.tmp-\d+-[a-z0-9]+$/

export function tempPathFor(path: string): string {
  return `${path}.tmp-${process.pid}-${Math.random().toString(36).slice(2, 10)}`
}

export function pathWrittenBeside(path: string): string | null {
  const found = WRITTEN_BESIDE.exec(path)
  return found === null ? null : path.slice(0, found.index)
}

function retrySync<T>(fn: () => T, label: string, onRetry?: (message: string) => void): T {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      return fn()
    } catch (err) {
      if (!isBusyError(err) || attempt === MAX_ATTEMPTS) throw err
      onRetry?.(`retrying ${label} (attempt ${attempt}/${MAX_ATTEMPTS})`)
      pause(BACKOFF_MS[attempt - 1] ?? 3200)
    }
  }
  throw new Error("unreachable")
}

export function writeFileAtomicSync(
  path: string,
  data: string | Uint8Array,
  options?: AtomicWriteOptions
): undefined {
  const tmp = tempPathFor(path)
  const mode = options?.mode ?? (options?.keepMode === true ? modeHeldAt(path) : undefined)
  const writeOpts = mode !== undefined ? { mode } : {}
  try {
    if (options?.retryOnBusy === true) {
      retrySync(() => writeFileSync(tmp, data, writeOpts), `write ${tmp}`, options.onRetry)
      if (mode !== undefined) chmodSync(tmp, mode)
      retrySync(() => renameSync(tmp, path), `rename ${tmp} -> ${path}`, options.onRetry)
    } else {
      writeFileSync(tmp, data, writeOpts)
      if (mode !== undefined) chmodSync(tmp, mode)
      renameSync(tmp, path)
    }
  } catch (err) {
    try {
      rmSync(tmp, { force: true })
    } catch {}
    throw err
  }
}
