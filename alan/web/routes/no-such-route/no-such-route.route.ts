import type { Route } from "@akasha/code-system/route"

export const noSuchRoute = {
  id: "01a072dd-d488-7e97-b669-7076f6de9c20",
  pageTypeSlug: "route",
  slug: "no-such-route",
  definition: "that no route answers the address a caller asked for",
  code: "ts",
  test: "ts",
  urlPath: "api/*",
} as const satisfies Route
