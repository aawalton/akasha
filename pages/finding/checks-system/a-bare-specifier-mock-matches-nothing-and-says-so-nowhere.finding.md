---
page-type-slug: finding
slug: a-bare-specifier-mock-matches-nothing-and-says-so-nowhere
title: "A bare specifier mock matches nothing and says so nowhere"
domain-slug: domain/checks-system
---

# Claim

A test can mock a specifier its package does not export. The mock matches nothing, the subject's own import reaches the real module, and no line anywhere says a mock matched nothing.

Two packages are in that state today, and both are dialling out of the test suite as a result — one at a deleted service, one at production.

# Evidence

This supersedes `a-mock-on-a-barrel-is-disarmed-by-deleting-it`, whose mechanism was wrong. That page said Bun writes a bare-specifier mock backwards through a re-export chain, so deleting the barrel disarms it. For the five `@shared/pages-query` sites that is not what is happening, and the disproof is direct: `shared/pages-query/src/index.ts` **defines** the write surface — `patchPage` at `:277`, `writeRow` at `:427` — and holds **zero** re-export lines. `ask.ts:11` imports `./index`. The dependency runs subpath to entry, the opposite of a barrel.

Credit for the correction: a delegate on the pages-system initiative did not argue the instruction, it tried it. Moving one test onto `@shared/pages-query/ask` (`d115e45f7f`) sent three of four tests straight to the real functions, caught by the live-write guard, and it reverted at `54dc747407`. The failed experiment is also the proof that the bare mock is genuinely reached, and that the keys reached are `patchPage` and `writeRow` and no others.

THE ACTUAL MECHANISM. `mock.module("@shared/foo", …)` is silently disarmed when `shared/foo/package.json` declares no `"."` export. The specifier resolves to nothing, so the mock matches nothing, and the subject's subpath import reaches the real module. Nothing reports a mock that matched nothing.

THE SWEEP, now answered. Of the five packages mocked by bare specifier:

    HAS "."   pages-query, open-questions, supabase-server
    NO  "."   status-bar-access, monarch-categorization-access

The two without are exactly the two observed dialling out. `api.safety-level.unit.test.ts` calls the deleted page query service four times per case, 5 pass and 5 fail over 11.19s of retry. `api.categorization.unit.test.ts` reaches `https://alanwalton.com/api/categorization` — production — four times, 9 pass and 2 fail.

ALSO. `mock.module` registers per process, not per file. `import-inventory.unit.test.ts` depends on a mock registered by five unrelated files, unnoticed because that mock was about 90% real functions.
