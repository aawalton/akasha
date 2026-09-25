import {
  modelAsked,
  rewrittenToModel,
} from "akasha/agent/model/gateway/modules/model-body/model-body.module.code.ts"
import { EXTENDED_CONTEXT_MARKER } from "akasha/agent/model/modules/vocab/model-vocab.module.code.ts"

export function marksExtendedContext(wireId: string): boolean {
  return wireId.endsWith(EXTENDED_CONTEXT_MARKER)
}

export function baseSiblingOf(wireId: string): string {
  return marksExtendedContext(wireId)
    ? wireId.slice(0, wireId.length - EXTENDED_CONTEXT_MARKER.length)
    : wireId
}

export function asksExtendedContext(bodyBuffer: ArrayBuffer | null): boolean {
  const model = modelAsked(bodyBuffer)
  return model !== null && marksExtendedContext(model)
}

export function rewrittenToBaseSibling(bodyBuffer: ArrayBuffer): ArrayBuffer | null {
  const model = modelAsked(bodyBuffer)
  if (model === null || !marksExtendedContext(model)) return null
  return rewrittenToModel(bodyBuffer, baseSiblingOf(model))
}
