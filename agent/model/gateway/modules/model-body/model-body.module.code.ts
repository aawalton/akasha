import { z } from "zod"

const MODEL_BODY = z.looseObject({ model: z.string().optional() })

type ModelBody = z.infer<typeof MODEL_BODY>

function bodyRead(bodyBuffer: ArrayBuffer): ModelBody | null {
  try {
    const parsed = MODEL_BODY.safeParse(JSON.parse(new TextDecoder().decode(bodyBuffer)))
    return parsed.success ? parsed.data : null
  } catch {
    return null
  }
}

export function encoded(text: string): ArrayBuffer {
  const bytes = new TextEncoder().encode(text)
  const out = new ArrayBuffer(bytes.byteLength)
  new Uint8Array(out).set(bytes)
  return out
}

export function modelAsked(bodyBuffer: ArrayBuffer | null): string | null {
  if (bodyBuffer === null) return null
  return bodyRead(bodyBuffer)?.model ?? null
}

export function rewrittenToModel(bodyBuffer: ArrayBuffer, model: string): ArrayBuffer | null {
  const body = bodyRead(bodyBuffer)
  if (body === null || body.model === undefined || body.model === model) return null
  return encoded(JSON.stringify({ ...body, model }))
}
