import type { Finding } from "../finding.page-type.ts"

export const chessPuzzlesSolvedHasNoPagesToAskOf = {
  id: "01a06582-bd62-7e66-a5f0-c6b5a55b8487",
  pageTypeSlug: "finding",
  slug: "chess-puzzles-solved-has-no-pages-to-ask-of",
  domainSlug: "domain/akasha-migration",
  claim:
    "`chess-puzzles-solved` asks of page type `chess-puzzle` and narrows on key `solved`, and no page of that page type exists. The 5,063 Lichess puzzles are rows in one jsonl beside the `lichess` chess-puzzle-set page, so that query answers nothing until each puzzle is a page of its own.",
  evidence:
    "akasha/pages-system/page-queries/pages/chess-puzzles-solved.page-query.ts line 7 asks of `chess-puzzle` and line 8 narrows `solved` is true. The migration kept the set shape the old data had: akasha/alan/chess/chess-puzzle-sets/chess-puzzle-set.page-type.ts declares one `puzzles` property, an entry shape at akasha/alan/chess/chess-puzzle-sets/properties/puzzles.page-property-entry.ts, and the rows are beside the page at akasha/alan/chess/chess-puzzle-sets/pages/lichess/lichess.chess-puzzle-set.puzzles.jsonl, 5,063 lines and 2,081,990 bytes, byte-identical to the backup copy. Of those rows 5,063 carry id, title, puzzleId, fen, moves, rating, ratingDeviation, popularity, nbPlays, themes, gameUrl, license and solverColor, 1,017 carry openingTags and 3 carry solved. The shape was chosen because 5,063 page files is a poor trade against one file of rows, and because akasha/story/worlds/world.page-type.ts keeps many rows beside one page the same way. Answering `chess-puzzles-solved` needs a `chess-puzzle` page type and 5,063 pages carrying the fields the entry shape already names, or a query able to ask of the rows a page carries.",
} as const satisfies Finding
