---
id: 1b63d26d-5b09-56ce-be23-ce5bb49db1c7
slug: one-generated-shape-under-seven-namespaces
page-type-slug: finding
title: "One generated shape under seven namespaces"
domain-slug: domain/ops-cli
---

# Claim

Forty-five verbs across seven `ops` namespaces run on one shared CRUD machinery in two documented adoption modes, and no instructions document says so, so each namespace reads as hand-written verbs and is reviewed as if it were.

# Evidence

Measured 2026-08-15, running `review-command`. Four delegates on unrelated namespaces each reported a piece of this, on `page`, `migration`, `temper task` and `exercise`.

The machinery is `shared/pages/cli/src/entity-surface/`, whose verb cores are `create`, `delete`, `list`, `show`, `undelete`, `update` and `upsert`. Its own docblock names two adoption modes: a generic entity uses the generated verbs directly, and a namespace with bespoke flag ergonomics keeps thin wrapper verbs that own their flags and delegate their body to the same cores.

Both modes are in use, which is why a reader meeting one namespace cannot tell it is a member. `exercise` is the second mode throughout, so its verbs read as hand-written while running the shared cores.

Seven surface configs stand, one each under `projects`, `daily-tracking-cli`, `exercises`, `food`, `migrations`, `temper task` and `temper completion-override`.

Counted by verbs reaching the machinery: 12 under `project`, 11 under `exercise`, 7 under `temper task`, 7 under `migration`, 5 under `temper completion-override`, 2 under `tracking`, 1 under `food`.

A config can carry almost nothing. `exercise`'s populates a slug and an inert column list; everything that runs is the verb's.

`ops page` is the untyped twin of the same seven verbs and is not a member. It reaches the tables through instructions-repo libraries where the members reach code-repo modules, so one CLI touches the same tables two ways.

`temper task complete`, `uncomplete` and `reschedule` call the identical function on the identical argument as their `ops page` namesakes, take a raw page id and pin to no type. `shared/pages/access/src/lifecycle.ts` calls them aliases.

`entity-surface/verbs/create.ts` tells callers it assigns the next global sequence number. It is per page type: `page-type-sequence.ts` allocates from `pages_seq_<slug>`, one sequence each.

Not measured: whether `project` and `food` are the first mode or the second.
