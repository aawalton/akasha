import type { BannedTerm } from "akasha/domain/standard-agent-english/term/banned-term/banned-term.page-type.types.ts"

export const loginSignIn = {
  id: "01a0d588-ffb7-7ca5-b72b-157de2be2765",
  type: "page-type/banned-term",
  slug: "login-sign-in",
  spelling: "login",
  definition: "proving to a program who you are",
  instead: "sign in",
} as const satisfies BannedTerm
