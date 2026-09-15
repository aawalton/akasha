import type { NameFormat } from "akasha/page/name-format/name-format.page-type.types.ts"

export const startCase = {
  id: "01a04fa6-4826-7edc-8fd9-a295ef73a31a",
  type: "page-type/name-format",
  slug: "start-case",
  definition: "a name format separating words with spaces, every word starting capital",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A name has no word opening lower.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A lower word between the first and the last is refused here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A lower word between the first and the last is let through by title case.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A name padded or doubly spaced is not written in start case.",
    },
  ],
} as const satisfies NameFormat
