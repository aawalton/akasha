import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebApiNarrationPiece = {
  id: "01a10dc9-9fed-70c3-829d-78556146dc2a",
  type: "page-type/route",
  slug: "alan-web-api-narration-piece",
  definition: "a narration's playlist, chapters or piece, passed through from the speech workload",
  code: "ts",
  urlPath: "api/narration/:id/:name",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A narration's id is what reaches its audio, rather than a session cookie.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The iOS app plays a narration from another origin than the page it shows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name that is no playlist, chapters, init section or piece is answered 404.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A listener who goes away stops the request to the speech workload.",
    },
  ],
} as const satisfies Route
