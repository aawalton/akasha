import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const seatCredential = {
  id: "01a08866-f117-71ad-a4ee-7c213a9155b8",
  type: "page-type/domain",
  slug: "seat-credential",
  definition: "the credential that signs in a seat's account",
  parts: ["module/account-terminal", "module/oauth-health-lines", "module/supervisor-credentials"],
} as const satisfies Domain
