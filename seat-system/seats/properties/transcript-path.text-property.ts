import type { TextProperty } from "@akasha/pages-system/text-property"

export type TranscriptPath = string

export const transcriptPath = {
  id: "01a053f0-366d-7612-bbb6-6be4383f12b7",
  pageTypeSlug: "text-property",
  slug: "transcript-path",
  propertySlug: "transcript-path",
  definition: "where a seat writes what was said in it",
  max: 200,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A transcript sits on the machine its seat sits on.",
    },
  ],
} as const satisfies TextProperty
