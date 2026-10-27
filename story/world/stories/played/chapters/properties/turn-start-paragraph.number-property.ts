import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const turnStartParagraph = {
  id: "01a17f34-c642-7406-8d9d-be28e47f2a42",
  type: "page-type/number-property",
  slug: "turn-start-paragraph",
  propertySlug: "paragraph",
  definition: "the paragraph of a chapter's prose a folded turn begins at, counted from 0",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only paragraphs drawn as prose are counted, and a window block counts for none.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-27T21:12:07.489Z",
  updatedAt: "2026-10-27T21:12:07.489Z",
} as const satisfies NumberProperty
