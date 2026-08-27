---
id: c10e8dcd-266b-581c-b0c1-c96d2727672e
slug: legal-endings-untested
page-type-slug: finding
title: "The halt-census legal-endings module has no test covering it"
domain-slug: domain/code-quality
---

# Claim

`tools/lib/halt-census-legal-endings.ts` has no test covering it.

# Evidence

Its only test was `tools/tests/halt-census-legal-endings-recording.test.ts`, removed on 2026-08-18 in `808a0a53` along with the vectors and case modules only it reached. The removal was Alan's call: the recording test held frozen digests that an unfinished verb-to-command rename had moved, and it had been red for days.

`tools/lib/halt-census-baseline.ts` lost its recording test in the same commit but still has `tools/tests/halt-census-baseline.test.ts`, so it kept coverage. `halt-census-legal-endings.ts` had no second test and now has none. `parseEndingDeclaration`, `readEndingDeclaration` and `LEGAL_ENDINGS_RULE` are exercised by nothing; `tools/lib/halt-census-gather.ts` calls them in production.
