import type { NameFormat } from "../../name-format.page-type.ts"

export const lowerSnakeCase = {
  id: "01a04eba-7459-7895-902e-b043a8723120",
  pageTypeSlug: "name-format",
  slug: "lower-snake-case",
  definition: "a name format joining words with underscores, all letters lower",
  code: "ts",
  test: "ts",
  invariants: [],
} as const satisfies NameFormat
