import type { Route } from "@akasha/code/route"

export const atlasSignOut = {
  id: "01a08839-2a55-779f-b7bb-09b504f1d87c",
  pageTypeSlug: "route",
  slug: "atlas-sign-out",
  definition: "the end of a reader's session",
  code: "ts",
  urlPath: "sign-out",
} as const satisfies Route
