---
id: 01a0200f-54c2-7000-8dd1-cf05d638f3b4
page-type-slug: finding
title: "A row type check is too costly as a per request fault"
domain-slug: domain/pages-system
---

# Claim

Reporting a row's declared-type mismatch as a fault beside the answer, rather than as a refusal, cannot be done as a per-request check. Measured on the live `answer()` path, evaluating the rule for every key of every row adds 490ms to a 177ms warm query on `temper-mined-item` — it nearly triples the largest query on the service the fleet reads through. Doing it cheaply means caching the fault set beside the already-cached sidecar parse, which is a design decision, not a small landing.

# Evidence

Measured 2026-08-20 against `answer()` in `tools/lib/page-query.ts`, timing rule evaluation over every key of every row returned.

| page type | rows | warm answer | key checks | rule evaluation |
|---|---|---|---|---|
| `class-reference` | 107,457 | 129ms | 851,268 | 71ms |
| `temper-mined-item` | 155,440 | 177ms | 6,061,777 | 490ms |
| `inference-run` | 6,992 | 33ms | 142,590 | 15ms |

So the added cost runs from about +55% on a mid-sized type to about +277% on the largest, per request, on a service many agents read through concurrently.

The shape is right and only the placement is wrong. `absent` is a caller error and refuses loudly; a corpus defect the caller does not own belongs beside the answer on the 200. `answer()` already carries `faults: derive.faults()` in its `beside` block, so the place to report it already exists and has a live non-test caller.

What makes it cheap is that a sidecar's parsed rows are already cached by size and mtime in `tools/lib/page-data-rows.ts`. A fault set computed once per body change, rather than once per request, costs nothing on the read path. Where that cache lives is the open question.

Standing scale, re-measured rather than subtracted: 255,306 of 352,945 sidecar rows across 43 row page types would be reported, 72.3%. An earlier figure of 255,302 in this work was arithmetic — the previous count of 257,556 less the 2,254 cleared by declaring `notification.link` as text — and the measured number differs from it by corpus growth during the run.
