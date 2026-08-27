---
id: ac5ef5d3-e590-5c4a-9ad5-56a57a9acd2a
slug: relation-write-drops-unresolvable-seqs
page-type-slug: finding
title: "Relation write drops unresolvable seqs"
domain-slug: barred-meaning/project
---

# Claim

`resolveUpdateProperties` silently discards a `dependsOn` or `blocks` seq that resolves to no row. Its array branch maps each element through `findIdBySeq` and then filters `id != null`, so an edge the caller named is dropped and the write still returns success. Both scalar branches of the same function fail loud on the identical miss, by a design its own docblock records. Nothing warns and the verb exits 0, so a DAG can lose an edge that was asked for.

# Evidence

Read 2026-08-08 against `~/code` on `main`, while ingesting `dirty/code/packages-alanwalton-projects-core-docs-project-dependency-graph.md`, whose `## Editing Edges` states the behaviour. Read rather than executed: the only live target is a real project row.

`packages/shared/pages/cli/src/lib/page-relation-resolvers.ts`, in `resolveUpdateProperties`, handles `config.seqArrayProps` — where `dependsOn` and `blocks` sit — as:

    const resolved = await Promise.all(value.map(async (val) => {
      if (typeof val === "string") return val
      return findIdBySeq(sb, arrayConfig.lookupSlug, val)
    }))
    propsArray.push({ propertyId: key, value: resolved.filter((id): id is string => id != null) })

`findIdBySeq` returns `null` on a miss and the filter removes it. No `error` is set on the returned `{ propsArray, error? }`, so the caller sees an ordinary success.

The asymmetry is inside one function. The `scalarSeqKeys` branch returns `{ propsArray: [], error: "<key>: no <lookupSlug> found for seq <value>" }`, and the `scalarIdOrSeqProps` branch returns the same shape. Its docblock states both as deliberate — "An unresolvable seq, or a value that is neither, fails LOUD" for the first, and for the third "An unresolvable seq fails LOUD (error result) rather than dropping silently — a mis-typed parent must never be stored as a raw number (#13937)". The array branch carries no such sentence and none of the behaviour.

Nothing announces it downstream: `ops project update --help` says `dependsOn`/`blocks` "accept either page ID strings or seq numbers" and says nothing about a miss; the only loudness it advertises is on `--parent-seq`, "a seq matching no project fails loud rather than being dropped".

`pages/finding/project/relation-write-drops-omitted-edges.finding.md` stands and I opened it: it claims that a wholesale write REPLACES the array, so an edge left out of the list is lost. This is the other direction — an edge that WAS listed, lost because its seq resolved to nothing.
