---
id: 93838832-7467-5207-8dd4-4e5b45f6708c
page-type-slug: finding
title: "An uncommitted sidecar is in no check's population"
domain-slug: domain/pages-system
---

# Claim

274 `.uncommitted.jsonl` sidecars hold 4.16M rows that no check ever sees. The audit's tree is `git ls-files`, at `checks-system/run/tree.ts:9`, so a gitignored path never becomes a subject, and the gate's subjects come from `git diff --cached`, which one cannot enter. These rows are not a tail waiting for a commit to gather them: nothing gathers them, no commit has ever touched one, and `sweep-log-days.ts` destroys them at seven days.

# Evidence

Measured 2026-08-28 on main at `1675fa0f2`. `find . -name '*.uncommitted.jsonl'` outside `node_modules` returns 274 files — 272 under `pages/seat-log-day/`, 2 under `agent/seat/` — holding 4,164,795 non-blank rows and growing about 795 a minute. `git ls-files` returns none, and `git log --all -- '*.uncommitted.jsonl'` returns 0 commits: not one has ever been tracked. The tracked corpus is 11,296 `.jsonl` files holding 411,580 rows.

The two are disjoint data rather than two stages of one pipeline. Tracked rows stand under `pages/skill`, `pages/class` and `pages/spell`, with no `pages/seat-log-day` among them, so the ratio to the tracked tree compares unlike populations.

`auditRun` at `checks-system/run/audit.ts:31-38` does drop a path whose oid is missing, but that walk never sees one: `tree.paths()` comes from `onDisk` at `checks-system/run/tree.ts:52-53`, which is `trackedIn`, which runs `git ls-files -z` at `:9`. `onDisk` means the tracked tree, not what is on disk. The oid filter at `:36-37` drops tracked paths gone from disk instead (`repo/oid/oid.ts:57-60`). The gate is shut too: `checks-system/run/gate.ts:77-82` takes its subjects from `git diff --cached`.

Rows are judged on the way in, though only for their keys: `judgeRow` fires at `tools/lib/page-rows-write.ts:174`, `:216` and `:305-311`.

Nothing gathers them. The `uncommitted` flag's only origin is the property definition, at `tools/page/page-rows-home.ts:40`, and `rowsLanded` skips `commitAll` on it at `:269`. `services/sweep-log-days.ts:94-96` then deletes every sidecar beside a log day older than the `DEFAULT_KEEP_DAYS = 7` at `:42`; its timer last ran 2026-08-28 00:00.

Two homes declare `uncommitted: true` beside `rows:` — `log-day.lines` and `seat.turn-end-decisions`, the latter being the two files under `agent/seat/`.

`pages/domain/page-storage-uncommitted.domain.md:29` already states that a file its repo ignores is written without passing the write gate.