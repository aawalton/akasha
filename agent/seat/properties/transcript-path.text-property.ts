import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const transcriptPath = {
  id: "01a053f0-366d-7612-bbb6-6be4383f12b7",
  type: "page-type/text-property",
  slug: "transcript-path",
  propertySlug: "transcript-path",
  definition: "the path of a seat's transcript",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A transcript sits on the machine its seat sits on.",
    },
  ],
  types: "ts",
  createdAt: "2026-08-30T18:30:46.637Z",
  updatedAt: "2026-10-30T14:35:53.554Z",
} as const satisfies TextProperty
