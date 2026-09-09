import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { Title } from "../../../pages/properties/title.text-property.ts"
import type { Puzzles } from "./properties/puzzles.page-property-entry.ts"

export type ChessPuzzleSet = Page & {
  title: Title
  puzzles?: Puzzles
}

export const chessPuzzleSet = {
  id: "01a06582-bd62-7a9f-a011-94835eaaf909",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "chess-puzzle-set",
  definition: "a body of chess puzzles taken from one place",
  pluralSlug: "chess-puzzle-sets",
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
  invariants: [
    {
      invariantKind: "departure",
      statement: "A set has its puzzles as rows beside the page rather than as pages.",
    },
    {
      invariantKind: "gap",
      statement: "A puzzle is a row here rather than a page a query may ask of.",
    },
    {
      invariantKind: "departure",
      statement:
        "A row's position in Forsyth-Edwards notation is the position the solver moves from.",
    },
  ],
} as const satisfies PageType
