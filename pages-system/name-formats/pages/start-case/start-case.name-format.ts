import type { NameFormat } from "../../name-format.page-type.ts"

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
      statement: "A name carries no word opening lower.",
    },
    {
      invariantKind: "departure",
      statement: "A lower word between the first and the last is refused here.",
    },
    {
      invariantKind: "departure",
      statement: "A lower word between the first and the last is let through by title case.",
    },
    {
      invariantKind: "constraint",
      statement: "A name padded or doubly spaced is not written in start case.",
    },
  ],
} as const satisfies NameFormat
