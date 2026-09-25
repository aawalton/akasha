import {
  modelAsked,
  rewrittenToModel,
} from "akasha/agent/model/gateway/modules/model-body/model-body.module.code.ts"
import {
  EXTENDED_CONTEXT_MARKER,
  parseModel,
  toWireId,
} from "akasha/agent/model/modules/vocab/model-vocab.module.code.ts"

export function retargetedModel(wireId: string): string | null {
  const spec = parseModel(wireId)
  if (spec === null) return null
  const current = toWireId(spec.logical)
  const marked = spec.extended ? `${current}${EXTENDED_CONTEXT_MARKER}` : current
  return marked === wireId ? null : marked
}

export function rewrittenToCurrentModel(bodyBuffer: ArrayBuffer | null): ArrayBuffer | null {
  if (bodyBuffer === null) return null
  const asked = modelAsked(bodyBuffer)
  if (asked === null) return null
  const target = retargetedModel(asked)
  if (target === null) return null
  return rewrittenToModel(bodyBuffer, target)
}
