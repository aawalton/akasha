import type { Finding } from "../finding.page-type.ts"

export const everyBookChapterPageImportsItsPageTypeOneLevelTooHigh = {
  id: "01a06a51-7d22-7b40-8e13-49af20d1c6b2",
  pageTypeSlug: "finding",
  slug: "every-book-chapter-page-imports-its-page-type-one-level-too-high",
  domainSlug: "domain/akasha-migration",
  claim:
    "All 449 `.book-chapter.ts` pages under `akasha/alan/library/reading/book-chapters/pages` import their page type with one `../` too many, so every one resolves to `reading/book-chapter.page-type.ts`, which is absent. Nothing is destroyed: the page type is intact one folder lower. The same defect in `akasha/story` has a repair campaign of 37 batches with 9 landed; no commit in 12 hours touches this tree.",
  evidence:
    "Measured 2026-09-03. A scanner resolving every relative import specifier under `akasha/` against the filesystem, seeded first on a folder with one resolvable target and one absent, reported the absent one alone. Over 79,279 relative specifiers it finds 2,627 unresolvable; dropping generated `.react-router` and `dist` output and the deliberate fixtures under `code-checks/pages`, `context-warrants` and `code-specifier` leaves 1,248 in non-test files, 1,049 of them these two page types.\\n\\nOne known blind spot: the scanner matches import lines written inside string literals in test fixtures, which is what produced its `held.page-type.ts` hits. Those are synthetic file bodies in `code-typing.module.test.ts`, so `held` is no real absence.\\n\\nThe book-chapter page type is at `reading/book-chapters/book-chapter.page-type.ts`. Its 449 pages sit at six depths and each uses exactly (depth minus 5) `../`: 254 at depth 9 use four, 86 at 12 use seven, 52 at 10 use five, 33 at 11 use six, 16 at 8 use three, 8 at 13 use eight. Every one climbs to `reading/` rather than `reading/book-chapters/`, and `find` counts 449 such pages, so none resolve.\\n\\nFor world-class, 3,585 of 4,178 foldered pages use the correct `../../` and 593 use `../../../`. `git log -1` on 25 broken ones names three `the wandering inn's mechanics become pages` batches; on 25 correct ones it names thirteen `migration: akasha/story page imports, one level too deep` commits. `git log --oneline --since=12.hours` matching `library` or `book-chapter` returns nothing.",
} as const satisfies Finding
