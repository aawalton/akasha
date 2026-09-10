import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export type ProseFrame = "object" | "fronted" | "participle" | "placed"

export const proseFrame = {
  id: "01a08243-41cd-7873-9af3-308bc9152b5d",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "prose-frame",
  propertySlug: "frame",
  definition: "the construction a replacement pair is written for",
  targetPageType: "page-type/prose-frame",
  invariants: [
    {
      invariantKind: "constraint",
      statement:
        "The plain word `frame` names what a screen draws in rather than what a word sits in.",
    },
    {
      invariantKind: "departure",
      statement: "The frame a pair names is the frame a reader of the sentence's tree answers.",
    },
  ],
} as const satisfies RelationProperty
