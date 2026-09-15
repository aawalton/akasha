import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebApiPicture = {
  id: "01a09c62-851a-71cc-950c-0d3fe7144579",
  type: "page-type/route",
  slug: "alan-web-api-picture",
  definition: "the picture a phone sends in for its person's handler",
  code: "ts",
  urlPath: "api/picture",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sender is known by its device secret rather than by a session.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing but the picture's bytes and the device secret leaves the phone.",
    },
  ],
} as const satisfies Route
