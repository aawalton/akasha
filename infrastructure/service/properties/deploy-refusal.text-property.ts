import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const deployRefusal = {
  id: "01a0a639-6816-7619-9e65-47e19c5dba03",
  type: "page-type/text-property",
  slug: "deploy-refusal",
  propertySlug: "deploy-refusal",
  definition: "why the last deploy refused",
  maxLength: 4000,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The refusal is the words that deploy refused with rather than a summary of them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every refusal one deploy answered is kept as one text, one refusal to a line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A refusal longer than this length is cut, and the cut says how long the whole was.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A deploy that finished leaves the refusal as that refusal was.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The refusal is kept uncommitted, so no deploy's closure reaches it.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
