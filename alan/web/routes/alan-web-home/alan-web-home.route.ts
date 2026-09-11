import type { Route } from "akasha/code/routes/route.page-type.types.ts"

export const alanWebHome = {
  id: "01a08830-7db2-77e4-a5d5-9c29796416ef",
  pageTypeSlug: "route",
  type: "route",
  slug: "alan-web-home",
  definition: "the nav item a signed-in reader opens on",
  code: "tsx",
  urlPath: "home",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reader who is not signed in is sent to the sign-in route.",
    },
    {
      invariantKind: "departure",
      statement: "A signed-in reader with no home nav item is shown the title alone.",
    },
  ],
} as const satisfies Route
