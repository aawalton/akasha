---
id: 8c015fb7-adee-50d0-945b-da5a2538277f
page-type-slug: finding
title: "Inode reap alert removed"
domain-slug: repo/code-repo
---

# Claim

Four live files in `packages/shared/utils/system` describe the reap tick's inode pass as the thing that raises an alarm, and that pass has not alerted since its per-instance latch and its message to the harness lead were removed. `workstation-drift.ts`, which holds the pass, says so in its own header. A reader who reaches the inode gauge through any of the four is told a filling inode table will announce itself, and nothing will.

# Evidence

`packages/shared/utils/system/src/workstation-drift.ts` lines 4 to 11 record the removal: each of the three conditions "was a reap-tick pass that scanned every 60s, held a durable per-instance marker so it alerted once, and messaged the harness lead", and "Nothing here holds a latch, because a latch exists only to stop a message repeating and nothing here sends one."

The files still describing that pass as alerting:

- `src/inode-guard.ts` lines 15 to 18 — the consumers are the read verb, "the reap tick's inode pass", and the spawn boundary, "so the number an agent reads by hand, the number that raises the alarm, and the number a spawn is refused on have one definition".
- `src/system/inode-pressure.ts` lines 7 to 8 — the verb prints `assessment.verdict` verbatim, "the same value the reap tick's inode pass alerts on".
- `src/system/inode-pressure.ts` line 82 — the `--help` body, printed by `ops system inode-pressure --help`: deciders "the reap tick alerts on and the spawn gate enforces".
- `src/system/registry.ts` line 19 — the summary printed by `ops system --help`: "Print the host inode-pressure verdict (same decider the reap tick alerts on…)".
- `src/system/inode-pressure.unit.test.ts` line 15 — "pure deciders the reap tick alerts on and the spawn gate enforces".

That package's `CLAUDE.md` carried the same wording. It is no longer in the code repo; it stands quarantined in the instructions repo at `dirty/code/packages-shared-utils-system-claude.md` and is queued for removal there.

`bun ops system inode-pressure` run on this host on 2026-08-07 reports `PRESSURE yes`, `/tmp` at 54.52% of its ceiling in the warn band, and nothing was messaged.
