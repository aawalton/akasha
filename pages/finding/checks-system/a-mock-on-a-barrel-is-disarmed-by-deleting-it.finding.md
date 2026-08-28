---
page-type-slug: finding
slug: a-mock-on-a-barrel-is-disarmed-by-deleting-it
title: "A mock on a barrel is disarmed by deleting it"
domain-slug: domain/checks-system
---

# Claim

Five packages are mocked by their bare specifier while the code under test imports their subpaths. Bun writes such a mock backwards through the re-export chain, so the stub is live even though nothing under test imports the barrel — and removing the barrel stops the stub being reached without failing anything that says so.

For `@shared/pages-query`, mocked this way five times, the uninstrumented path dials a service that has been deleted.

# Evidence

The mechanism is not mine: a seat on the pages-system initiative hit it on `shared/pages-access`, where deleting a barrel under such a test turned one test into four live network calls and an attempted write. This is the sweep for where else it can happen, recorded before anyone deletes one.

THE SHAPE. A test calls `mock.module` on a package's bare specifier while the code under test imports that package's subpaths. Bun applies the mock backwards through the re-export chain, so the stub is live though nothing under test imports the barrel. Remove the barrel and the mock resolves nothing — the test still runs, the stub is absent, and the real module answers.

THE SWEEP. 90 `mock.module` call sites across tracked `.ts`/`.tsx`. Five mock a bare package specifier:

     5  @shared/pages-query
     1  @shared/monarch-categorization-access
     1  @shared/open-questions
     1  @shared/status-bar-access
     1  @shared/supabase-server

`@shared/pages-query` is the barrel-over-subpaths shape exactly: `package.json:7-13` declares `"." -> ./src/index.ts` beside `./ask`, `./fetcher`, `./live-version` and a `./*` wildcard, and `src/index.ts` imports `./answer-schema`, `./opened`, `./fetcher`, `./retry`. Both patterns are live at once — the bare specifier is mocked 5 times, `@shared/pages-query/ask` 3 times.

WHY THIS ONE IS WORST. The uninstrumented path through `@shared/pages-query` dials the page query service, which has been deleted. A disarmed mock here falls through to a call on something absent, from a test suite, with no line saying the stub went missing.

NOT CLAIMED: that any of the five is wrong today. All work, and the tests pass for a real reason while the barrel stands. The claim is that the passing depends on a file none of these tests names.

THE ORDER THAT WORKS: convert the tests onto subpath mocks first, then remove the barrel. A barrel cannot be edited here, only deleted — `export-declared-here` refuses every forwarded export.

NOT MEASURED: whether the other four have the subpath shape; only `@shared/pages-query` was opened.
