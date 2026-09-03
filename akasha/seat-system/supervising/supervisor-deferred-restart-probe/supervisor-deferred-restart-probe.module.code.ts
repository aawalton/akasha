import type { IdleObservation, IdleRuleSource } from "@tools/lib/supervisor-idle-rule"

export interface BoundedIdleReading {
  idle: boolean
  reason: string
  obs: IdleObservation | null
}

export async function readIdleBounded(opts: {
  observe: () => Promise<IdleObservation>
  idleRule: IdleRuleSource
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
        .then(async (obs) => {
          const { value } = await opts.idleRule.preservingRestart(obs)
          return { idle: value.idle, reason: value.reason, obs }
        })
        .catch(() => ({ idle: false, reason: "probe-error", obs: null })),
      deadline,
    ])
  } finally {
    if (deadlineId !== undefined) clearTimeout(deadlineId)
  }
}
