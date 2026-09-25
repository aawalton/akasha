import {
  type IdleObservation,
  preservingRestartVerdict,
} from "akasha/agent/seat/supervisor/seat-agent-idleness/modules/supervisor-idle-decide/supervisor-idle-decide.module.code.ts"

interface BoundedIdleReading {
  idle: boolean
  reason: string
  obs: IdleObservation | null
}

export async function readIdleBounded(opts: {
  observe: () => Promise<IdleObservation>
  tickMs: number
}): Promise<BoundedIdleReading> {
  let deadlineId: ReturnType<typeof setTimeout> | undefined
  const deadline = new Promise<BoundedIdleReading>((resolve) => {
    deadlineId = setTimeout(
      () => resolve({ idle: false, reason: "probe-timeout", obs: null }),
      opts.tickMs
    )
    deadlineId.unref?.()
  })
  try {
    return await Promise.race([
      opts
        .observe()
        .then((obs) => ({ ...preservingRestartVerdict(obs), obs }))
        .catch(() => ({ idle: false, reason: "probe-error", obs: null })),
      deadline,
    ])
  } finally {
    if (deadlineId !== undefined) clearTimeout(deadlineId)
  }
}
