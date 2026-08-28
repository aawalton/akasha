---
id: 01a045b3-918b-75c0-83df-b0be9c676840
page-type-slug: finding
title: "The seat composer writes no slug"
slug: seat-composer-writes-no-slug
domain-slug: domain/agent-definitions
---

# Claim

The seat composer builds a seat page's frontmatter line by line and never emits a `slug:` line, so every rewrite of a seat page drops the slug rather than preserving it. This is a writer creating the fault continuously, not a backfill leftover: a slug written by hand is gone again the next time the composer runs.

# Evidence

`tools/lib/seat-page.ts:72-91` assembles the block as a list of strings — `page-type-slug`, `title`, `persona-slug`, `domain-slug`, `role-slug`, then optional `person-slug`, `task-slug` and `initiative-slug`. No branch of it appends `slug`.

Nine of the ten pages under `agent/seat/` carry no `slug` as of commit 098d0feb9. Only `ki.seat.md` has one, and nothing in the composer would have written it.

The consequence for naming: `seat` declares no name rule, so it falls to the default `{slug} ?? {id}`, and with no slug every seat resolves to its uuid. Eight seat pages diverge from their file names for this reason alone. Declaring a rule for `seat` would hide the fault rather than fix it, so `seat` is deliberately left undeclared until the composer writes the key.
