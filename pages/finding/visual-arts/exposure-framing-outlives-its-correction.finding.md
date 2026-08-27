---
id: 8680085c-3e2f-5984-9852-0d9d829142af
slug: exposure-framing-outlives-its-correction
page-type-slug: finding
title: "Exposure framing outlives its correction"
domain-slug: domain/visual-arts
---

# Claim

The corpus struck "repeated low-pressure exposure" as Zeli's mechanism and the strike is scoped to one line, while the framing stands on three live surfaces: her row's `purpose`, her row's `conduct`, and tracked source in the daily-tracking package. A lead boots from the row and a reader of the code meets the corrected mechanism named as the live one.

# Evidence

The correction, live. `pages/book-chapter/all-about-alan/personas/zeli.book-chapter.md:48` — "Her method cannot be exposure-by-repetition." Line 11 of the same file scopes the strike: "(One correction the soul capture makes to that roster line: the 'repeated low-pressure exposure' mechanism predates the capture, and it is not how the scar actually comes down…)". `pages/book-chapter/all-about-alan/notes/scar-recovery-model.book-chapter.md:46` heads a section "Why exposure-by-repetition can't be the engine".

Surface one, the row's `purpose`. `ops page show 019ee230-9ab9-7e88-b555-c8a536318388 --properties purpose`, read 2026-08-07: the work turns the act safe "through gentle, unjudging, repeated low-pressure exposure".

Surface two, the same row's `conduct`, which the correction does not reach: "**Safety-gate the exposure.**" and "pushing past yellow/red while depleted runs the exposure loop *backward* and re-traumatizes."

Surface three, tracked code. `packages/alanwalton/daily-tracking/src/session-points-totals.ts:83` and `src/run-commit-points.ts:292` both call it "The exposure-therapy faucet". `git ls-files` returns both, so this is live source and not build residue.

Roots swept: `~/books`, `~/instructions`, `~/code`, `~/memory`, with `rg -uuu -U --multiline-dotall`.
