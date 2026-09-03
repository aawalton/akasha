export type StepProjection = {
  readonly workflowName: string
  readonly stepName: string | undefined
  readonly status: string | undefined
  readonly exitCode: number | undefined
  readonly durationMs: number | undefined
  readonly podName: string | undefined
  readonly startedAt: string | undefined
  readonly completedAt: string | undefined
  readonly failReason: string | undefined
  readonly skipReason: string | undefined
  readonly admissionRejectedReason: string | undefined
  readonly blockedBy: string | undefined
  readonly infraSignatureClass: string | undefined
  readonly dispatchWaitReason: string | undefined
  readonly dispatchWaitNode: string | undefined
  readonly dispatchWaitSince: number | undefined
}

function formatNumber(value: number | undefined): string {
  return value === undefined ? "" : String(value)
}

function formatAge(ms: number): string {
  if (ms < 60_000) return `${Math.floor(ms / 1000)}s`
  const totalMinutes = Math.floor(ms / 60_000)
  const h = Math.floor(totalMinutes / 60)
  const m = totalMinutes % 60
  return h > 0 ? `${h}h${m}m` : `${m}m`
}

export function computeDurationMs(
  startedAt: string | undefined,
  completedAt: string | undefined
): number | undefined {
  if (startedAt === undefined || completedAt === undefined) return undefined
  const start = Date.parse(startedAt)
  const end = Date.parse(completedAt)
  if (Number.isNaN(start) || Number.isNaN(end)) return undefined
  return end - start
}

function sanitizeCell(value: string): string {
  return value.replace(/\s+/g, " ").trim()
}

function formatDispatchWait(
  reason: string | undefined,
  node: string | undefined,
  since: number | undefined,
  completedAt: string | undefined,
  nowMs: number
): string {
  if (reason === undefined) return ""
  const endedMs = completedAt === undefined ? nowMs : Date.parse(completedAt)
  const asOf = Number.isNaN(endedMs) ? nowMs : endedMs
  const where = node !== undefined ? `@${node}` : ""
  const age = since !== undefined && since <= asOf ? ` (${formatAge(asOf - since)})` : ""
  return `${reason}${where}${age}`
}

function formatReason(step: StepProjection): string {
  const reason =
    step.failReason ?? step.skipReason ?? step.admissionRejectedReason ?? step.blockedBy
  return reason === undefined ? "" : sanitizeCell(reason)
}

export function formatStepRow(step: StepProjection, nowMs: number): string {
  const duration = step.durationMs === undefined ? "" : formatAge(step.durationMs)
  const wait = formatDispatchWait(
    step.dispatchWaitReason,
    step.dispatchWaitNode,
    step.dispatchWaitSince,
    step.completedAt,
    nowMs
  )
  return [
    step.workflowName,
    step.stepName ?? "",
    step.status ?? "",
    formatNumber(step.exitCode),
    duration,
    step.podName ?? "",
    wait,
    formatReason(step),
  ].join("\t")
}
