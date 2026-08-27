---
id: 07972701-1d67-57c5-bb97-e39ec66705d5
slug: schema-show-omits-public-messages
page-type-slug: finding
title: "Schema show omits public messages"
domain-slug: domain/database
---

# Claim

`ops schema show` has no entry for `public.messages`, the table the fleet's whole message layer reads and writes, so the one command that exists to stop agents guessing column names on universal tables cannot describe it and sends them to raw `psql` instead.

# Evidence

Measured 2026-08-07 by running the verb, while emptying `dirty/skills/agent-harness/findings/instruction-text-and-citations.md`, which recorded the same absence on 2026-07-27.

Both spellings are refused. `ops schema show messages` and `ops schema show public.messages` each answer: "unknown table: <name>. Supported SQL tables: pages, events, metrics, event_subscribers, db_query_stats." Page-row aliases follow, and `messages` is not among those either.

The table is first-class, not incidental. Four `ops agent` verbs are built on it and say so in their own descriptions: `emission-rate` measures "source=system content-emission RATE from public.messages"; `queue-staleness` measures "the STOCK of public.messages"; `queue-reachability` measures "live-pending public.messages rows"; and `delivery` opens by explaining why `messages.status` cannot answer the question it answers. The estate reads this table constantly and the inspector denies it exists.

This is the second refusal of its kind found in one pass. The sibling is at `pages/finding/database/schema-show-denies-the-table-it-routes-to.finding.md`, where the note printed for `db_query_stats` routes the reader to `public.db_query_fingerprints` and `schema show` denies that table too. Two real tables against a supported set of five, and both misses are tables the fleet's own tooling depends on.

What has changed since the 2026-07-27 entry, and does not save it: that entry rested part of its weight on the repo-root `CLAUDE.md` naming `schema show` as the way to avoid guessing column names. No such file exists now — it stands quarantined in the instructions repo as `dirty/code/claude.md` — so nothing routes agents to the verb unconditionally. The refusal is measured above and depends on no document.

Not established: whether the supported list is meant to be exhaustive over universal tables or is deliberately narrow, which decides whether the repair is adding `messages` or saying what the list covers.
