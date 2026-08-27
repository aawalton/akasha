---
id: 4a9ec9ff-ba51-5652-9bfe-cac2ca48f0ba
slug: replace-write-reports-no-cardinality
page-type-slug: finding
title: "Replace write reports no cardinality"
domain-slug: domain/agent-fleet
---

# Claim

A verb making a whole-property replace reports an identity and a timestamp and nothing
about content, so a write that added one and a write that destroyed five print the
identical line. `ops project update --properties-file` and `ops page update` both take
a JSON map stored verbatim and both answer `<id>\tupdated\t<timestamp>`. Each holds
both cardinalities at the moment it writes and discards them.

# Evidence

Measured, not theorized, and the incident is recorded in a lead's ruling now being
emptied from quarantine — `dirty/skills/agent-harness/rulings/direction.md`. A manager
read a row's `obligations`, took a key one level shallower than the real shape, got
nothing, defaulted to empty, appended one and wrote. Five obligations were destroyed.
The verb replied with the row id and a timestamp. Recovery worked only because the
prior values had incidentally been written to a scratch file; composed inline, the
natural way, they were gone, with both shapes well-formed and no other carrier.

Still true 2026-08-07. `ops project update --help`: `--properties-file` takes "a JSON
map `{ propertySlug: value }` — slug keys, **stored verbatim**", and its default stdout
is `<seq>\tupdated\t<timestamp-ms>`. `ops page update --help` is the same shape,
`<id>\tupdated\t<updatedAt-ms>`. Neither reports a count. `obligations` is an ordinary
property slug, so this is the write path for it.

The remedy is available and is used elsewhere in the same surface: `ops persona
backfill-images` reports enumerated / orphans / published / failed / alreadyPublished /
stale. So this is a report withheld, not a report that would cost a new measurement —
the verb already holds both cardinalities.

This is a different animal from the misleading-zero family and should not be filed as
more of it. A misleading zero is recoverable by re-measuring; this is destructive at
the instant it is wrong.

`ops instructions governs` places the verbs under `domains/folders/agent-fleet.md`
(`code-path: packages/agents/**`). Searched `~/memory/findings/` with `rg -uuu -n -i
"cardinalit|count it replaced|replaced.{0,25}wrote|silent deletion|whole-property"`:
eight hits, every one about schema `cardinality:` declarations, none about a verb's
report.
