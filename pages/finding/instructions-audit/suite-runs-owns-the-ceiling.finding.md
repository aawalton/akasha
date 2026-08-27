---
id: 15cee9b4-9ea7-5d1e-8c91-9e8be736b753
page-type-slug: finding
title: "Suite runs owns the ceiling"
domain-slug: domain/global
---

# Claim

The check suite runs past its own 30s ceiling and reports itself a failure on every run, and `suite-runs` is 24.2s of the 29.9s the other 43 checks and it spend together.

# Evidence

`bun tools/run-checks.ts` on 2026-08-15 ended `[checks-ceiling] fail — 30.6s against a 30s ceiling`, with every one of the 44 checks having reported its own verdict first. A second run naming all 43 checks except `category-rules-disjoint`, added the same day, took 30.2s — so the overrun stands without it and nothing landed that day caused it.

Timing each check on its own over one shared repo view, in the order `CHECKS` declares them, put the total at 29.9s and the spread at:

- `suite-runs` 24.22s
- `terms-in-reach` 1.91s
- `hooks-fire` 0.52s
- `pages-hold-shape` 0.50s
- `code-path-reaches` 0.42s
- `pages-hold-properties` 0.36s
- `email-rules-cover` 0.36s
- `email-rules-disjoint` 0.36s
- `cli-help-flag-references` 0.28s
- `category-rules-disjoint` 0.23s
- every remaining check at 0.10s or under

`suite-runs` reports 4858 tests across 370 files, which is the unit suite run inside a check. The other 43 together come to 5.7s, so the ceiling holds with about 24s of headroom the moment `suite-runs` is not one of them, and no reduction anywhere else reaches it.

The gates a write is held to are a separate set and ran at 0.5s throughout the same session, so this failure reaches whoever runs the check suite by hand rather than every landing.
