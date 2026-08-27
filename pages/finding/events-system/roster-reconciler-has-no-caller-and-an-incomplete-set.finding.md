---
id: 7b8cd11e-d56b-56b2-b17c-03dd39f384bc
slug: roster-reconciler-has-no-caller-and-an-incomplete-set
page-type-slug: finding
title: "The subscriber roster has a reconciler with no caller and a set that would delete live CI rows"
domain-slug: domain/global
---

# Claim

The set-difference that `events-system` Intent asks for now exists in code, and two
things stop it being the mechanism. It has no non-test caller — it runs only when a
person invokes a file path by hand. And the roster it reads names 13 subscribers while
the code repo declares at least 20 plus two dynamic families, so applying it once CI is
running deletes six live CI subscribers' rows as undeclared.

# Evidence

Code paths read 2026-08-20 by a delegate; the row counts are mine, run with psql.

`domains/events-system.md:24` states the Intent: "Which subscribers should exist is
declared in a file, and their rows are projected from it."

`reconcile-event-subscriptions.ts:33-69` judges each row `retained`, `declared` or
`undeclared` and `:96-124` deletes the undeclared — a genuine set-difference, unlike
`registerEventsSubscriber`, whose delete at `register-events-subscriber.ts:62-64` is
scoped to `entry.name` and so can never reach a name that left every manifest. But the
reconciler's only importers are `reconcile-event-subscriptions.report.ts:2` and its
unit test. That report has no `bin`, no package script, no export in `index.ts`, and
runs only under `import.meta.main`. `reapRetiredSubscribers` likewise has no source
caller, while `supervisor-watch-set.ts:119` still tells people to maintain its list.

`events-subscriber-roster.ts` holds 12 declared names and 3 retained. Absent from it,
each with a real manifest: `merge-queue-coordinator.{batch-pipeline-terminals,
main-deploy-terminals,queue-entries}.singleton`, `pipeline-orchestrator.{branch-event-
reaper,branch-event-spawner,branch-dispatching-resolver}`, plus the generated families
`pipeline-worker.own-pipeline.<seq>` and `pipeline-worker.branch-events.<seq>`, which
no static list can hold.

I verified all seven static names hold zero subscription and zero subscriber rows
today, and no `pipeline-worker.%` row exists, so the hazard is latent rather than
live: CI is down, and it arms when CI returns.
