import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const toolReached = {
  id: "01a08244-d443-73d4-a3ac-7e9977467048",
  type: "text-property",
  slug: "tool-reached",
  propertySlug: "tool-reached",
  definition: "a dependency a tool reaches rather than a body importing it",
  maxLength: 214,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A value is spelled as the manifest spells that dependency.",
    },
    {
      invariantKind: "departure",
      statement: "No body is asked to import a dependency named here.",
    },
    {
      invariantKind: "absence",
      statement: "A dependency a body already imports is not named here.",
    },
    {
      invariantKind: "departure",
      statement:
        "A package naming nothing here has every dependency reached by a body the package has.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
