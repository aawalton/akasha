import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type TranscriptPath = string

export const transcriptPath = {
  id: "01a053f0-366d-7612-bbb6-6be4383f12b7",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "transcript-path",
  propertySlug: "transcript-path",
  definition: "where a seat writes what was said in it",
  maxLength: 200,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A transcript sits on the machine its seat sits on.",
    },
  ],
} as const satisfies TextProperty
