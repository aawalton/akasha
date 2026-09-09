import type { Domain } from "../../domains/domain.page-type.ts"

export const auth = {
  id: "01a07392-d13f-7657-b149-543047125f73",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "auth",
  definition: "who a caller is, and what says so",
  parts: ["manifest/gotrue"],
} as const satisfies Domain
