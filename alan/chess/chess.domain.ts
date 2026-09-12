import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const chess = {
  id: "01a05be1-cb07-74d3-b8ca-8a6e71097f9b",
  type: "domain",
  slug: "chess",
  definition: "a chess engine spoken to as a program, and a game played out through it",
  parts: [
    "module/chess-board",
    "module/chess-engine",
    "module/chess-eval",
    "module/chess-eval-bar",
    "module/chess-game",
    "module/chess-game-loop",
    "module/chess-game-record",
    "module/chess-maia",
    "module/chess-move-list",
    "module/chess-position",
    "module/chess-puzzle-lichess",
    "module/chess-state",
    "module/chess-uci",
    "page-type/chess-game",
    "page-type/chess-progress",
    "page-type/chess-puzzle-set",
    "page-type/chess-review-session",
    "stylesheet/chess-board-look",
  ],
} as const satisfies Domain
