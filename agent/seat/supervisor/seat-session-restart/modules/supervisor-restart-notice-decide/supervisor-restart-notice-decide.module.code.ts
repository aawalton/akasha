export interface RestartNowEvent {
  readonly action: "restart-now"
  readonly interruptMessage: string | null
}

export interface ResumeNotices {
  readonly "restart-immediate": string
  readonly "restart-deferred": string
  readonly "restart-recovery-clause": string
}

export type RestartNoticeRoute = "spawn-argv" | "rail"

export interface RestartNoticeContext {
  readonly maintenance: boolean
  readonly reExecPending: boolean
}

function selectRestartNoticeBody(
  event: RestartNowEvent,
  ctx: RestartNoticeContext,
  notices: ResumeNotices
): { route: RestartNoticeRoute; body: string } {
  if (ctx.maintenance) return { route: "rail", body: notices["restart-deferred"] }
  return {
    route: ctx.reExecPending ? "rail" : "spawn-argv",
    body: event.interruptMessage ?? notices["restart-immediate"],
  }
}

export function planRestartNotice(
  event: RestartNowEvent,
  ctx: RestartNoticeContext,
  notices: ResumeNotices
): { route: RestartNoticeRoute; notice: string } {
  const { route, body } = selectRestartNoticeBody(event, ctx, notices)
  const clause = notices["restart-recovery-clause"]
  return { route, notice: clause === "" ? body : `${body}\n\n${clause}` }
}
