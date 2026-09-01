import type { List } from "@akasha/pages-system/page-property"
import type { RecordProperty } from "@akasha/pages-system/record-property"
import type { Instead } from "./instead.text-property.ts"
import type { Sense } from "./sense.text-property.ts"

export type TabooSense = {
  sense: Sense
  instead: Instead
}

export type TabooSenses = List<TabooSense>

export const tabooSenses = {
  id: "01a0592f-d53e-7a82-b68e-38856ee374cf",
  pageTypeSlug: "record-property",
  slug: "taboo-senses",
  propertySlug: "taboo-senses",
  definition: "the senses a taboo term is never written in, each with what stands instead",
  properties: [
    { pagePropertySlug: "sense", required: true, many: false },
    { pagePropertySlug: "instead", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One list holds every sense a term bars.",
    },
    {
      invariantKind: "departure",
      statement: "A taboo sense bars one sense of the term.",
    },
    {
      invariantKind: "departure",
      statement: "A sense stands alone among the senses one term bars.",
    },
  ],
} as const satisfies RecordProperty
