import type { Finding } from "../finding.page-type.ts"

export const mockModuleLeaksIntoEveryLaterTestFile = {
  id: "01a05bbe-127b-7000-b446-759b78e1b2f7",
  pageTypeSlug: "finding",
  slug: "mock-module-leaks-into-every-later-test-file",
  domainSlug: "workspace-package/testing-system",
  claim:
    "A test calling `mock.module` replaces that module for every test file running after it, so a package landing with a mocked store breaks tests it never names.",
  evidence:
    '`akasha/sms-access` landed with two tests mocking `@akasha/pages-query` and `@akasha/pages-query/ask`. Each passed alone, and `akasha test --file-path akasha/sms-access` answered 13 pass. The whole suite answered 3208 pass and 1 fail, and the failure was `a write stating the keys a page would carry is refused for want of a renderer` in `akasha/pages-system/pages-query/store-writing/store-writing.module.test.ts` — a file that names sms-access nowhere. Bun keys the override on the resolved path, so mocking the package specifier replaces the same file the store-writing test imports by a relative path, and one process runs every file. Those two were the only `mock.module` calls under `akasha/` when this was found, so no landed test showed the pattern to copy. The fix that landed in 4d8383baff holds the real namespace before mocking and puts it back in `afterAll`: `import * as pagesQuery from "@akasha/pages-query"`, `const REAL_PAGES_QUERY = { ...pagesQuery }`, then `afterAll(() => { mock.module("@akasha/pages-query", () => REAL_PAGES_QUERY) })`. The suite then answered 3209 pass and 0 fail.',
} as const satisfies Finding
