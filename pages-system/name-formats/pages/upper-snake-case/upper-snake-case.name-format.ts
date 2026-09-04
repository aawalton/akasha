import type { NameFormat } from "../../name-format.page-type.ts"

export const upperSnakeCase = {
  id: "01a04eba-7459-703d-a8ad-931c8411a7a6",
  pageTypeSlug: "name-format",
  slug: "upper-snake-case",
  definition: "a name format joining words with underscores, all letters capital",
  code: "ts",
  test: "ts",
} as const satisfies NameFormat
