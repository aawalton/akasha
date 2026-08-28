---
page-type-slug: finding
id: c00f0de6-df3f-5852-a3c4-10b0581a8dee
slug: limit-after-materialising
title: "A query costs its whole page type whatever limit it asks for"
domain-slug: domain/page-queries-system
---

# Claim

A page query builds every row matching its `where` before `limit` narrows the result, so one answer costs its whole page type however few rows it asks for: `collection` costs 1425 MB for one row and for all of them alike. Resident size climbs far above retained heap and comes back only later, so heavy answers close together carry it past the 8 GB ceiling a reaper enforces. This is not a leak: retained heap across three rounds stands at 2166, 2431 and 2376 MB. The cost is now paid inside `ops`.

# Evidence

Against the live roots, calling the answering path directly; `heapUsed` post-collection, `rss` resident.

    collection                 +1390 MB  4326 ms
    collection at limit 1      +1425 MB  4113 ms
    story-chapter-royal-road   + 699 MB  5127 ms, 303 MB body

Both kills were `memory-reaper` at a per-process ceiling: `VmRSS 10.1 GB exceeds 8.0 GB ceiling`, then 9.1 GB. No kernel OOM report; host held 30 GB free; the unit caps nothing.

`story-chapter-royal-road` is 17,709 files, 318 MB behind its glob, answering in 5239 ms. The two runs near a gigabyte served none; the death that could be typed served six. A live run hit 5.4 GB in 4m15s then sat flat, ten samples spanning 15 MB. Resident does come back: one run fell 1097 MB to 444 MB in ten seconds against a 1200 MB peak. Served one at a time: over 29,567 lines the peak in flight was 1. A fresh process reached 8.3 GB 38 seconds after starting.

**The code settles it** (read 2026-08-28 at `150a81cdb`), in `tools/lib/page-query.ts`. `answer` at `:219` loads `derive.rows(query.pageType)` at `:222`, unconditioned by `limit`; the walk at `:240-246` builds an unbounded `matched: Row[]`; the slice is at `:167`, inside `cut`, called at `:282` with the complete `matched` — the one place `query.limit` is read, below the walk and the sort at `:159-163`. `found` is an `Iterable<Row>`: what is held across calls is the walk (`deriver-hold.ts:22-23`), what is materialised per call is `matched` — every row passing `where`, with none the whole type.

**Not short-circuitable.** The walk empties `unseen` and `unfound` (`:233-236`), which `absent` rests on, so stopping at `offset + limit` would silently break that refusal. A stated `sort-by` forces the full set too.

**The cost moved.** That service is deleted. The same path runs inside `ops`: `cli.ts:29` via `page-queries-in-process.ts:26-28` to `answer`, which 29 files import directly. The reaper is name-blind: `MAX_RSS_GB = 8` (`memory-reaper-legs.ts:11`), `memory-reaper-plan.ts:58-70` exempts only pid 1 and itself, so the ceiling now bears on any `ops` run answering a heavy query.
