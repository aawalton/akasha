import type { NameFormat } from "../name-format.page-type.ts"

export const titleCase = {
  id: "01a04eba-7459-7314-a8c6-dc565526fb11",
  pageTypeSlug: "name-format",
  slug: "title-case",
  definition: "a name format separating words with spaces, every important word starting capital",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement:
        "The first word and the last are taken as important, because every convention for titles capitalizes both.",
    },
    {
      invariantKind: "gap",
      statement:
        "Which word between the first and the last is important cannot be read off the name, so a lower one is let through.",
    },
    {
      invariantKind: "constraint",
      statement: "One space parts two words, so a name padded or doubly spaced is not written in it.",
    },
  ],
} as const satisfies NameFormat
