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
      statement:
        "Two capitals never touch, because a capital opens a word: an acronym is written `PageUuid` rather than `PageUUID`.",
    },
    {
      invariantKind: "departure",
      statement: "A name opens with a letter, because a word opening with a digit has no capital to start.",
    },
  ],
} as const satisfies NameFormat
