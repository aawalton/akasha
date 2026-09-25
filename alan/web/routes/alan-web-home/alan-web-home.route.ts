import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebHome = {
  id: "01a08830-7db2-77e4-a5d5-9c29796416ef",
  type: "page-type/route",
  slug: "alan-web-home",
  definition: "a signed-in reader's opening nav item",
  code: "tsx",
  urlPath: "home",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader Google has not signed in is sent to the sign-in route.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A signed-in reader with no home nav item is shown the title alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The opening nav item is picked again as soon as a nav item changes.",
    },
  ],
} as const satisfies Route
