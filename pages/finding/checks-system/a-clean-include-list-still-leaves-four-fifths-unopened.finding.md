---
id: d638055e-9c02-5dcd-ace9-63d457c875af
page-type-slug: finding
title: "A clean include list still leaves four fifths unopened"
domain-slug: domain/checks-system
---

# Claim

The six dead include entries are gone, and nothing hid behind them: `bunx tsc -b --force` reported one error before and one after, and it belonged to neither list. The inverse is the live gap. No tracked `.ts` is orphaned — all 10,996 are claimed by one of 274 configs. But `tsc -b` from the root walks 97 of those 274 and opens 3,022 files. And `ops audit rule-population`, built to catch a rule that weighed nothing, draws its own subjects from a hand-written array of 20.

# Evidence

Measured against `main` on 2026-08-28, at `bc5bfde5f`, `fa6378289` and `94df3883d`.

Removed: three entries from `shared/pages-access/tsconfig.json`, the same three from `shared/status-bar-access/tsconfig.json`, and `../../tools/lib/code-import.ts` from `infra/scripts/tsconfig.json`. All seven named a path absent from disk. `alanwalton/personas-core` carried none. Include counts after: 99, 106, 8, 6 — 219 entries, 0 dead.

`bunx tsc -b --force` at the root: 1 error before, 1 after, `temper/scripts/src/watcher/import-inventory.unit.test.ts(60,3)` TS2741, in neither list. Each of the four packages forced alone: 0. No TS6307 anywhere, so no list is short today. Plain `tsc -b` runs in 1.1s against 23.8s forced, and that cached state is what let two TS6307 land green.

The inverse, taken with the TypeScript API over all 274 tracked `tsconfig.json`: every one of the 10,996 tracked `.ts`/`.tsx` outside `node_modules`, `dist` and `.d.ts` is a root input of at least one project. The orphan set is empty.

What narrows is the build graph, not the lists. Walking `references` from the root config reaches 97 of the 274 configs. Building those 97 opens 3,022 files; 8,733 (79.4%) are never opened by `tsc -b` — `tools/lib` 1,609, `tools/tests` 637, `alanwalton/web` 430, `infra/cluster-checks` 375, `temper/web` 369. 5,192 of them have an importer. No opened file imports a never-opened one, so the sets are import-closed: a control, not an argument. Whether another instrument reaches them is not measured here.

Among the unopened sits `tools/lib/check-workflow/population.ts`, 110 importers, the machinery the audits report their populations through.

The class recurs inside the instrument. `ops audit rule-population` weighs `SYNTAX_SCANNER_ENTRIES`, a hand-written array of 20 at `infra/cluster-checks/src/lib/scanner-registry.ts:25-46`. A scanner never added there is never weighed, and the run prints the same green.

Population: tracked files only; untracked generated trees unseen.
