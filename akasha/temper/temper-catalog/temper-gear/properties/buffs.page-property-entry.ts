import type { PagePropertyEntry } from "@akasha/pages-system/page-property-entry"

export type Buffs = "jsonl"

export const buffs = {
  id: "01a05fcc-41f1-7c1c-90fb-e8b929e9bfb1",
  pageTypeSlug: "page-property-entry",
  slug: "buffs",
  propertySlug: "buffs",
  definition: "the helpful effects a thing grants, one to a line",
  properties: [
    { pagePropertySlug: "buff-id", required: true, many: false },
    { pagePropertySlug: "effect-seconds", required: true, many: false },
  ],
} as const satisfies PagePropertyEntry
