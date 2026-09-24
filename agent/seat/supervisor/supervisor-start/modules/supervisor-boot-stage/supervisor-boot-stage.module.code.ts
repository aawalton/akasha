import { LOG } from "akasha/agent/seat/supervisor/modules/supervisor-config/supervisor-config.module.code.ts"
import "akasha/temper/eso/type/eso-timers/eso-timers.type-declaration.d.ts"

const PENDING_NOTICE_MS = 5_000

function note(line: string): undefined {
  console.log(`${LOG} boot-stage: ${line}`)
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
