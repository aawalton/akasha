import type { BannedTerm } from "akasha/domain/standard-agent-english/term/banned-term/banned-term.page-type.types.ts"

export const registerSignUp = {
  id: "01a0d588-ffb7-782c-8527-f44ae62ffa16",
  type: "page-type/banned-term",
  slug: "register-sign-up",
  spelling: "register",
  definition: "to make yourself known to a program for the first time",
  instead: "sign up",
} as const satisfies BannedTerm
