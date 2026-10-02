import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const coverAfter = {
  id: "01a0fd9f-af7d-7831-acab-f94772b0ab69",
  type: "page-type/text-property",
  slug: "cover-after",
  propertySlug: "cover-after",
  definition: "the opening words of the paragraph a turn's cover is drawn after",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn's cover is drawn in its prose right after the paragraph these words open.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The words are matched ignoring case, emphasis marks and punctuation.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cover whose words open no paragraph is drawn after its turn's last paragraph.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
