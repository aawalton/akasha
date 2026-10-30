import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebApiNarrationNext = {
  id: "01a10dc9-9fed-7277-a5d4-07cab2baf25f",
  type: "page-type/route",
  slug: "alan-web-api-narration-next",
  definition: "the next chapter a narration adds to its stream",
  code: "ts",
  urlPath: "api/narration/:id/next",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A request no signed-in person made is answered 401 and adds nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The request names the chapter playing, and the chapter after it is added.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer names the chapter added, or names none where the story has ended.",
    },
  ],
  createdAt: "2026-10-05T20:37:59.917Z",
  updatedAt: "2026-10-30T16:59:26.249Z",
} as const satisfies Route
