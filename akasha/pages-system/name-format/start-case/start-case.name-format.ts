import type { NameFormat } from "../name-format.page-type.ts"

export const startCase = {
  id: "01a04fa6-4826-7edc-8fd9-a295ef73a31a",
  pageTypeSlug: "name-format",
  slug: "start-case",
  definition: "a name format separating words with spaces, every word starting capital",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "Every word is important, so a name carries no word opening lower.",
    },
    {
      invariantKind: "departure",
      statement:
        "A lower word between the first and the last is refused here and let through by title case, so this is no second spelling of it.",
    },
    {
      invariantKind: "constraint",
      statement:
        "One space parts two words, so a name padded or doubly spaced is not written in it.",
    },
  ],
} as const satisfies NameFormat
