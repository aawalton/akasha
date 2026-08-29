import type { NameFormat } from "../name-format.page-type.ts"

export const upperSnakeCase = {
  id: "01a04eba-7459-703d-a8ad-931c8411a7a6",
  pageTypeSlug: "name-format",
  slug: "upper-snake-case",
  definition: "a name format joining words with underscores, all letters capital",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A name is words, so it neither opens nor closes with an underscore and holds no empty word.",
    },
  ],
} as const satisfies NameFormat
