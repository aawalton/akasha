---
id: 786e233e-62a5-5374-ad21-0760a528b1dc
slug: status-aggregate-hides-nonterminal-members
page-type-slug: finding
title: "Status aggregate hides nonterminal members"
domain-slug: page-type/pipeline
---

# Claim

`ops pipeline status`'s `pipelines.non_terminal` counts pipeline rows only and cannot see member workflows or steps, so a partially-cancelled tier can report `non_terminal=0` while a member workflow one level down still reads `running` — observed live during Alan's 2026-07-25 full-stop verification, where it produced a false clean verdict that had to be retracted.

# Evidence

Project #16244, domain `pipeline`, tags `ci devops observability aggregate-derivation false-negative author:aranya`, owner `dalla`, status `someday_maybe`.

DEFECT: `bun ops pipeline status`'s `pipelines.non_terminal` counts pipeline rows only, not members, so a partial-cancel tier reports clean.

OBSERVED 2026-07-25: during Alan's full stop, `pipeline status` returned `pipelines.non_terminal=0`; pipeline 25909 (`project-16192`) held workflow `preparation`=running, `checks`=pending, 96 steps pending. Aranya gave Alan a clean full-stop verification off this number and retracted it once read directly.

WHY: per `.claude/docs/aggregate-derivation.md`, an aggregate should derive from the same pass as its explanation; absent is not false. Here it derives from a different pass than its members, so it disagreed with them.

CANDIDATES, not decided: (1) derive the aggregate from members (principled); (2) narrow the label, add workflows/steps.non_terminal lines (cheap honest); (3) surface non-terminal-child-under-terminal-parent. `--help` calls itself "DB-only narrow status" — documented but still misleading in use.

CARRIER ROW, 2026-07-25T19:48Z: absorbs #15929, #16228 (bucket B2). Collapsed by aine, owner approval from dalla and athena; all unclaimed `exploration`, nothing orphaned. Theme: the pipeline CLI/status surface reports things that are not true.

ABSORBED #15929 — pipeline retry erases the failure record; retried-green reads never-failed. Dalla, verbatim: "A `retryCount` attribute would be a SECOND SOURCE OF TRUTH for what `public.events` already holds append-only — reproducing #16244's own defect." Candidate (c) only: no new attribute, surface events-derived history in `pipeline show`.

ABSORBED #16228 — force-fail-step writes a false PodDeleted red onto a healthy step; re-scoped at absorption per athena (re-scope before/during, never after); further detail lost to the capture boundary.

Siblings cover the cancel cascade and missing parent-status guard.
