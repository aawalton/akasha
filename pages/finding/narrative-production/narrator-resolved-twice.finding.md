---
id: 1923e5ff-fc4b-58f0-aff4-e85f8924069a
slug: narrator-resolved-twice
page-type-slug: finding
title: "Narrator resolved twice"
domain-slug: domain/narrative-production
---

# Claim

enqueue-narration.ts resolves a chapter's narrator at enqueue time to build the head-check/dedupe object key, while the render resolves the narrator independently at drain time from the parent story's pinned narrator, so a narrator change between enqueue and drain can leave the dedupe key and the rendered audio naming different voices.

# Evidence

Found by worker-15965 while implementing #15965 scope 1; named as its own row rather than folded in. Pre-existing, not introduced by that change.

The divergence: enqueue-narration.ts:116 resolves the chapter's narrator at enqueue time to build the head-check object key (deciding whether a rendition already exists). The render resolves the narrator independently at drain time, from the chapter's parent story's pinned narrator via narrator-resolve.ts:25-35 — two reads of the same row at two different times with a queue between them. If story.narrator changes after enqueue and before drain, the dedupe/head-check key names the old voice while the audio renders in the new one.

Consequences to establish, not yet traced: a rendition may be judged already-present under a key describing a different voice; a re-enqueue may be skipped because the stale key matches, serving the wrong-voiced rendition; or the two may write to different keys, leaving an orphan.

Why its own row: a genuine latent defect with its own failure mode; folding it into a project about a missing --verify flag would bury it. Only reachable when a story's pinned narrator changes (rare) — real but not urgent, presenting as "wrong voice" long after the causing change.

Shape of fix, not decided: resolve once and carry the narrator in the payload (self-describing job, removes a second read of mutable state) — filer's preference, citing #15904 as the same family (payload meaning depending on a schema that moved underneath it) — or resolve only at drain time and build the head-check key there too.

Prerequisite: interacts with the 50 currently-queued tts-narration rows, immutable payloads, which must be deleted-and-re-enqueued before drain-enable anyway (#15965 notes); sequencing together may be cheaper. Project #16101, status someday_maybe, live-on: deploy, domain narrative-production.
