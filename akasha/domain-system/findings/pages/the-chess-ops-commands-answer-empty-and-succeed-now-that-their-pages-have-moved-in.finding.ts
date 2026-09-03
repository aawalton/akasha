import type { Finding } from "../finding.page-type.ts"

export const theChessOpsCommandsAnswerEmptyAndSucceedNowThatTheirPagesHaveMovedIn = {
  id: "01a06576-00b3-7d88-815e-85c66d3f3ef7",
  pageTypeSlug: "finding",
  slug: "the-chess-ops-commands-answer-empty-and-succeed-now-that-their-pages-have-moved-in",
  domainSlug: "domain/akasha-migration",
  claim:
    "`ops chess-game list` answers `no games found` and exits 0 now that the 25 games are akasha pages. It does not fail, so nothing tells a caller the reader went blind rather than the shelf going bare. Every old-system command reading a page type whose pages have migrated will report this same false empty.",
  evidence:
    'Run 2026-09-02 straight after the chess migration landed: `ops chess-game list` printed `no games found` and exited 0. The 25 games are all there, at akasha/alan/chess/chess-games/pages/, verified byte for byte against the backup, so the answer is wrong rather than the data missing.\n\ntools/commands/chess-game/list.ts:75 and tools/commands/chess-game/show.ts:96 both ask the old query layer for `pageType: "chess-game"`, which reads markdown pages under `pages/`. tools/commands/chess/play-game.ts and tools/commands/chess-puzzle/sync.ts write into the same places. An empty answer and an unreadable one are the same string to all four.\n\nThis is worth more than the four commands. The failure is shaped so that migrating a page type makes its old readers quietly correct-looking, and a migration is judged done by the pages having moved rather than by anything asking whether a reader followed. Every lane in this initiative ends in this state for as long as an old command survives its pages.\n\nA second gap came with the same landing. `akasha/pages-system/page-queries/pages/chess-puzzles-solved.page-query.ts` asks of page type `chess-puzzle` narrowing on `solved`, and no `chess-puzzle` page type was made: the 5,063 puzzles are rows under a `puzzles` page-property-entry on one `chess-puzzle-set` page. The page type says so itself, as a gap invariant reading `A puzzle is a row here rather than a page a query may ask of`. So that query cannot be answered until the puzzles become pages.',
} as const satisfies Finding
