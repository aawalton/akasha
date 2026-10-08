import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const namedEventKind = {
  id: "01a0658b-9f41-7310-9c24-db088c2b42b4",
  type: "page-type/select-property",
  slug: "named-event-kind",
  propertySlug: "named-event-kind",
  definition: "what sort of happening it is",
  values: ["battle", "global-event", "festival"],
  types: "ts",
  createdAt: "2026-09-03T04:34:04.225Z",
  updatedAt: "2026-09-19T05:05:02.000Z",
} as const satisfies SelectProperty
