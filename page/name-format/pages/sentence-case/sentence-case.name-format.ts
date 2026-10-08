import type { NameFormat } from "akasha/page/name-format/name-format.page-type.types.ts"

export const sentenceCase = {
  id: "01a04eba-7459-7eaf-808c-edc6d257bb1c",
  type: "page-type/name-format",
  slug: "sentence-case",
  definition: "a name format separating words with spaces, capitalized as a sentence is",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Only the opening capital and the single spaces parting the words are judged.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A proper noun cannot be told from the name.",
    },
  ],
  createdAt: "2026-08-29T18:13:57.465Z",
  updatedAt: "2026-09-25T14:06:21.000Z",
} as const satisfies NameFormat
