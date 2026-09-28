import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebApiIcon = {
  id: "01a0e7e0-d6b6-72c2-b476-10c174fbc73c",
  type: "page-type/route",
  slug: "alan-web-api-icon",
  definition: "an icon drawn by its name",
  code: "ts",
  urlPath: "api/icon/:name",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An icon is named as lucide names it, or as a page states it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name no icon has is drawn as the icon a page naming none is drawn with.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A browser keeps an icon for a day, since one name always draws one icon.",
    },
  ],
} as const satisfies Route
