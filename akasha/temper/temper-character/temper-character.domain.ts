import type { Domain } from "../../domain-system/domain/domain.page-type.ts"

export const temperCharacter = {
  id: "01a05fac-7581-7a09-a912-5277eaa7f144",
  pageTypeSlug: "domain",
  slug: "temper-character",
  definition: "an account, the characters on it, and what each character is built as",
  pluralSlug: "temper-characters",
  partSlugs: ["page-type/temper-character-thing"],
} as const satisfies Domain
