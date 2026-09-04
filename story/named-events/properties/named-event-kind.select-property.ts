import type { SelectProperty } from "@akasha/pages-system/select-property"

export const namedEventKind = {
  id: "01a0658b-9f41-7310-9c24-db088c2b42b4",
  pageTypeSlug: "select-property",
  slug: "named-event-kind",
  propertySlug: "named-event-kind",
  definition: "what sort of happening it is",
  values: ["battle", "global-event", "festival"],
} as const satisfies SelectProperty

export type NamedEventKind = (typeof namedEventKind.values)[number]
