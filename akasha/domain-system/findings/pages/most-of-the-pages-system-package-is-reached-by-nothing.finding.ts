import type { Finding } from "../finding.page-type.ts"

export const mostOfThePagesSystemPackageIsReachedByNothing = {
  id: "01a05c25-bfd8-7000-834f-17c3fae2e810",
  pageTypeSlug: "finding",
  slug: "most-of-the-pages-system-package-is-reached-by-nothing",
  domainSlug: "domain/akasha-migration",
  claim:
    "Ten of the 52 TypeScript files in `shared/pages-system` are reached by anything at all, and those ten now stand in akasha. The other 42 are reached by nothing anywhere: not by name, not by a relative path, not dynamically. They were written into `shared/` hours before this reading, so the call taken was to leave them standing rather than carry them in or delete them.",
  evidence:
    "The manifest declares five ways in. Reaches by name across the repository, leaving out `bun.lock`: `/page-type` 11 files, `/formula` 2, `/read/held` 1, `/write/landing` 1, `/query` none. Nothing reaches it by a relative path and no dynamic import names it. Walking out from those five covers 10 files.\n\nThe 42 left are query (7 with its cases), read (7 beyond `held`), write (7 beyond `landing`), `name` (1, never exported at all) and `formula/cases` (20).\n\n`write/landing` is reached, but inertly. Its one importer `repo/land/page-landing.ts` exports `useAkashaLanding` and `landsInAkasha`, and nothing imports either. `landsBy`, the only reader of the callback it holds, sits in `write/land.ts`, which nothing reaches.\n\n`formula/cases` is no test; nothing runs it. It is the formula language's specification held as data, and `pages/initiative/formula-name-translations.md` cites it by file and line as authority. akasha cannot hold it as it stands: a module has one page and one code file, with at most one test and one test-fixtures file beside them, so 20 sibling `.ts` files under one page do not land.\n\nCarried in: the formula language as `@akasha/pages-formula`, and `pageTypeOf` as `@akasha/pages-system/markdown-page-type`. Those answer 14 of the 15 inbound files.\n\nOne cost of stopping here: the formula language stands twice, since the leftover engine imports the shared copy. Nothing outside reads that copy, so drift reaches no caller.",
} as const satisfies Finding
