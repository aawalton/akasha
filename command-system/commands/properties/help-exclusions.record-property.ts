import type { List } from "@akasha/pages/page-property"
import type { RecordProperty } from "@akasha/pages/record-property"
import type { HelpExclusionNames } from "./help-exclusion-names.text-property.ts"

export type HelpExclusion = {
  names: readonly HelpExclusionNames[]
}

export type HelpExclusions = List<HelpExclusion>

export const helpExclusions = {
  id: "01a06958-32a8-74c1-931a-1885171bc88d",
  pageTypeSlug: "record-property",
  slug: "help-exclusions",
  propertySlug: "exclusions",
  definition: "the sets of flags a command takes no two of at once",
  properties: [
    {
      pagePropertySlug: "text-property/help-exclusion-names",
      required: true,
      many: true,
      max: null,
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A set names two flags or more.",
    },
  ],
} as const satisfies RecordProperty
