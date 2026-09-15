import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const transcriptPath = {
  id: "01a053f0-366d-7612-bbb6-6be4383f12b7",
  type: "page-type/text-property",
  slug: "transcript-path",
  propertySlug: "transcript-path",
  definition: "where a seat writes what was said in it",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A transcript sits on the machine its seat sits on.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
