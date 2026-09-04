import { z } from "zod"

export const EXTENDED_CONTEXT_MARKER = "[1m]"

const MODEL_BODY = z.looseObject({ model: z.string().optional() })

type ModelBody = z.infer<typeof MODEL_BODY>

function bodyRead(bodyBuffer: ArrayBuffer): ModelBody | null {
  let held: unknown
  try {
    held = JSON.parse(new TextDecoder().decode(bodyBuffer))
  } catch {
    return null
  }
  const parsed = MODEL_BODY.safeParse(held)
  return parsed.success ? parsed.data : null
}

function encoded(text: string): ArrayBuffer {
  const bytes = new TextEncoder().encode(text)
  const out = new ArrayBuffer(bytes.byteLength)
  new Uint8Array(out).set(bytes)
  return out
}

export function marksExtendedContext(wireId: string): boolean {
  return wireId.endsWith(EXTENDED_CONTEXT_MARKER)
}

export function baseSiblingOf(wireId: string): string {
  return marksExtendedContext(wireId)
    ? wireId.slice(0, wireId.length - EXTENDED_CONTEXT_MARKER.length)
    : wireId
}

export function asksExtendedContext(bodyBuffer: ArrayBuffer | null): boolean {
  if (bodyBuffer === null) return false
  const model = bodyRead(bodyBuffer)?.model
  return model !== undefined && marksExtendedContext(model)
}

export function rewrittenToBaseSibling(bodyBuffer: ArrayBuffer): ArrayBuffer | null {
  const body = bodyRead(bodyBuffer)
  if (body === null) return null
  const model = body.model
  if (model === undefined || !marksExtendedContext(model)) return null
  const base = baseSiblingOf(model)
  if (base === model) return null
  return encoded(JSON.stringify({ ...body, model: base }))
}
