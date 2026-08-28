---
id: c5e1621d-2d00-5919-a451-462a17032d8f
page-type-slug: finding
title: "A split sidecar's key is read as its part number"
domain-slug: domain/pages-system
---

# Claim

`checks-system/check/page-holds-to-its-type/rows.ts:8` splits a rows sidecar's name with `const DATA_FILE = /^(.*)\.([a-z0-9-]+)\.jsonl$/`. Group 1 is greedy, so where a sidecar has been split into parts it swallows the rows key and leaves the part number standing in its place.

| name | group 1 | group 2 | outcome |
| --- | --- | --- | --- |
| `eso.temper-mine.items.jsonl` | `…/eso.temper-mine` | `items` | line 29 finds the `temper-mine` page, line 32 finds the `items` property; judged |
| `eso.temper-mine.items.part10.jsonl` | `…/eso.temper-mine.items` | `part10` | `part10` matches `[a-z0-9-]+`, so the file is accepted as a sidecar; line 29 then asks `claimant` for a page at `…/eso.temper-mine.items.md`, finds none, and returns `none` at line 30 |

`none` is also what `rowsHeldBy` answers for a file that is not a rows sidecar at all. Nothing distinguishes "this is not a rows file" from "this is a rows file whose key I mis-parsed", and the call site at `page-holds-to-its-type.check.code.attachment.ts:83-86` reads both as the first: `if (slug === null) continue`. That is the pages-system domain's own rule failing in the form the rule names — `pages/domain/pages-system.domain.md:38`, "A true empty and a failure read alike, and only one of them is a fault."

Across the tracked tree the check reaches 11,271 of 11,296 `.jsonl` files and 263,407 of 411,579 rows. The 148,172 rows it does not reach are 36.00% of every row in the repository.

# Evidence

Measured on 2026-08-28 against the tree on main, by calling `rowsHeldBy` directly over every path `git ls-files -- '*.jsonl'` returns, with the same `treeOver` tree and `registryOf` registry the check builds.

Twenty-five files answer `none`. Twenty-four of them are `.partN.jsonl` sidecars holding 148,081 rows: twenty-three under `pages/temper-mine/` holding 147,941, and `pages/generation-log/alan.generation-log.runs.part2.jsonl` holding 140. The twenty-fifth, `dirty/the-tower/rolls.jsonl` with 91 rows, is a genuine non-sidecar — its name carries no `<page>.<key>` at all — and is the only one of the twenty-five that should answer `none`.

For `eso.temper-mine` alone: `eso.temper-mine.items.jsonl` holds 7,499 rows and is judged; the twenty-three `eso.temper-mine.items.partN.jsonl` beside it hold 147,941 and are not. The check reports on 4.83% of that sidecar's 155,440 rows and says nothing about the rest. `eso.temper-mine.quests.jsonl`, 3,373 rows, is unsplit and is judged. Row counts are non-blank lines; every one of the twenty-four files ends in a newline, so a line count is a row count.

There is no `part1`. `page/rows-file.ts:34` writes `rowsPartOf` as `part <= 1 ? rowsPath : ...`, so part one is the unsuffixed file and a sidecar in twenty-four parts carries twenty-three `.partN` names.

The writer disagrees with this parse in a second way that costs nothing today. `page/rows-file.ts:11` states the sidecar shape as `/\.[a-z0-9-]+(?:\.part\d+)?(?:\.uncommitted)?\.jsonl$/`, so `.uncommitted` is a suffix a sidecar may carry, and 263 such files stand on disk under `pages/seat-log-day/`. `DATA_FILE` would read the key of `a.lines.uncommitted.jsonl` as `uncommitted`. No row is lost to it, because `.gitignore:2` holds `*.uncommitted.jsonl` and the audit walks tracked files only, so no uncommitted sidecar is ever put to the check.

The check refuses nothing on this corpus today: `ops checks audit page-holds-to-its-type` returns 228 failures, all of them shape or property failures against `.md` pages, and none against a `.jsonl` file. So the unreached rows are not rows that would have passed; they are rows nothing has ever put a question to.

Not established here: whether any of the 148,081 unreached rows would in fact fail. `rowsOutside` at `rows.ts:66` judges one row per distinct set of keys and skips the rest, so reaching a file is not the same as judging every row in it, and the count of rows reached is an upper bound on the count judged.
