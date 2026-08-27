export const POD_NAME_MAX_LEN = 63

const POD_NAME_PREFIX = "pe-"

const POD_NAME_SHORT_SHA_LEN = 7

const POD_NAME_JOINER_COUNT = 2

export function podNameFramingLength(pipelineSeq: number): number {
  return (
    POD_NAME_PREFIX.length +
    String(pipelineSeq).length +
    POD_NAME_JOINER_COUNT +
    POD_NAME_SHORT_SHA_LEN
  )
}

export function stepNameCapFor(pipelineSeq: number): number {
  return POD_NAME_MAX_LEN - podNameFramingLength(pipelineSeq)
}

export const PIPELINE_SEQ_ASSUMED_OUTSIDE_CI = 99_999

export interface ResolvedPipelineSeq {
  readonly seq: number
  readonly source: string
}

export function resolvePipelineSeq(env: Record<string, string | undefined>): ResolvedPipelineSeq {
  for (const name of ["PIPELINE_SEQ", "CI_SEQ"]) {
    const raw = env[name]
    if (raw == null || !/^[1-9][0-9]*$/.test(raw)) continue
    return { seq: Number(raw), source: `$${name}` }
  }
  return {
    seq: PIPELINE_SEQ_ASSUMED_OUTSIDE_CI,
    source: "assumed — no $PIPELINE_SEQ or $CI_SEQ, so this run is not inside a pipeline",
  }
}
