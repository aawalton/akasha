import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const atlasSearch = {
  id: "01a0883f-0826-7e5c-8e46-5e2a38ee8554",
  type: "page-type/route",
  slug: "atlas-search",
  definition: "the places a reader looks up and keeps",
  code: "tsx",
  urlPath: "search",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The looking up and the keeping happen in the browser.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A place already kept is a link to the location rather than a button.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The screen's title and wording are read live from its site document and web phrases.",
    },
  ],
  createdAt: "2026-09-09T22:17:07.366Z",
  updatedAt: "2026-09-27T12:29:36.000Z",
} as const satisfies Route
