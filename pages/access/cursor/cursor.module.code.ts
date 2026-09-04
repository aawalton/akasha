import type { Json } from "@akasha/utils-narrow/json-value"
import { z } from "zod"
import type { PageCursor } from "../types/types.module.code.ts"

export type CursorPayload = {
  values: readonly Json[]
  id: string
  snapshot?: string
  index?: number
}

function utf8ToBase64(input: string): string {
  const bytes = new TextEncoder().encode(input)
  let binary = ""
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary)
}

function base64ToUtf8(input: string): string {
  const binary = atob(input)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return new TextDecoder().decode(bytes)
}

export function encodeCursor(payload: CursorPayload): PageCursor {
  const b64 = utf8ToBase64(JSON.stringify(payload))
  return b64.replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "")
}

function isCursorPayload(value: unknown): value is CursorPayload {
  if (!value || typeof value !== "object") return false
  if (!("values" in value) || !("id" in value)) return false
  return Array.isArray(value.values) && typeof value.id === "string"
}

export function decodeCursor(cursor: PageCursor): CursorPayload {
  let parsed: unknown
  try {
    const padded = cursor.replaceAll("-", "+").replaceAll("_", "/")
    const padding = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4))
    parsed = z.unknown().parse(JSON.parse(base64ToUtf8(padded + padding)))
  } catch {
    throw new Error("pages-access: malformed cursor")
  }
  if (!isCursorPayload(parsed)) {
    throw new Error("pages-access: malformed cursor")
  }
  return parsed
}
