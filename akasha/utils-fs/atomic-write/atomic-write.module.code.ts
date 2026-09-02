import { renameSync, rmSync, writeFileSync } from "node:fs"
import { rename, rm, writeFile } from "node:fs/promises"

export interface AtomicWriteOptions {
  readonly mode?: number
  readonly retryOnBusy?: boolean
  readonly onRetry?: (message: string) => void
}

const MAX_ATTEMPTS = 5
const BACKOFF_MS = [200, 400, 800, 1600, 3200]

function isBusyError(err: unknown): boolean {
  if (err === null || typeof err !== "object" || !("code" in err)) return false
  const code = err.code
  return code === "EBUSY" || code === "EAGAIN"
}

function tempPathFor(path: string): string {
  return `${path}.tmp-${process.pid}-${Math.random().toString(36).slice(2, 10)}`
}

function sleepSync(ms: number): undefined {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms)
}

function sleep(ms: number): Promise<undefined> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(undefined), ms)
  })
}

function retrySync<T>(fn: () => T, label: string, onRetry?: (message: string) => void): T {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      return fn()
    } catch (err) {
      if (!isBusyError(err) || attempt === MAX_ATTEMPTS) throw err
      onRetry?.(`retrying ${label} (attempt ${attempt}/${MAX_ATTEMPTS})`)
      sleepSync(BACKOFF_MS[attempt - 1] ?? 3200)
    }
  }
  throw new Error("unreachable")
}

async function retryAsync<T>(
  fn: () => Promise<T>,
  label: string,
  onRetry?: (message: string) => void
): Promise<T> {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      return await fn()
    } catch (err) {
      if (!isBusyError(err) || attempt === MAX_ATTEMPTS) throw err
      onRetry?.(`retrying ${label} (attempt ${attempt}/${MAX_ATTEMPTS})`)
      await sleep(BACKOFF_MS[attempt - 1] ?? 3200)
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
  const writeOpts = options?.mode !== undefined ? { mode: options.mode } : {}
  try {
    if (options?.retryOnBusy === true) {
      retrySync(() => writeFileSync(tmp, data, writeOpts), `write ${tmp}`, options.onRetry)
      retrySync(() => renameSync(tmp, path), `rename ${tmp} -> ${path}`, options.onRetry)
    } else {
      writeFileSync(tmp, data, writeOpts)
      renameSync(tmp, path)
    }
  } catch (err) {
    try {
      rmSync(tmp, { force: true })
    } catch {}
    throw err
  }
}

export async function writeFileAtomic(
  path: string,
  data: string | Uint8Array,
  options?: AtomicWriteOptions
): Promise<undefined> {
  const tmp = tempPathFor(path)
  const writeOpts = options?.mode !== undefined ? { mode: options.mode } : {}
  try {
    if (options?.retryOnBusy === true) {
      await retryAsync(() => writeFile(tmp, data, writeOpts), `write ${tmp}`, options.onRetry)
      await retryAsync(() => rename(tmp, path), `rename ${tmp} -> ${path}`, options.onRetry)
    } else {
      await writeFile(tmp, data, writeOpts)
      await rename(tmp, path)
    }
  } catch (err) {
    try {
      await rm(tmp, { force: true })
    } catch {}
    throw err
  }
}
