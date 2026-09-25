import type { Page } from "akasha/alan/track/daily/modules/day-narrow-types/day-narrow-types.module.code.ts"
import { foldedInLowerCamelCase } from "akasha/page/name-format/pages/lower-camel-case/lower-camel-case.name-format.code.ts"

export function pageOf(values: Readonly<Record<string, unknown>>): Page {
  const camel: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(values)) camel[foldedInLowerCamelCase(key)] = value
  const id = camel.id
  return { ...camel, id: typeof id === "string" ? id : "" } as Page
}
