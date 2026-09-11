import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const auth = {
  id: "01a07392-d13f-7657-b149-543047125f73",
  type: "domain",
  slug: "auth",
  definition: "who a caller is, and what says so",
  parts: ["manifest/gotrue"],
} as const satisfies Domain
