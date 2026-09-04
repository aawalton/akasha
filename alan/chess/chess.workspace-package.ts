import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const chess = {
  id: "01a05be1-cb07-74d3-b8ca-8a6e71097f9b",
  pageTypeSlug: "workspace-package",
  slug: "chess",
  definition: "a chess engine spoken to as a program, and a game played out through it",
  manifest: "json",
  partSlugs: [
    "module/chess-engine",
    "module/chess-uci",
    "module/chess-position",
    "module/chess-maia",
    "module/chess-game",
    "module/chess-game-loop",
    "module/chess-game-record",
    "module/chess-board",
    "module/chess-eval",
    "module/chess-eval-bar",
    "module/chess-move-list",
    "module/chess-state",
    "module/chess-puzzle-lichess",
    "stylesheet/chess-board-look",
    "page-type/chess-game",
    "page-type/chess-progress",
    "page-type/chess-puzzle-set",
    "page-type/chess-review-session",
  ],
} as const satisfies WorkspacePackage
