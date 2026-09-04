import type { Finding } from "../finding.page-type.ts"

export const aCatalogReachesNoBrowserSoWebsLastCompletionEdgesHaveNoSource = {
  id: "01a0639d-022f-73c8-a438-a39a353b57ed",
  pageTypeSlug: "finding",
  slug: "a-catalog-reaches-no-browser-so-webs-last-completion-edges-have-no-source",
  domainSlug: "domain/temper",
  claim:
    "The 12 web call sites that must hand a catalog to a repointed transform have nowhere to get one. No catalog reaches a browser: `page-entries` reads the `.jsonl` through `node:fs`, and web reads only user-data page types over Supabase. The road that does answer entries is `askComposed` in a route loader, and the completion route has no loader at all.",
  evidence:
    "Measured 2026-09-02 at `45e4a4950f`. Two parsers over the git index, a TypeScript AST reader and `ts.preProcessFile`, agree on 21 import declarations from `temper/web` to `@temper/player-completion` across 4 files, over 348 TypeScript files of web's 357 tracked, none skipped; a seeded specifier scored 0.\n\nComparing each imported value against its twin by signature: of the 13 `transform*` functions, 12 gained a catalog parameter and `transformAccountZoneCompletionUnion` alone is one-for-one. `transformCompletionCharacters` gained two ahead of its optional argument rather than after it, so appending them would misplace both.\n\n`akasha/pages-system/page/entries/page-entries.module.code.ts` imports `node:fs` on line 1, and `entriesAt` reads the file with `readFileSync`. No `use*Entries` hook is exported anywhere under `akasha/`. Every page type web reads live is user data, `temper-account` and `temper-account-character` and `temper-companion-progress` among them, and no catalog type is.\n\nWhat would render a catalog writes into the package being ablated: 9 `outputPath` rows under `akasha/temper/temper-catalog-generators` name `temper/player-completion/src/generated`.\n\nThe server road is proven for another page type: `temper/web/app/routes/api.items.tsx` line 27 awaits `askComposed`, and `page-asking` answers an entry property as an array. Web serves no `/api/ask` route and holds no `clientLoader`, so a catalog reaches these components only as `loaderData`.",
} as const satisfies Finding
