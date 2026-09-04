import { LOG } from "../supervisor-config/supervisor-config.module.code.ts"

const PENDING_NOTICE_MS = 5_000

function note(line: string): void {
  console.log(`${LOG} boot-stage: ${line}`)
}

export function stageSync<T>(label: string, work: () => T): T {
  note(`enter ${label}`)
  const startedMs = Date.now()
  const value = work()
  note(`leave ${label} ${Date.now() - startedMs}ms`)
  return value
}

export async function stage<T>(label: string, work: Promise<T>): Promise<T> {
  note(`enter ${label}`)
  const startedMs = Date.now()
  const pending = setTimeout(() => {
    note(`pending ${label} past ${PENDING_NOTICE_MS}ms`)
  }, PENDING_NOTICE_MS)
  pending.unref()
  try {
    const value = await work
    note(`leave ${label} ${Date.now() - startedMs}ms`)
    return value
  } catch (err) {
    note(`threw ${label} ${Date.now() - startedMs}ms`)
    throw err
  } finally {
    clearTimeout(pending)
  }
}
