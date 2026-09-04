import type { List } from "@akasha/pages-system/page-property"
import type { TextProperty } from "@akasha/pages-system/text-property"

export type KeptSense = string
export type KeptSenses = List<KeptSense>

export const keptSenses = {
  id: "01a05d78-f343-7862-8bea-66d8b696dedb",
  pageTypeSlug: "text-property",
  slug: "kept-senses",
  propertySlug: "kept-senses",
  definition: "the meanings a word is written in",
  max: 200,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "One list holds every sense a term keeps.",
    },
    {
      invariantKind: "departure",
      statement: "A sense a term keeps is not a sense the term bars.",
    },
    {
      invariantKind: "departure",
      statement: "No two senses one term keeps are the same.",
    },
    {
      invariantKind: "absence",
      statement: "A kept sense names nothing to write in its place.",
    },
  ],
} as const satisfies TextProperty
