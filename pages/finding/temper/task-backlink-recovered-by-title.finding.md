---
id: 87709b6e-4866-5fff-9b8c-7520f444386f
slug: task-backlink-recovered-by-title
page-type-slug: finding
title: "A backlink recovered by title states a name match, and every such completion predates the page it links to"
domain-slug: domain/temper
---

# Claim

A `task` backlink recovered by title states that a completion records the same recurring task by name, not that the task's page emitted it. Every one of the 262 recoverable completions falls between 2026-03-05 and 2026-04-02, and every task page it names was created on 2026-04-04, so the completion predates the page it links to.

# Evidence

Run on 2026-08-20 against the working tree and the database, not read.

The database holds all 1,414 `temper-completed-task` rows and 72 `temper-task` rows. `attributes.taskPageId` is the authoritative backlink, and the 24 live task rows carry the ids that the files under `temper/tasks/` state. That chain reproduces the stated `task` on all 889 completions that carry one, with no disagreement and nothing unanswered.

It recovers none of the 516. On 368 of them `taskPageId` is present and null, so the link never existed at source; on 148 it names a task since deleted. `page_versions` holds no row for this page type and no event names one, so the database carries no further evidence.

Title carries the recovery. Applied to the same 889 it reproduces all 889 stated answers, and the 24 live tasks hold no colliding title, exact or with an em-dash normalised away. 227 of the 516 match a live task title exactly and 35 after normalising, 262 in all.

Recurrence and scope corroborate a match and cannot reject one: on the 889 known-correct rows `rrule-rule` differs on 45 and `scope` on 96. That is a completed task keeping the task's wording as it stood at completion, so later edits to the task do not rewrite history.

254 stay absent. 189 name a task that is deleted and holds no file, and the `task` property is a relation onto a task slug, so a value for them would resolve to nothing. 35 are test fixtures. 29 name a task no row holds, live or deleted. One states no title at all.
