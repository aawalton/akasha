import type { NameFormat } from "../name-format.page-type.ts"

export const upperCamelCase = {
  id: "01a04eba-7459-7eca-8601-1a20dbb5a53c",
  pageTypeSlug: "name-format",
  slug: "upper-camel-case",
  definition: "a name format joining words with nothing between, every word starting capital",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name opens with a letter.",
    },
    {
      invariantKind: "constraint",
      statement: "A capital opens a word and a word may be one letter.",
    },
    {
      invariantKind: "gap",
      statement: "Whether an acronym is one word or several cannot be read off the name.",
    },
  ],
} as const satisfies NameFormat
