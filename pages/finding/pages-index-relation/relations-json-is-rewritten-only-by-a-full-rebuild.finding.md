---
id: 1eb1ed99-9b52-5187-96f6-432a11a0e013
page-type-slug: finding
title: "Relations json is rewritten only by a full rebuild"
slug: relations-json-is-rewritten-only-by-a-full-rebuild
domain-slug: domain/pages-index-relation
---

# Claim

`relations.json` tells the page index which relations to walk, and only a full rebuild writes it. `keepRelations` at `page/index/store/store.ts:427-431` has one caller, `page/index/build.ts:208`, inside `buildOver`. The landing path `landHere` at `build.ts:388-401` reads relations and never writes them. So adding or changing a page type or property definition leaves the index walking the old relation set, and no freshness surface reports the gap.

# Evidence

Measured 2026-08-28 at `48a6a7171d`.

Writes: `keepRelations` at `page/index/store/store.ts:427-431`, called from `page/index/build.ts:208` alone, under `underIndexLock` at `build.ts:204-216`.

The landing path never reaches it. `landHere` at `build.ts:388-401` calls `appliedInto` at `build.ts:357-371`, which calls `loadRelations()` at `build.ts:363` and `keepPages` at `build.ts:369` — a read and a page write, no relation write.

Readers of the file: `build.ts:220`, `build.ts:363`, `page/required-reading/warrant/warrant.ts:20`, `checks-system/check/relation-resolves/relation-resolves.check.code.attachment.ts:167`, `graph/edge-producer/relation/relation.graph-edge-producer.code.attachment.ts:66`.

Nothing reports the gap. The only freshness surfaces are `indexFreshFor` and `staleIn` at `page/index/store/store.ts:235-256`, which compare `built-from.json` marks against page oids. A landing that changes a page-type page writes `pages.jsonl` and advances the mark through `markLanded` at `repo/land/landing.ts:109-121`, so freshness reads true while `relations.json` is stale.

A drift stood at the moment of measurement: `.git/pages/index/relations.json` 134,475 bytes, mtime Aug 27 21:08, against `pages.jsonl` mtime Aug 28 03:49 — six hours forty-one minutes.

`relations.json` appears in no other finding in the 3,120-file corpus.

Not measured: how many relations the stale set differs by.
