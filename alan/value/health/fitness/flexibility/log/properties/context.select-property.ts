import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const context = {
  id: "01a06558-36e9-73bd-936b-ca5d3357886a",
  type: "page-type/select-property",
  slug: "context",
  propertySlug: "context",
  definition: "what the reading was taken around",
  values: ["warmup", "cooldown", "standalone"],
  types: "ts",
  createdAt: "2026-09-03T03:37:55.177Z",
  updatedAt: "2026-09-15T16:59:44.000Z",
} as const satisfies SelectProperty
