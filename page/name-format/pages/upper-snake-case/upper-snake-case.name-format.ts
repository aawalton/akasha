import type { NameFormat } from "akasha/page/name-format/name-format.page-type.types.ts"

export const upperSnakeCase = {
  id: "01a04eba-7459-703d-a8ad-931c8411a7a6",
  type: "page-type/name-format",
  slug: "upper-snake-case",
  definition: "a name format joining words with underscores, all letters capital",
  code: "ts",
  test: "ts",
} as const satisfies NameFormat
