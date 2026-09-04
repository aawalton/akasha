import type { SelectProperty } from "@akasha/pages-system/select-property"

export const context = {
  id: "01a06558-36e9-73bd-936b-ca5d3357886a",
  pageTypeSlug: "select-property",
  slug: "context",
  propertySlug: "context",
  definition: "what the reading was taken around",
  values: ["warmup", "cooldown", "standalone"],
} as const satisfies SelectProperty

export type Context = (typeof context.values)[number]
