import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebApiNarration = {
  id: "01a10dc9-9fed-722f-898a-e143f70fb633",
  type: "page-type/route",
  slug: "alan-web-api-narration",
  definition: "a chapter's narration opened for the signed-in person",
  code: "ts",
  urlPath: "api/narration",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A request no signed-in person made is answered 401 and opens nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A narration is named by the chapter's page type and slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer names the narration's id, its playlist and the chapter it opens on.",
    },
  ],
  createdAt: "2026-10-05T20:37:59.917Z",
  updatedAt: "2026-10-05T20:38:06.000Z",
} as const satisfies Route
