---
id: 93838832-7467-5207-8dd4-4e5b45f6708c
page-type-slug: finding
title: "An uncommitted sidecar is in no check's population"
domain-slug: domain/pages-system
---

# Claim

`page/rows-file.ts:9` names a sidecar still being filled `.uncommitted.jsonl`, and `.gitignore:2` holds that name. An audit's subjects are the paths git has an object id for — `checks-system/run/audit.ts:35-38` walks the tree and drops every path `oidsUnder` does not answer for — so an uncommitted sidecar is put to no check at all. 263 of them stand on disk holding 3,895,169 rows, nine times every row in the tracked tree, and nothing judges one of them.

# Evidence

Measured 2026-08-28 on main. `find . -name '*.uncommitted.jsonl'` outside `node_modules` returns 263 files, 262 under `pages/seat-log-day/` and one under `agent/seat/`; their non-blank lines total 3,895,169. `git ls-files -- '*.uncommitted.jsonl'` returns none, so not one is tracked. The tracked corpus for comparison is 11,296 `.jsonl` files holding 411,579 rows.

The gap is the population rather than the parse. `page-holds-to-its-type` reaches a file only if the audit hands it one, and `auditRun` builds its subject list by looking each path up in `oidsUnder(root, null)` and skipping a miss. A gitignored path has no entry, so it is never a subject. Naming the check on the command line does not change this; the population is settled before any check is chosen.

Separately, the parse in `checks-system/check/page-holds-to-its-type/rows.ts` did not know the suffix either: it read the key of `a.lines.uncommitted.jsonl` as `uncommitted`. That is now corrected — `page/rows-file.ts` takes `.uncommitted` and `.partN` off the stem before reading the key — but the correction buys nothing here, because these files never reach the check to be parsed.

Whether they should be judged is not settled here. These sidecars are the tail of a page's rows before a commit gathers them, so a row in one is on its way to a tracked file and will be judged when it lands. What is not established is how long a row sits there, whether every uncommitted row does land, and whether a row that fails after landing is any easier to repair than one refused on the way in.
