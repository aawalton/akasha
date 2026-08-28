---
id: 53409d7d-de52-5562-aa9c-e761c606c4c3
page-type-slug: finding
title: "The landing mark is read and written outside the index lock"
slug: the-landing-mark-is-read-and-written-outside-the-index-lock
domain-slug: domain/pages-index
---

# Claim

`built-from.json` is the one remaining lost-update site in the page index. `markLanded` at `repo/land/landing.ts:109-121` reads it at `:110` and writes it whole at `:120`, and its caller at `:158` stands outside `underIndexLock`, so two landings for different repositories can drop one repository mark. `pages.jsonl` no longer has this shape: its read-modify-write was brought under the lock.

# Evidence

Measured 2026-08-28 at `48a6a7171d`.

`builtFrom()` reads at `page/index/store/store.ts:193-208`; `keepBuiltFrom` writes the file whole at `store.ts:210-215`. The read-modify-write around them is `markLanded` at `repo/land/landing.ts:109-121`, called at `landing.ts:158`.

It is outside the lock deliberately, and the code says so at `landing.ts:150-157`: the mark is written outside the index lock, weighed rather than missed, and two landings for different repositories can drop one repository mark. The weighing is the roughly 170ms the mark git walk costs against the roughly 190ms of lock hold a landing already pays, both at `landing.ts:153-154`.

The other half of the claim this came from is repaired. `loadPages()` at `page/index/build.ts:392` through `keepPages` at `build.ts:369` now runs inside `underIndexLock` at `build.ts:391`; `buildOver` does the same at `build.ts:204-216`. The lock is `underIndexLock` at `page/index/store/store.ts:308-312` with `INDEX_WAIT_MS = 8_000` at `store.ts:306`. Its docstring at `store.ts:284-296` cites the incident it was built for: a subagent page landed at 19:32:03 on 2026-08-27 and its row was still missing seventeen minutes later.

Relation and identity writes carry no lock of their own — `updateAt` at `store.ts:118-124` and `updateNamedIn` at `store.ts:150-157` — because every caller stands inside `underIndexLock`, recorded at `store.ts:106-117` and `:142-149`.

Not measured: how often two repositories land close enough together to drop a mark.
