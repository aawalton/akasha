import type { Finding } from "../finding.page-type.ts"

export const movingTheSeatPageTypeIntoAkashaEmptiedItsReader = {
  id: "01a05c6d-006c-7000-9543-8ba14e32a8e2",
  pageTypeSlug: "finding",
  slug: "moving-the-seat-page-type-into-akasha-emptied-its-reader",
  domainSlug: "domain/akasha-migration",
  claim:
    "Moving the seat page type's declaration into akasha silently emptied its reader. The old engine finds page types only in markdown under `pages/page-type`, no `seat.page-type.md` stands, so the query answers null, `seat-forest-asked.ts` swallows it as `?? []`, and the editor's agent tree draws an empty forest with no refusal said anywhere.",
  evidence:
    'Run here: `answer(resolveRoots(), { pageType: "seat", keys: ["slug"] })` answers null, while `ios-app` answers 3 rows and `chess-game` 25. The cause is `page/page-types.ts`, which builds the page types it knows from the glob `pages/page-type/**/*.page-type.md`. `seat-conditions`, `seat-log-day`, `seat-turn-end-decision` and `seat-turn-end-reading-case` still stand there as markdown; `seat` itself does not, because its declaration is now `akasha/seat-system/seat/seat.page-type.ts`.\n\n`tools/lib/seat-forest-asked.ts` asks for it at line 71, and both loops that follow read `asked?.rows ?? []`, so null becomes an empty list rather than a refusal. Its one importer is `editor-extension/src/features/agent-tree/forest.ts`, so what goes blank is the agent tree.\n\nPointing the reader at the index does not fix it either. `sortBy` is supported and `asking(root, query)` would run the query, but the seven indexed seat pages carry 5 of the 17 keys it reads: `principal-seat-name`, `supervisor-process`, `turn-state`, `turn-pending-source`, `turn-end-reading` and the `turn-working` components are per-turn runtime state a committed page cannot hold.\n\nThis is the failure mode every later step of the migration risks. A page type whose declaration moves ahead of its readers answers null, and a caller written to tolerate a page type that is simply absent cannot tell the two apart. A reader wanting the old engine after its type has moved needs the markdown declaration left standing, or the null distinguished from none.',
} as const satisfies Finding
