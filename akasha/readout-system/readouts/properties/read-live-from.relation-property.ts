import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type ReadLiveFrom = Slug

export const readLiveFrom = {
  id: "01a06559-e74c-7e30-bbec-7604ae4f8dc5",
  pageTypeSlug: "relation-property",
  slug: "read-live-from",
  propertySlug: "read-live-from",
  definition: "the outside service a reading is taken from at the moment it is drawn",
  targetPageTypeSlug: "page-type/domain",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A readout naming a service to read live from is answered by no query.",
    },
  ],
} as const satisfies RelationProperty
