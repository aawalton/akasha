---
id: 412391f2-5fdf-58c8-bd60-38ec44899948
slug: no-standing-name-holds-the-shape
page-type-slug: finding
title: "No standing name holds the shape"
domain-slug: domain/global
---

# Claim

Eighteen event names stand and none of them holds the shape `domains/event.md` now states. Retiring them is a rename across the emitters and a backfill or a cutover on 2,025,944 rows, and nothing holds that work.

# Evidence

From `public.events` on 2026-08-15, as `category | name | rows`:

    agent             | agent.exit                       | 578
    agent             | agent.liveness                   | 12397
    agent             | agent.mailbox.reachability       | 3297
    agent             | agent.reaper.kill                | 3
    agent             | agent.record                     | 478
    agent             | agent.resumed                    | 2212
    audhdalan         | audhdalan.page.loaded            | 6
    audhdalan         | audhdalan.resource.clicked       | 2
    cli               | main_pipeline.requested          | 181
    merge-queue       | merge-queue.batch.terminal       | 149
    merge-queue       | merge-queue.entry.enqueued       | 194
    page              | created                          | 76682
    page              | deleted                          | 1806
    page              | page.relation.mirror_pending     | 1256
    page              | pipeline.branch.dispatching      | 663
    page              | pipeline.branch.terminal         | 825
    page              | updated                          | 1926786
    temper-completion | temper-completion.index.updated  | 276

Several carry more than one drift. No domain at all: `created`, `deleted`, `updated`. A domain disagreeing with the column: `main_pipeline.requested` under `cli`, `pipeline.branch.*` under `page`. A last part that is no happening: `liveness`, `reachability` and `record` are nouns, `terminal` and `mirror_pending` adjectives, each recording a reading. And `main_pipeline` and `mirror_pending` are snake where `merge-queue` is kebab.

Alan ruled `cli` becomes `ops-cli` and `temper-completion` becomes `temper`; both stand.

The cost is the readers rather than the names. Every cursor, handler match and manifest entry keys on the name it was written against, so a rename landing before its readers stops matching in silence, and a subscriber matching nothing looks identical to one with nothing to do.
