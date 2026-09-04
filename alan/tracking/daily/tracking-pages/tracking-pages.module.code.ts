import type { Page } from "../day-narrow-types/day-narrow-types.module.code.ts"
import { camelizeKey } from "../tracking-keys/tracking-keys.module.code.ts"

const HELD_SEQ = 0

export function pageOf(values: Readonly<Record<string, unknown>>): Page {
  const camel: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(values)) camel[camelizeKey(key)] = value
  const id = camel.id
  return { ...camel, id: typeof id === "string" ? id : "", seq: HELD_SEQ } as Page
}
