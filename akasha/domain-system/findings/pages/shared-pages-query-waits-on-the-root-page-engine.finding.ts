import type { Finding } from "../finding.page-type.ts"

export const sharedPagesQueryWaitsOnTheRootPageEngine = {
  id: "01a05c10-e187-7250-b91a-ec1bfd1da268",
  pageTypeSlug: "finding",
  slug: "shared-pages-query-waits-on-the-root-page-engine",
  domainSlug: "domain/akasha-migration",
  claim:
    "`shared/pages-query` is no shim over `@akasha/pages-query` but the local-first router above it, and the only bridge by which akasha modules reach the page files on this machine. Moving it into akasha is ordering-blocked behind the root page engine rather than merely hard.",
  evidence:
    "`@akasha/pages-query` holds five modules and all five are the store over HTTP. `shared/pages-query/src` holds what routes above it: `here.ts` decides per page type whether a question is answered here or there, `store-spelling.ts` carries the camel and kebab compat shim, `named.ts` binds saved queries, `writing.ts` lands writes locally. None of that stands in the akasha package, whose own page nonetheless reads `It stands in for the deleted @shared/pages-query`. That deletion never happened.\n\nThose five files carry ten relative specifiers out of `src/`: seven into `tools/lib`, one each into `page/`, `repo/` and `readouts/`. Calling `reachedBy` from `imports-inside.code-check.code.ts` on each, written at the depth an akasha module page would sit, refuses all ten, `../../../../tools/lib/page-query.ts` reaching `tools/lib/page-query.ts`. That check runs on patch, so `akasha write` refuses every one of the five modules.\n\nWalking those ten targets over their own relative imports reaches 214 files and 694,511 bytes: 109 under `tools/`, 48 under `page/`, 10 under `repo/`, 6 under `readouts/`. That is the local page engine and it is what a move would have to carry.\n\nThe remaining way is a package outside akasha re-exporting those ten names so the akasha package names a package rather than reaching a path. That is what `@shared/pages-query` already is for the akasha modules reaching it. It keeps the letter of `imports-inside` and defeats its gap, that a reader of akasha needs nothing outside akasha to follow what akasha says. Not taken here.",
} as const satisfies Finding
