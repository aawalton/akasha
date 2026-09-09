import type { Route } from "@akasha/code/route"

export const jennySignIn = {
  id: "01a08823-9dc2-7243-8e1c-b4c0979fbb10",
  pageTypeSlug: "route",
  type: "route",
  slug: "jenny-sign-in",
  definition: "where Jenny gives the credentials of the account already there",
  code: "tsx",
  urlPath: "sign-in",
} as const satisfies Route
