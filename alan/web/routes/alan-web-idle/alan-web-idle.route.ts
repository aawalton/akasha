import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const alanWebIdle = {
  id: "01a0882d-7607-7b89-969a-79fa6a1c4168",
  pageTypeSlug: "route",
  type: "route",
  slug: "alan-web-idle",
  definition: "the permanent redirect onto the page carrying the idle game",
  code: "ts",
  urlPath: "idle",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The page this redirect points at is an idle-game page the pages service has not.",
    },
    {
      invariantKind: "absence",
      statement: "No redirect is built here.",
    },
    {
      invariantKind: "departure",
      statement: "A reader is told the game is unreachable rather than told the game is gone.",
    },
    {
      invariantKind: "departure",
      statement: "The host idle.alanwalton.com is sent here by the server.",
    },
  ],
} as const satisfies Route
