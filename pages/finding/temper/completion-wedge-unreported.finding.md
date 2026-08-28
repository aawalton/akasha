---
id: 134ad4a1-e0ea-5559-a652-d305f3f58628
slug: completion-wedge-unreported
page-type-slug: finding
title: "Completion wedge unreported"
domain-slug: domain/temper
---

# Claim

A `temper-task` whose `completedAt` is stamped while its completion automation does not run is wedged for good, and nothing reports it. That automation triggers on the field going from empty to filled, so a dropped event leaves it filled and the trigger can never fire again: later imports re-stamp the same value, no snapshot is written, `dueDate` never advances, and the game client shows the task still due however often it is completed.

# Evidence

Found on 2026-08-12 while tracing why task completions were not reaching the game client. One row stood in this state: `019db533-f381-7548-8695-31e6f53f865d`, Thieves Guild Skill Line, with `completedAt` stamped `2026-08-12T14:25:10Z`, `lastCompletedAt` still `2026-07-24T14:01:25Z` and `dueDate` still `2026-07-25`. Its `updated_at` advanced on each watcher pass, which is the re-stamping. Thirteen other completions from the same morning became `temper-completed-task` rows normally at `16:19Z`, so the path works and this was one dropped event rather than a broken pipeline.

Nothing reads the wedged state. The watcher reports `tasks synced` on every pass, because the patch it made did succeed; whether the row it patched went anywhere is not something it looks at afterwards.

No command clears a stranded `completedAt`. `temper task update` carries no flag for it, and `temper task uncomplete` works by soft-deleting the latest completion snapshot, which on a wedged row is a snapshot from some earlier completion rather than the one that is missing. The repair used here was `ops page update` with `{"completedAt": null}`, which is the generic page writer rather than anything the task vocabulary offers.

What was not measured: why the event was dropped. `import-tasks.ts` names a race in its own comment — two imports of one task inside a single orchestrator tick, the second `from: is_empty` trigger failing and the snapshot being dropped — and that is consistent with what was seen, but nothing on the orchestrator side was read to confirm this row went that way. How often it happens was not measured either; one occurrence across one day is the whole population examined. Whether rows of other page types wedge the same way was not examined, only `temper-task` being queried.
