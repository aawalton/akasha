---
id: d2f5a50d-e8bc-573c-bddd-eaee1d89e564
slug: parent-relation-spelled-seven-ways
page-type-slug: finding
title: "Parent relation spelled seven ways"
domain-slug: barred-meaning/project
---

# Claim

One project relation carries seven live spellings, and `parentId` is one name with two types: you write a seq or a uuid under it and read back a `{seq,title}` object, so round-tripping what you read hands a display object to a writer that wants a scalar. Two of the spellings differ in what they can do — the typed `--parent-seq` flag sets a parent and cannot clear one, where the `parent_seq` properties key can.

# Evidence

Measured 2026-08-07 against `~/code` at `ecf5f9518f`, by reading each verb's own `--help` and one live row, while ingesting a quarantined findings cluster that recorded a six-spelling version of this.

Live spellings of the one parent relation:

1. `ops project create --parent-seq <n>` — typed flag.
2. `ops project update --parent-seq <n>` — typed flag. Its own help: "the typed flag sets a parent rather than clearing one."
3. `update` properties key `parent_seq` — resolved seq→uuid. "Set `parent_seq` to null to clear the parent."
4. `update` properties key `parentId` — accepts seq or uuid or null, via `scalarIdOrSeqProps` (`project/surface-config.ts:62`).
5. Read `parentId` — a resolved display object.
6. Read `parentKey` — the uuid.
7. Internal `parentSeq`, in `recipient-derivation.ts`, `decide-blocked-principal.ts`, `db-project-custodian.ts` and `projects/cli/src/lib/project-pages.ts`.

The read/write type collision, measured on a live row rather than reasoned about: `bun ops project show 18152 --json` returns `"parentId":{"seq":18146,…}` beside `"parentKey":"019fdd06-de29-76eb-9578-e8fc796b4e66"`. The write path under the same name takes a scalar. An agent that reads `parentId` and writes it back — the obvious thing to do with a field of that name — passes an object to a resolver expecting a seq or uuid, and nothing in either surface says so.

The 2 vs 3 split is the sharper one for a caller, because both are spelled `parent_seq` to the eye. The typed flag and the properties key are not interchangeable: one sets and the other both sets and clears, and the help states this only in the prose of a different paragraph.

One thing has improved and is worth recording so it is not re-found: `parent_seq` used to match no flag on any verb in the namespace. `update --parent-seq` now exists, so the spelling the help teaches is reachable — at the cost that the two spellings now differ in capability rather than in name alone.
