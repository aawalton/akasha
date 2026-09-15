import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebIdle = {
  id: "01a0882d-7607-7b89-969a-79fa6a1c4168",
  type: "page-type/route",
  slug: "alan-web-idle",
  definition: "the permanent redirect onto the page carrying the idle game",
  code: "ts",
  urlPath: "idle",
  invariants: [
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The page the redirect points at is the `idle-game` page slugged `idle`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The address is built from that page's own id rather than spelled here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The host idle.alanwalton.com is sent here by the server.",
    },
  ],
} as const satisfies Route
