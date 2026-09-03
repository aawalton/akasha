import type { Finding } from "../finding.page-type.ts"

export const theCutFingerprintModuleStillReadsCutsAsMarkdown = {
  id: "01a0685d-b81f-7be0-9d01-0c567b04e323",
  pageTypeSlug: "finding",
  slug: "the-cut-fingerprint-module-still-reads-cuts-as-markdown",
  domainSlug: "domain/akasha-migration",
  claim:
    "The nine mobile cuts now stand as akasha pages under `akasha/mobile-cli/mobile-cuts/pages/`, but `cut-fingerprint` still reads and files cuts as markdown under `pages/mobile-cut/`, which no longer exists. Until that module is repointed, `mobile cut-status` answers that a cut is owed for every app, and `akasha deploy` throws when it tries to file the cut it takes.",
  evidence:
    'Read 2026-09-03. `akasha/mobile-cli/cut-fingerprint/cut-fingerprint.module.code.ts` reads through `readFilePages(MOBILE_CUT_PAGE_TYPE_SLUG, CUT_KEYS)` from `@tools/lib/file-pages` and files through `writePage(...)` from `@tools/lib/page-write` \u2014 both the old markdown system. Its module page states the coupling outright: "The mobile-cut pages here are markdown files under pages/mobile-cut at the checkout root."\n\nWhat breaks, traced through the code rather than run: `cutPagesOf` catches `PagesMissing` and returns `[]`, so `readLatestCutFingerprint` returns null, so `compareCutStatus(null, current)` returns `{ owed: true, buildInputChanged: true }` for every app. Nothing raises; the wrong answer is simply reported. `recordCutFingerprint` throws where `writePage` returns null.\n\nThree invariants on that module now misdescribe it and must change with the code: the markdown departure quoted above, "The page store is not asked for a `mobile-cut`", and "A filed cut carries the id the cut\'s own address yields rather than a minted id" \u2014 the nine landed pages carry uuid version 7 ids keeping the last eight hex of the derived v5 ids they replace, which is what `page.page-type.ts` asks and what the address-derived id cannot give.\n\nNot measured: I did not run `mobile cut-status`, and I did not repoint the module. The nine pages were verified field-for-field against their markdown before the markdown was removed.',
} as const satisfies Finding
