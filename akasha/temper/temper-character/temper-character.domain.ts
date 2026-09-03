import type { Domain } from "../../domain-system/domains/domain.page-type.ts"

export const temperCharacter = {
  id: "01a05fac-7581-7a09-a912-5277eaa7f144",
  pageTypeSlug: "domain",
  slug: "temper-character",
  definition: "an account, the characters on it, and what each character is built as",
  pluralSlug: "temper-characters",
  partSlugs: [
    "page-type/character-build",
    "page-type/companion-build",
    "page-type/temper-account",
    "page-type/temper-account-character",
    "page-type/temper-character-role",
    "page-type/temper-character-skill-activation",
    "page-type/temper-character-thing",
    "page-type/temper-companion-progress",
    "page-type/temper-mine",
    "page-type/temper-player",
    "page-type/temper-skill-bar",
    "page-type/temper-skill-point",
    "page-type/temper-weapon-bar",
  ],
} as const satisfies Domain
