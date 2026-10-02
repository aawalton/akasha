import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const outcomes = {
  id: "01a0de23-015c-7892-8e17-ce5f54c5a9bc",
  type: "page-type/file-property",
  slug: "outcomes",
  propertySlug: "outcomes",
  definition: "the outcomes of the checks settled on a played turn, one to a line",
  extensions: ["jsonl"],
  appendOnly: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One line is one outcome a check settled, as one json object.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line states the check, its reading, any dice with their seed, and the answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An outcome is kept on the turn the outcome settled.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A later line of a check rolling nothing replaces its earlier line for the same `character`.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
