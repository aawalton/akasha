---
page-type-slug: finding
slug: a-missing-index-file-answers-empty-rather-than-missing
title: "A missing index file answers as an empty result rather than as a miss"
domain-slug: domain/pages-index
---

# Claim

Three readers in `page/index/store/store.ts` turn an absent index file into an empty answer rather than a miss: `sourcesAt` at `:92-95` and `namedIn` at `:126-129` each answer `[]`, and `loadRelations` at `:433-441` answers an empty map on an absent file and on a parse failure alike. Nothing on the path reaching the first two asks whether the index was built over the repo, so a missing file reads as no page carrying that name and nothing pointing at that target.

# Evidence

Read 2026-08-28 at `ff99cd48a4`.

`bodyOrGone` at `store.ts:83-90` turns ENOENT into `null` and rethrows anything else, which is the miss signalled correctly. The fault is what its callers make of that `null`.

    92 export function sourcesAt(relation: string, target: string): readonly Source[] {
    93   const text = bodyOrGone(relationFileFor(relation, target))
    94   return text === null ? [] : sourcesOf(text)
    95 }

`namedIn` at `:126-129` is the same body over an identity file, and `pagesNamed` at `:159-166` is built on it. `loadRelations` at `:433-441` returns `new Map()` on `!existsSync` at `:435` and again from a bare `catch` at `:439-440`.

`loadPages` at `:413` is a fourth `return []` and is not part of this claim, because it is guarded: `page/index/scan/scan.ts:45-53` refuses by name when `builtFrom()` carries no mark for the repo, `page/index/build.ts:392-398` throws when the index holds no page, and `page/page-types.ts:249-258` and `page/property/registry.ts:110-128` test `indexReaches` before reading it.

`sourcesAt` and `namedIn` carry no such guard, and the path that consumes them carries none either. They are read at `page/required-reading/address-index/address-index.ts:41` and `:72`; that index is built by `page/required-reading/warrant/warrant.ts:28-39`, and no file under `page/required-reading/` names `builtFrom`, `indexFreshFor`, `staleIn` or `indexReaches`. `lookFor` at `address-index.ts:40-48` then turns the empty array into `null` through `found.length !== 1`, and that reaches `ops read`'s own resolution at `ops-cli/global/read/required.ts:28,40`. A missing index file shortens what a seat is told it must read, and reads exactly like a path warranting nothing.

Not measured: how often a file under `relation/` or `identity/` is absent in a live checkout, and whether any seat has been under-warranted by it.
