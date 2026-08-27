---
id: edbcde14-2337-54eb-aa92-9b665140d19f
page-type-slug: finding
title: "Persona day writes manufacture noop events"
domain-slug: domain/pages-system
---

# Claim

`page_patch_by_id` stages an `updated` event with no change detection, unlike `pages_bulk_upsert` which already suppresses no-ops, so callers like `patchPersonaDayFields` and the idle-persona-card projection write unconditionally and manufacture a no-op event storm that was measured driving persona-reward-watcher's oversized sweep rate.

# Evidence

Project #16246, domain `pages-system`, tags `workers performance events wal author:worker-16240`, owner `astra`, status `someday_maybe`.

Surfaced during #16240, which cut the tick rate driving these writes (~24-60x less volume). This row is the underlying defect: writes should not fire when nothing changed.

1. `patchPersonaDayFields` never compares before writing (persona-day-points.ts:234-271); `page_patch_by_id` stages 'updated' with no change detection (:186-193), unlike `pages_bulk_upsert`, which suppresses no-ops (:254-260). PROVEN: Eppie's relationship-progress row emitted one page.updated/minute, patch and oldValues byte-identical. Callers pre-#16240: 8 persona-points workers, nova-words-read, alanwalton-daily-tracking (3x). ~11,500-19,700 events/day, nearly all empty-delta. `WriteOutcome` is create-vs-update only, not a change signal.

2. These no-op events are persona-reward-watcher's alarm clock (#16241): 19,745 events/24h drove ~267 sweeps/hr, worker inside a sweep >100% of wall time. #16240 cuts the manufacturing rate; this row removes the manufacture.

3. idle-persona-card: 170,070 updated events/24h against 134 live rows, ~118/134 rewritten every tick, #2 event producer — even via `pages_bulk_upsert`, which HAS suppression; the payload is time-varying. `idle/CLAUDE.md:99,107` documents this as dormant; retirement (captured follow-up) removes the volume.

4. Two misleading flags: `faucetWritten` in nova-words-read/fun-points is hard-set true whenever the row is found — unconditional-write markers, not change signals; fun-points' `writePersonaDayFaucetPoints` also patches with no compare.

FIX SHAPE: add change-detection at the write boundary (page_patch_by_id, or narrower patchPersonaDayFields); preserve the deliberate self-heal at persona-day-points.ts:249-263.

ROUTED 2026-07-25 (dalla intake): homed to astra. Root defect is page_patch_by_id inconsistent with pages_bulk_upsert; the other two are callers exhibiting it.
