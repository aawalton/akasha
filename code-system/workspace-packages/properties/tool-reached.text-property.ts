import type { List } from "@akasha/pages/page-property"
import type { TextProperty } from "@akasha/pages/text-property"

export type ToolReach = string

export type ToolReached = List<ToolReach>

export const toolReached = {
  id: "01a08244-d443-73d4-a3ac-7e9977467048",
  pageTypeSlug: "text-property",
  slug: "tool-reached",
  propertySlug: "tool-reached",
  definition: "a dependency a tool reaches rather than a body importing it",
  maxLength: 214,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A value is spelled as the manifest spells that dependency.",
    },
    {
      invariantKind: "departure",
      statement: "A dependency named here is reached, so nothing asks a body to import it.",
    },
    {
      invariantKind: "absence",
      statement: "A dependency a body already imports is not named here.",
    },
    {
      invariantKind: "departure",
      statement: "A package naming nothing here has every dependency reached by what it holds.",
    },
  ],
} as const satisfies TextProperty
