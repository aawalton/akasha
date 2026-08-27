---
id: 01a01fd8-2de2-7001-97dd-b0b2e8e6b998
slug: declared-subscriber-carries-no-row
page-type-slug: finding
title: "Declared subscriber carries no row"
domain-slug: domain/global
---

# Claim

`main-pipeline-creator` stands in the declared subscriber roster and has a live manifest, yet holds no `event_subscribers` row. Every other gap in this table runs the other way, a row with no declaring source. Nothing reconciles the roster against the table in this direction, so a subscriber that never registered reads the same as one nobody meant to have.

# Evidence

Measured 2026-08-20 against the live database.

`packages/shared/worker-runtime/src/events-subscriber-roster.ts:14` lists `main-pipeline-creator` among the twelve `DECLARED_SUBSCRIBERS`, and its manifest stands at `packages/infra/ci/orchestrator/src/main-pipeline-creator/manifest.ts`. Selecting `subscriber_name` from `public.event_subscribers` returns 30 names and that is not one of them.

The reconciler cannot see this. `planEventSubscriptionReconciliation` at `packages/shared/worker-runtime/src/reconcile-event-subscriptions.ts:39` judges only rows that already exist, sorting them into declared, retained and undeclared. Its one reverse reading, `retainedWithoutRows` at `:67`, covers the retained set alone, which is three names, and `main-pipeline-creator` is declared rather than retained, so it falls outside both.

A row is created only by `registerEventsSubscriber` at `packages/shared/worker-runtime/src/register-events-subscriber.ts:33`, which a worker calls at its own boot. So an absent row means that worker has not booted since the row was last removed, and the roster is a statement of intent that nothing checks against the table.

The ordinary direction of this gap is well populated: 18 of the 30 rows are present in the table and absent from the roster.

Not measured: whether `main-pipeline-creator` boots at all today. The `workers/worker-supervisor` deployment stands at 0/0 replicas, so nothing in that family is registering.
