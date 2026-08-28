---
id: 01a0200f-54c2-7000-8dd1-cf05d638f3b4
slug: a-row-type-check-is-too-costly-as-a-per-request-fault
page-type-slug: finding
title: "A row type check is too costly as a per request fault"
domain-slug: domain/pages-system
---

# Claim

Reporting a row's declared-type mismatch as a fault beside the answer adds 178ms to a 155ms warm query on `temper-mined-item` — about doubling it, not the tripling once read here. Two premises have gone: there is no row type check to place, `judgeRow` evaluating no value rule; and the `faults` channel it would report through has no live reader, the one CLI on it throwing. Caching the fault set is cheap for 44 of 45 row page types and defeated for the largest.

# Evidence

Re-measured 2026-08-28, seven runs per page type, medians, one page type per process.

| page type | rows | warm answer | key checks | rule evaluation | added |
|---|---|---|---|---|---|
| `class-reference` | 107,457 | 4,870ms | 851,268 | 39ms | +0.8% |
| `temper-mined-item` | 155,440 | 155ms | 6,061,777 | 178ms | +115% |
| `inference-run` | 7,132 | 75ms | 145,432 | 6ms | +8% |

The 2026-08-20 reading was 129/71ms, 177/490ms and 33/15ms. `temper-mined-item` is identical in rows and key checks, so its 490ms was a different measurement rather than corpus drift. The `class-reference` row was wrong by 38×: of its 4,870ms, 4,435ms is `rowsPartsOf` at `page/rows-file.ts:92-113` doing a `readdirSync` and a fresh `RegExp` per holder page, across 4,209 `class` holders. `temper-mined-item` has one holder. That is a larger, separate defect.

No check exists to place: `judgeRow` at `page/property/judge.ts:184-207` calls no `rule.holds`, reading a set of names and never a `Property.type`.

The reporting place has no reader. `answer()` carries `faults` at `tools/lib/page-query.ts:257`, but `tools/commands/page/query.ts:68` throws on it and exits 1, treating a fault exactly as it treats `absent` — which is what this record argued against. `page-query-client.ts` omits `faults` from `Answered` entirely.

The fault set costs 924ms to compute once over `log-line` and 1,488 bytes to hold, 74 deduplicated entries over 4.17M rows, and forces nothing to be materialised: a lazy fold peaks at 745 MB against the 6,924 MB a full hold cost. `readParsed` at `tools/lib/page-rows.ts:98-115` already builds the array and accumulates `faults`. It is defeated for `log-line` alone, by `HELD_RECORDS = 400_000` at `:12` — 4.11M rows against that bound evicts each parse before reuse, so four walks cost 5.9, 5.6, 5.5 and 5.9s. `pages-system/store/` holds no such cache at all.

Standing scale: 255,461 of 411,499 rows outside `log-line` — the 255,306 count confirmed, the 72.3% not, being 62.1%.