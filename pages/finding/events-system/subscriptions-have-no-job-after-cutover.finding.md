---
id: b99736ab-85c2-5afb-a26e-1dfcd4cbbfdf
slug: subscriptions-have-no-job-after-cutover
page-type-slug: finding
title: "All 40 page-type-keyed subscription rows have no job left, and two carry work Alan feels directly"
domain-slug: domain/global
---

# Claim

Every one of the 40 `event_subscriptions` rows keyed on a `page_type_id` has no job left. A
file raises no page event, so each subscriber ticks and processes nothing. Two carry work
Alan feels directly: `apns-push-notifier.notification-created` sends his push notifications,
and `alanwalton-daily-tracking` is his daily rollup. Deleting the rows restores none of it;
what the page event used to supply has no replacement.

# Evidence

Measured by a delegate against the live cluster with `kubectl` and `psql`, not read.

`kubectl logs -n workers deploy/worker-supervisor` shows all 30 subscribers reporting
`processed=0 skipped=0` on every tick.

The count of subscriptions pointing at an already-retired page type rose 0 -> 4 -> 9 inside
a single delegate session, so retirement adds to it rather than the set being fixed.

The chain is dead end to end in at least one cluster rather than merely quiet. The temper
reactor's one non-page subscription, `event_category: temper-completion`, is fed by the
completion indexer, which is itself page-triggered. Repointing the reactor's writes would
build on a trigger that can never fire.

The shape of the replacement is visible from the one case already solved. Completing a
temper task used to work by a page event: `import-tasks.ts` patched `temper-task.completedAt`,
automation `019dcaa3-e522` saw the row change, and created the completed-task, rolled the
recurrence and deleted a one-off. The repair was to put that work inside `import-tasks.ts`
directly -- the writer calls what used to be triggered. The same move fits the completion
indexer, whose natural caller is `import-completion.ts`.

One trap is worth recording against a generic solution. Making the automation orchestrator
file-aware is unsafe: the slug `task` is file-backed at `instructions:domains/tasks/**/*.md`
and is a different concept wearing the same name, so a generic seam would send automation
`019e887a-b9d6` ("Task: roll overdue due-dates") to rewrite instruction documents.

Four subscriptions are separately recorded as the specification for the hourly
time-tracking prompt Alan intends to redesign himself, and are deliberately left standing.

Alan has ruled that events are addressed separately from the file-backed pages migration,
and that this stands as a finding rather than as work dispatched under it.
