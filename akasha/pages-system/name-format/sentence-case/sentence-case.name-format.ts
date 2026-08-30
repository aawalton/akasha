import type { NameFormat } from "../name-format.page-type.ts"

export const sentenceCase = {
  id: "01a04eba-7459-7eaf-808c-edc6d257bb1c",
  pageTypeSlug: "name-format",
  slug: "sentence-case",
  definition: "a name format separating words with spaces, capitalized as a sentence is",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "Only the opening capital and the single spaces parting the words are judged.",
    },
    {
      invariantKind: "gap",
      statement: "A proper noun cannot be told from the name.",
    },
  ],
} as const satisfies NameFormat
