---
page-type-slug: finding
slug: an-unplaceable-write-answers-null-with-no-reason
title: "An unplaceable page write answers null, carrying no reason and refusing nothing"
domain-slug: domain/page-writes-system
---

# Claim

`writePage` at `tools/lib/page-write.ts:86-89` answers `Written | null`, returning `null` wherever `whereFor` could not work out a destination, and `patchPage:116-119`, `patchState:141-143` and `removePage:154-157` carry the same shape. One word covers three unrelated causes and carries no reason with it, so a caller can only refuse in words it guesses at, or drop it. Every one of the five that tests it names the first cause alone; `tools/lib/log-append.ts:48` and `:53` do not test it.

# Evidence

Read 2026-08-28 at `ff99cd48a4`.

    tools/lib/page-write.ts:86   writePage   -> Written | null
    tools/lib/page-write.ts:116  patchPage   -> Written | null
    tools/lib/page-write.ts:141  patchState  -> Where | null
    tools/lib/page-write.ts:154  removePage  -> Written | null

Each is `const at = whereFor(...)` followed by `if (at === null) return null`, with nothing between the two asking why.

`whereFor` at `tools/lib/page-write-where.ts:59-92` answers null in three places: `:66` no page type of that slug stands in the registry, `:68` the page type's repo is not addressable, `:70` that repo is not cloned here. It never answers null for a page that does not yet stand — `:91` composes `${dir}/${newPageNameFor(type, name)}` for one that does not — so the null is always a failure to place, never an absence.

Five callers test it, and each states the first cause as though it were the only one. `tools/lib/page-query-landing.ts:152-156` answers HTTP 404 with "is not a page type this service writes"; `tools/lib/editor-arrangement.ts:184` returns that same sentence; `tools/commands/chess/play-game.ts:191-192`, `tools/commands/exercise/mobility-log.ts:113-114` and `tools/commands/exercise/equipment-set.ts:109` each throw "names no page type whose pages are files". A repo that is simply not cloned here reaches a reader as a claim about the page type.

`tools/lib/log-append.ts:48` and `:53` discard the return. The refusal that does eventually come is produced by the second `standing(...)` at `:49` and `:60` asking the filesystem again, so that caller is saved by a re-look rather than by the answer it was handed.

Not measured: whether any of the three `whereFor` conditions has been reached in production. Nothing records a null at these sites, so this is a reading of the code rather than of a run.
