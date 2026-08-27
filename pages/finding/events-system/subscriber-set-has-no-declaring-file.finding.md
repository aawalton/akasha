---
id: 096a0576-8ec3-5bda-a661-d5b9e13f444b
page-type-slug: finding
title: "No file declares the subscriber set, so the set-difference has no mechanism at all"
domain-slug: domain/global
---

# Claim

"Which subscribers should exist is declared in a file, and their rows are projected from it" is not yet true and stays. No file names the set: each worker composes its entries in TypeScript and self-registers at boot, and the reconciler deletes only under the name it is registering. The within-subscriber projection exists; the set-difference has no mechanism. Two of the eleven subscriber names holding rows appear in no manifest in either repo, and only a hand-kept tombstone array can clear them.

# Evidence

Measured 2026-08-20T14:41-14:44Z. The counts are mine, RUN with psql; the code paths are a delegate's reading.

`public.event_subscriptions` held 18 rows at 14:41:38Z and 17 at 14:44:06Z — one `temper-completion.indexer` row, for page type `019e99a6-7091-78ca-a537-248c3b57ef76`, went between the two readings. Take 17 as a reading at one moment rather than a standing figure. Eleven distinct subscriber names hold them: page-versions-projector 3, temper-task.reactor 4, temper-completion.indexer 2, and eight names holding one apiece. `public.event_subscribers` holds 30 rows. The two orphans are `alanwalton-daily-tracking-hourly-confirm` and `instruction-reload-watcher`, neither of which appears anywhere in either repo's source.

No declaring file exists. There is no `events-subscriber` page type; `domains/events-subscriber.md` is a definition page with no `files:` key. The only page type whose glob matches on the word is `page-types/audhdalan-subscriber.md`, an unrelated mailing list. The instructions repo's only references to `event_subscriptions` are read-only monitoring at `tools/lib/devops-monitor/snapshot/db-slices-subscriber-lag.ts:117`, and `tools/commands/event/` is empty.

Each subscriber is declared in its own worker's TypeScript, for instance `code:packages/temper/player/time-management/reactor/src/manifest.ts:5,27-32`.

The projector is `registerEventsSubscriber` at `code:packages/shared/worker-runtime/src/register-events-subscriber.ts:18`, called only from `runWorkerDeployment` at `deployment.ts:29` over the list one running worker passes in. Its delete at `:62` is `DELETE FROM public.event_subscriptions WHERE subscriber_name = $1` on `entry.name`. A name that has left every manifest is never an `entry.name`, so that statement never reaches it.

The orphan defect is confirmed by the system's own workaround: `code:packages/infra/ci/orchestrator/src/dispatcher/reap-retired-subscribers.ts:4-12` is a hand-written array of seven retired names. Neither of the two current orphans is in it.
