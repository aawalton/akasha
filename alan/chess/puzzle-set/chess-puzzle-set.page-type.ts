import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const chessPuzzleSet = {
  id: "01a06582-bd62-7a9f-a011-94835eaaf909",
  type: "page-type/page-type",
  slug: "chess-puzzle-set",
  definition: "a set of chess puzzles",
  extends: ["page-type/page"],
  runsTabooCheck: false,
  parts: [
    "boolean-property/solved",
    "number-property/nb-plays",
    "number-property/popularity",
    "number-property/puzzle-rating",
    "number-property/rating-deviation",
    "page-property-entry/puzzles",
    "select-property/solver-color",
    "text-property/opening-tags",
    "text-property/puzzle-id",
    "text-property/puzzle-license",
    "text-property/puzzle-moves",
    "text-property/puzzle-themes",
    "url-property/game-url",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "page-property-entry/puzzles", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A set has its puzzles as rows beside the page rather than as pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A row's position in Forsyth-Edwards notation is the position the solver moves from.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T04:24:22.114Z",
  updatedAt: "2026-10-30T15:01:47.772Z",
} as const satisfies PageType
