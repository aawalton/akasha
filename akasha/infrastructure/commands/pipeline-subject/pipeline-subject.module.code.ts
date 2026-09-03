export type Row = Record<string, unknown>

function asString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined
}

function asNumber(value: unknown): number | undefined {
  return typeof value === "number" ? value : undefined
}

export function pipelineSubjectOf(row: Row): string {
  const seq = asNumber(row.seq)
  const branch = asString(row.branch)
  const commitSha = asString(row.commit)
  const head = seq === undefined ? "pipeline" : `pipeline #${seq}`
  if (branch !== undefined && commitSha !== undefined) return `${head} (${branch} @ ${commitSha})`
  if (branch !== undefined) return `${head} (${branch})`
  if (commitSha !== undefined) return `${head} (@ ${commitSha})`
  return head
}

export function pipelineNotFoundMessage(seq: number): string {
  return (
    `pipeline #${seq} not found — seq is allocated per page type, so the same number ` +
    "names a different row in each, and one that names a project or a step names no pipeline"
  )
}
