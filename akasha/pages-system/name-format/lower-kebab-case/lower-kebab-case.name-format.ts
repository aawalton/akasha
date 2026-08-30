import type { NameFormat } from "../name-format.page-type.ts"

export const lowerKebabCase = {
  id: "01a04eba-7459-71b8-9356-78cfec88c104",
  pageTypeSlug: "name-format",
  slug: "lower-kebab-case",
  definition: "a name format joining words with hyphens, all letters lower",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A digit stands inside a word rather than between words.",
    },
    {
      invariantKind: "departure",
      statement: "A name neither opens nor closes with a hyphen and holds no empty word.",
    },
  ],
} as const satisfies NameFormat
