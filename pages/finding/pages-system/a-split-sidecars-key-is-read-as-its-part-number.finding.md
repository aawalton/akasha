---
page-type-slug: finding
title: "A split sidecar's key is read as its part number"
domain-slug: domain/pages-system
---

# Claim

`checks-system/check/page-holds-to-its-type/rows.ts:8` splits a sidecar's name on a greedy `(.*)`, so where a sidecar is split into parts group 1 swallows the rows key and the part number stands in its place. No page stands at the swallowed path, so `rowsHeldBy` answers `none` — which is also its answer for a file that is no sidecar at all. Nothing tells a mis-parse from a true empty, and 148,081 rows in 24 split sidecars go unjudged and unsaid.

# Evidence

Measured 2026-08-28 on main, calling `rowsHeldBy` over every path `git ls-files -- '*.jsonl'` returns, with the tree and registry the check itself builds.

| name | group 1 | group 2 | outcome |
| --- | --- | --- | --- |
| `eso.temper-mine.items.jsonl` | `…/eso.temper-mine` | `items` | line 29 finds the page, line 32 the property; judged |
| `eso.temper-mine.items.part10.jsonl` | `…/eso.temper-mine.items` | `part10` | `part10` matches `[a-z0-9-]+`, so the name is taken; line 29 finds no page at `…items.md`, line 30 returns `none` |

25 of 11,296 tracked `.jsonl` answer `none`. 24 are `.partN.jsonl` holding 148,081 rows — 23 under `pages/temper-mine/` holding 147,941, and `pages/generation-log/alan.generation-log.runs.part2.jsonl` holding 140. The 25th, `dirty/the-tower/rolls.jsonl`, 91 rows, is a real non-sidecar and the only one that should answer `none`.

For `eso.temper-mine.items`: 7,499 rows judged, 147,941 not, so the check reports on 4.83% of 155,440. Counts are non-blank lines; every file ends in a newline. There is no `part1` — `page/rows-file.ts:34` writes part one as the unsuffixed file, so 24 parts carry 23 numbered names.

This is `pages/domain/pages-system.domain.md:38` failing as written: a true empty and a failure read alike. The call site at `page-holds-to-its-type.check.code.attachment.ts:83-86` takes both for the empty.

`ops checks audit page-holds-to-its-type` returns 228 failures, none against a `.jsonl`, so the unreached rows are not rows that passed — nothing has ever put a question to them.

Not established: whether any of the 148,081 would fail. `rows.ts:66` judges one row per distinct key set, so reaching a file is not judging every row in it.
