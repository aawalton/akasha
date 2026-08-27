---
id: 8dc4757b-ded6-5e20-98cf-426363156002
page-type-slug: finding
title: "Filler job parse drops silent"
domain-slug: domain/narrative-production
---

# Claim

The filler-jobs read path in `db-filler-jobs-parse.ts` silently drops rows that fail schema validation and returns a shortened array with no signal that anything was dropped, so a caller cannot distinguish "there are 74" from "there are 187 and only 74 could be read."

# Evidence

Filed as project #16158, domain `narrative-production`, status `someday_maybe`.

Found by worker-15965 by suspecting its own instrument: a subagent reported 74 failed jobs, direct SQL said 187. Verified independently: failed=187 (113 carrying `narrator`), pending=50 (0 carrying it). 187-113=74, matching the CLI's number. The 113 dropped rows carry a `payload.narrator` key that `FillerJobPayloadSchema` (`.strict()`) rejects.

**Residual of the filer's own #15904 fix.** `db-filler-jobs-parse.ts:141-144` does `safeParse` and `continue` on failure — per-row isolation so one poison row couldn't break the whole read. It works, but converted a loud total failure into a silent partial answer.

**Defect.** A stderr line per dropped row is invisible to programmatic consumers. The function returns a short array with no indication it is short; callers can't tell "74 total" from "187 total, 74 readable."

**Blast radius is read-only today, by luck**: all 50 pending rows are clean `{command}` payloads, so `queuedChapterIds` (`enqueue-narration-plan.ts:36-45`), reading the same path, is unaffected — but one bad key away from silently dropping a chapter from the dedupe set.

**Lineage**, traceable to #15580 (also the filer's): #15580 removed the "narrator" key from `FillerJobPayloadSchema` while live rows still carried it; #15904 fixed the resulting un-listable queue via per-row isolation; #16158 (this project) — that isolation now silently under-counts.

**Fix shape, undecided:** return the drop count/ids alongside the rows. Consider cancelling the 113 legacy rows — flagged not to do alone, would hide the class without fixing it.

**Related:** #15965 (50 pending rows must be re-enqueued before drain-enable), #16101 (enqueue/drain-time narrator divergence). A later correction fixed a shell-expansion typo that had eaten "narrator" from the #15580 line; reflected above.
