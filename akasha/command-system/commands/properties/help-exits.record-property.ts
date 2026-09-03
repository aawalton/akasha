import type { List } from "@akasha/pages-system/page-property"
import type { RecordProperty } from "@akasha/pages-system/record-property"
import type { HelpExitCode } from "./help-exit-code.number-property.ts"
import type { HelpExitMeaning } from "./help-exit-meaning.text-property.ts"

export type HelpExit = {
  code: HelpExitCode
  meaning: HelpExitMeaning
}

export type HelpExits = List<HelpExit>

export const helpExits = {
  id: "01a06958-32a7-79bc-b0ee-1f60816bde4f",
  pageTypeSlug: "record-property",
  slug: "help-exits",
  propertySlug: "exits",
  definition: "the codes a command exits with, each with what the code means",
  properties: [
    { pagePropertySlug: "help-exit-code", required: true, many: false },
    { pagePropertySlug: "help-exit-meaning", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A code the whole command line shares is not repeated here.",
    },
  ],
} as const satisfies RecordProperty
