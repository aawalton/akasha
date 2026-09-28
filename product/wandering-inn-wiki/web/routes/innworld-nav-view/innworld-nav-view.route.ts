import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const innworldNavView = {
  id: "01a0ea16-20f1-7f69-a95e-7aed6d3c4c7a",
  type: "page-type/route",
  slug: "innworld-nav-view",
  definition: "a nav item of the wiki, drawn as the view pages it holds as tabs",
  code: "tsx",
  urlPath: "nav/:pageHrefParam",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A nav item the wiki's sidebar does not hold is answered 404.",
    },
  ],
} as const satisfies Route
