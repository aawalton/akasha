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
      statement:
        "Two capitals never touch, because a capital opens a word: an acronym is written `pageUuid` rather than `pageUUID`.",
    },
    {
      invariantKind: "departure",
      statement: "The first word opens lower, which is what parts this format from upper camel case.",
    },
  ],
} as const satisfies NameFormat
