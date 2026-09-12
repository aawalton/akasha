import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const seatCredential = {
  id: "01a08866-f117-71ad-a4ee-7c213a9155b8",
  type: "domain",
  slug: "seat-credential",
  definition: "the credential a seat's account is signed in with",
  parts: ["module/account-terminal", "module/oauth-health-lines", "module/supervisor-credentials"],
} as const satisfies Domain
