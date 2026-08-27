---
id: 4ca94c88-2ff1-5f7f-9ef3-c66ef52c073e
slug: bare-ts-cohort-justification-drifted
page-type-slug: finding
title: "Bare ts cohort justification drifted"
domain-slug: domain/global
---

# Claim

`check-bare-ts-cohort-seeds.ts`'s prose justification for `syntax-bundle`'s repo-wide (bare-cohort) exemption names only 12 of the 22 scanners the bundle actually runs, per its own summary line (measured 2026-07-26 from landed main `1ae33e1162`) — a hand-maintained list beside the machine-maintained `ENTRIES` array, with no test asserting the two agree; the ten omitted scanners are named in evidence.

# Evidence

From project #16443 (domain `code-harness`). Never carried an objective — this is its capture, moved off the row's retired `notes` attribute on 2026-08-15. Measured 2026-07-26 from landed main (`1ae33e1162`), while working #16420.

Prose in `check-bare-ts-cohort-seeds.ts`: "Coalesces 12 pure-AST scanners (no-class, no-enum, no-void-return, method-signature-bivariance, type-assertions, readonly-collections, exhaustive-dispatch, boundary-parse, timezone-handling, no-raw-pages-sql, no-raw-metrics-sql, pages-gin-friendly-sql) over the universal TS/TSX cohort — repo-wide by construction." Bundle's own summary, same tree: `[syntax-bundle] OK — all 22 scanners clean over 13,139 TS files scanned.` The ten omitted: `no-hardcoded-message-source`, `libc-ffi-binding`, `suspense-throw-settles`, `sops-spawn-pipe`, `page-type-slug-validity`, and two tstl entries.

Why a row, not a typo: the string justifies a repo-wide exemption — what a reviewer reads to decide the step deserves its cohort. Drifted by ten members, it no longer describes what it justifies, and nothing relates it to `ENTRIES`: hand-maintained prose beside a machine-maintained array, no test asserting agreement.

Same class as #16420 / #16398 / #16084: a stated coverage claim nothing checks, claim and reality diverging silently. Here drift understates coverage, misleading a reviewer rather than hiding a violation — one step milder, but the mechanism is identical and the direction is not guaranteed to stay favourable.

Existence check first: whether the enumeration should exist at all. A justification reading "coalesces every pure-AST scanner in `ENTRIES` (N today)," derived from `ENTRIES.length`, would be true by construction and could not drift — cheaper than pinning a hand-kept list with a test.

`check-syntax-bundle.ts` interpolates its entry count into two user-facing strings (summary, empty-cohort refusal), so `ENTRIES.length` is already the live denominator; nothing new needs computing.
