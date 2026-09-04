import type { Finding } from "../finding.page-type.ts"

export const thePageIndexIsTrustedWithoutBeingCheckedAgainstTheTree = {
  id: "01a05cc3-f730-7ee6-b46f-9d273e3dc37c",
  pageTypeSlug: "finding",
  slug: "the-page-index-is-trusted-without-being-checked-against-the-tree",
  domainSlug: "domain/data",
  claim:
    "The page index is read as if it were the tree, so a page deleted outside `land()` leaves a row nothing removes and nothing detects. Every rule set reads all property-definition files eagerly, so one dead row stops all of them. That is what took the whole repo check suite down: not a wrong path in any source file, but a cache no reader is able to distrust.",
  evidence:
    "`scannedFromIndex` in `page/index/scan/scan.ts:14-39` returns rows from `.git/pages/index/pages.jsonl`. Its only freshness test is `marks[repo] === undefined` — that a mark exists, never that it matches the tree. There is no `existsSync` anywhere on this path. `readAt` in `tools/lib/rules-engine-rule-set.ts:31-33` then does a bare `readFileSync` on every row. `definitionsOn` (lines 80-93) reads all 2232 property-definition files and only then filters by `defined-on-slug`, so a dead row anywhere kills every rule set rather than the one that named it. 98 of the 2232 rows named files no longer on disk, deleted across ten commits: 36 by `4e6ba6e6ec`, 35 by `54ee772b64`, 8 by `0bb8f2e390`, 7 by `dd23a8dbdb`, 4 by `315b286f18`, 3 by `1bd76d57e1`, 2 by `71cd386b6c`, and one each by `b756cfab46`, `30503fa5a8` and `24de2e522f`. `bun tools/run-checks.ts` died at the alphabetically first of them, `claude-account-access-token-expires-at`, before any of its 31 checks ran. `built-from.json` was stamped Aug 28 21:35 while `pages.jsonl` was still being patched Sep 1 05:30, because `markLanded()` in `repo/land/landing.ts:76-88` no-ops once `markFrom(before) !== held[repo]` fails, and then keeps no-opping. `bun tools/ops/cli.ts index refresh` rebuilt 55877 pages and the suite now runs all 31 checks — 18 pass, 9 fail, 5 advisory. That repaired the data. The reader that cannot tell fresh from stale is unchanged, so this recurs the next time a page is deleted by plain git rather than through `land()`.",
} as const satisfies Finding
