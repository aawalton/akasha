import type { NameFormat } from "../name-format.page-type.ts"

export const lowerCamelCase = {
  id: "01a04eba-7459-7514-a7a9-88538edfa887",
  pageTypeSlug: "name-format",
  slug: "lower-camel-case",
  definition:
    "a name format joining words with nothing between, every word but the first starting capital",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The first word opens lower, which is what parts this format from upper camel case.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A capital opens a word and a word may be one letter, so `pageUUID` reads as four one-letter words and is let through.",
    },
    {
      invariantKind: "gap",
      statement:
        "Whether an acronym is one word or several cannot be read off the name, so neither `pageUuid` nor `pageUUID` is refused.",
    },
  ],
} as const satisfies NameFormat
