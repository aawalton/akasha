import type { BannedTerm } from "akasha/domain/plain-language/standard-agent-english/term/banned-term/banned-term.page-type.types.ts"

export const loginSignIn = {
  id: "01a0d588-ffb7-7ca5-b72b-157de2be2765",
  type: "page-type/banned-term",
  slug: "login-sign-in",
  spelling: "login",
  definition: "proving to a program who you are",
  instead: "sign in",
  createdAt: "2026-09-24T22:28:40.503Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies BannedTerm
