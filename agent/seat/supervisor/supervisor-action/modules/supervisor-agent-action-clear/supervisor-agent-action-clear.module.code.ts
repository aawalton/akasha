import { LOG } from "akasha/agent/seat/supervisor/modules/supervisor-config/supervisor-config.module.code.ts"
import { clearControl } from "akasha/agent/seat/supervisor/supervisor-action/modules/seat-control/seat-control.module.code.ts"
import "akasha/temper/eso/type/eso-timers/eso-timers.type-declaration.d.ts"

export async function clearRequestedAction(agentId: string): Promise<void> {
  clearControl(agentId)
}

const CLEAR_AT_FIRE_TIMEOUT_MS = 5_000

export async function clearBeforeSigterm(
  clearAction: (given: string) => Promise<void>,
  agentId: string,
  boundMs: number = CLEAR_AT_FIRE_TIMEOUT_MS
): Promise<void> {
  let timer: ReturnType<typeof setTimeout> | undefined
  const deadline = new Promise<void>((resolve) => {
    timer = setTimeout(resolve, boundMs)
    timer.unref?.()
  })
  try {
    await Promise.race([
      clearAction(agentId).catch((err) => {
        console.error(`${LOG} clear-at-fire clear failed for ${agentId}:`, err)
      }),
      deadline,
    ])
  } finally {
    if (timer) clearTimeout(timer)
  }
}

export async function consumeThenProxySwap(deps: {
  clear: () => Promise<void>
  swap: () => void
}): Promise<void> {
  await deps.clear()
  deps.swap()
}
