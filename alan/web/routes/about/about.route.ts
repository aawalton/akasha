import type { Route } from "akasha/code/routes/route.page-type.types.ts"

export const about = {
  id: "01a071e3-0687-72b9-b61c-de5214ae1458",
  type: "route",
  slug: "about",
  definition: "what the business is and who runs it",
  code: "tsx",
  urlPath: "about",
} as const satisfies Route
