import type { List } from "@akasha/pages/page-property"
import type { RecordProperty } from "@akasha/pages/record-property"
import type { FromPattern } from "./from-pattern.text-property.ts"
import type { Frame } from "./prose-frame.relation-property.ts"
import type { ToPattern } from "./to-pattern.text-property.ts"

export type ReplacementPattern = {
  frame: Frame
  fromPattern: FromPattern
  toPattern: ToPattern
}

export type ReplacementPatterns = List<ReplacementPattern>

export const replacementPatterns = {
  id: "01a0822d-c124-76d5-acd8-925e9cdcdb81",
  pageTypeSlug: "record-property",
  slug: "replacement-patterns",
  propertySlug: "replacement-patterns",
  definition: "each construction a banned term is written in, with the one written in its place",
  properties: [
    { pageProperty: "relation-property/prose-frame", required: true, many: false },
    { pageProperty: "text-property/from-pattern", required: true, many: false },
    { pageProperty: "text-property/to-pattern", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A pair names the construction it is written for rather than leaving it to spelling.",
    },
    {
      invariantKind: "departure",
      statement: "One word spelled one way in two constructions is two pairs.",
    },
    {
      invariantKind: "departure",
      statement: "A bracketed word names a word class, and a bare word matches itself.",
    },
    {
      invariantKind: "departure",
      statement: "A word class the reader does not know is refused rather than guessed at.",
    },
    {
      invariantKind: "departure",
      statement: "One construction a term is written in is one pair.",
    },
    {
      invariantKind: "departure",
      statement: "A construction no pair names is a construction akasha still writes.",
    },
    {
      invariantKind: "departure",
      statement: "A term whose replacement needs a reader's judgement names no pair.",
    },
  ],
} as const satisfies RecordProperty
