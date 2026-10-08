import type { BannedTerm } from "akasha/domain/plain-language/standard-agent-english/term/banned-term/banned-term.page-type.types.ts"

export const registerSignUp = {
  id: "01a0d588-ffb7-782c-8527-f44ae62ffa16",
  type: "page-type/banned-term",
  slug: "register-sign-up",
  spelling: "register",
  definition: "to make yourself known to a program for the first time",
  instead: "sign up",
  createdAt: "2026-09-24T22:28:40.503Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies BannedTerm
