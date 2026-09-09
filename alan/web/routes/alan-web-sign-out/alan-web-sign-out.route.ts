import type { Route } from "@akasha/code/route"

export const alanWebSignOut = {
  id: "01a0882d-0225-7139-b8b8-9470ea19ccb6",
  pageTypeSlug: "route",
  slug: "alan-web-sign-out",
  definition: "the end of a reader's session",
  code: "ts",
  urlPath: "sign-out",
} as const satisfies Route
