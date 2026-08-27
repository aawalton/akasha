---
id: 51568d4a-a0f8-5429-978d-6906349f07ee
page-type-slug: finding
title: "Package verdict permanently fail"
domain-slug: domain/global
---

# Claim

`ops tests run packages/infra/checks` reports `VERDICT: FAIL` on every run, so a regression in that package cannot be told from the three failures that are always there.

The three are deliberate fixtures under `__fixtures__/mock-module-leak/pkg-fetchseam/src/`, and `bun test` over the same path on the same commit reports 0 fail and exits 0. Measured 2026-08-09 on `main` at `85869430d1`.

# Evidence

Measured 2026-08-09 against the workstation checkout of `~/code` at `main`, commit `85869430d1`, read-only.

`ops tests run packages/infra/checks` exits 1 and ends with `[component] 3 failing test(s) — bun's own output is on stderr above` and `VERDICT: FAIL — the-named-test-suites: 3 failing test(s) [over 305 test files (denominator not computed)]`. Its own inner tally on that same run reads `3479 pass, 0 fail` across 271 files, so the three are counted somewhere outside the tally the run prints.

The three files are `packages/infra/checks/__fixtures__/mock-module-leak/pkg-fetchseam/src/delegate.component.test.ts`, `stub.component.test.ts` and `victim.component.test.ts`. Each carries a header describing itself as turning a cryptic module-leak failure into fix-the-invocation guidance, so failing is what they exist to do.

`bun test packages/infra/checks` over the same path on the same commit reports `3634 pass, 0 fail` across 305 files and exits 0. The two runners disagree about the same tree: one collects the component rung and renders a verdict over it, the other does not.

The consequence is the reading rather than the fixtures. A package whose verdict is FAIL on every run cannot report that it has begun failing, and anyone running the suite has to know from somewhere other than its output which three failures were expected. A fourth would arrive as the same word.

Reported by the seat on #17907 and reproduced here rather than taken on its word. It is untouched by that row's change: the fixtures predate it, and the failing count is the same before and after.
