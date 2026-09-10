import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const alanWebPrivacy = {
  id: "01a08828-b1a2-7d99-a146-98a87aae6df0",
  pageTypeSlug: "route",
  type: "route",
  slug: "alan-web-privacy",
  definition: "what the Amy messaging service does with a message",
  code: "tsx",
  urlPath: "privacy",
} as const satisfies Route
