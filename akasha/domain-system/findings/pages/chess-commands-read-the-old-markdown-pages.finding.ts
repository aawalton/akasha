import type { Finding } from "../finding.page-type.ts"

export const chessCommandsReadTheOldMarkdownPages = {
  id: "01a06582-bd62-7de7-8a06-4b411e3ca26c",
  pageTypeSlug: "finding",
  slug: "chess-commands-read-the-old-markdown-pages",
  domainSlug: "domain/akasha-migration",
  claim:
    "The chess pages moved into akasha and the four ops chess commands still reach only `pages/`, so `ops chess-game list` and `ops chess-game show` answer with nothing, `ops chess play-game` lands a game no reader reaches, and `ops chess-puzzle sync` reads no puzzle rows to key its ids by.",
  evidence:
    "The migration moved pages/chess-game, pages/chess-progress and pages/chess-puzzle-set to akasha/alan/chess/chess-games/pages/<slug>/<slug>.chess-game.ts, akasha/alan/chess/chess-progresses/pages/<slug>.chess-progress.ts and akasha/alan/chess/chess-puzzle-sets/pages/lichess/. tools/commands/chess-game/list.ts line 10 names the page type and line 75 hands it to `answer` from tools/lib/page-query.ts. tools/commands/chess-game/show.ts line 96 hands the same name in and line 102 throws `no chess-game found with id`. tools/commands/chess/play-game.ts line 193 throws where the page type reaches no files, and line 217 prints the path it landed at. tools/commands/chess-puzzle/sync.ts line 96 calls `load(roots, CHESS_PUZZLE)` and line 91 takes the set name off a `.jsonl` file name. Measured rather than reasoned: after the landing, `ops chess-game list` answered `no games found`; copying one backup file to pages/chess-game/master-games-opera-morphy-1858.chess-game.md made the same command print that game's row again; the copy was then removed. So the deriver behind tools/lib/page-query.ts reaches pages under `pages/` and not the TypeScript pages under `akasha/`. resolveRoots in akasha/pages-system/checkout-roots walks up from its own file rather than from the caller's directory, so this is the same for every working directory. tools/ is another agent's lane, so nothing here was rewritten.",
} as const satisfies Finding
