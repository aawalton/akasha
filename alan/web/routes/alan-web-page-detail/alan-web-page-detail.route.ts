import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const alanWebPageDetail = {
  id: "01a08833-1672-716a-8f04-9183f3106bcc",
  pageTypeSlug: "route",
  type: "route",
  slug: "alan-web-page-detail",
  definition: "one page, drawn as the kind of page it is",
  code: "tsx",
  urlPath: ":pageTypeSlug/:pageHrefParam",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A nav page is drawn as the page that nav item points at.",
    },
    {
      invariantKind: "departure",
      statement: "An idle game, a chess game and a chess review each have a drawing of their own.",
    },
    {
      invariantKind: "departure",
      statement: "Asking for properties draws the properties rather than the game.",
    },
    {
      invariantKind: "departure",
      statement: "A change to the speed or the variant asked for does not load the page again.",
    },
  ],
} as const satisfies Route
