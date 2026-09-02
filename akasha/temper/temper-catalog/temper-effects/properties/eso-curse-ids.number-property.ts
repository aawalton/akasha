import type { NumberProperty } from "@akasha/pages-system/number-property"
import type { List } from "@akasha/pages-system/page-property"

export type EsoCurseId = number
export type EsoCurseIds = List<EsoCurseId>

export const esoCurseIds = {
  id: "01a05fc5-94cd-7c97-9330-6c78011127fa",
  pageTypeSlug: "number-property",
  slug: "eso-curse-ids",
  propertySlug: "eso-curse-ids",
  definition: "the abilities The Elder Scrolls Online marks a curse by",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "One list holds every ability the game marks one curse by.",
    },
  ],
} as const satisfies NumberProperty
