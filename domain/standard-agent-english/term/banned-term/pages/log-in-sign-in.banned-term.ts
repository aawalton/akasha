import type { BannedTerm } from "akasha/domain/standard-agent-english/term/banned-term/banned-term.page-type.types.ts"

export const logInSignIn = {
  id: "01a0d588-ffb6-723b-ad11-72379f35f0e8",
  type: "page-type/banned-term",
  slug: "log-in-sign-in",
  spelling: "log in",
  definition: "to prove to a program who you are",
  instead: "sign in",
} as const satisfies BannedTerm
