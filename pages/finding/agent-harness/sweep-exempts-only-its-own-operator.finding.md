---
id: c70a2821-e040-569b-9d1b-bfaa2c9071d4
slug: sweep-exempts-only-its-own-operator
page-type-slug: finding
title: "Sweep exempts only its own operator"
domain-slug: domain/agent-harness
---

# Claim

A corpus-wide property sweep re-arms the read gate for every seat holding a swept document, and the tool performing the sweep exempts exactly one seat from that cost: its own operator. The refusal each other seat meets names which documents changed and when, but not what changed inside them, and does not say that many documents sharing one timestamp are one act rather than many.

# Evidence

`tools/lib/hold-seat-verdict.ts:43` decides the re-arm on `!sameBody(reading, oid)`, where `oid` is `blobId(bytes)` at line 32 — a content hash, not the mtime this was first read against. Re-measured 2026-08-27: the mtime half of this reading is false today, and a document rewritten to identical bytes no longer re-arms the gate; every seat holding a document a sweep actually rewrites is re-armed all the same. The refusal is composed at lines 47-49, from `reading.seenAt`, `changedAt` and the line count.

`tools/rename-property.ts:248` resolves `agentId()`, and the two lines after it — `recordOwnRead` at 249 and 250 — record a read, on the sweeper's behalf, for every entry it is about to write. The seat running a sweep is the one seat the gate does not stop afterwards.

Cost observed on 2026-08-17, from the sweep renaming a domain's own name key to `slug` across the instructions repo at 13:32. A lead reported two seats: one on #19338, blocked until nineteen documents were re-read, and its delegate hitting the same wall separately. A third is observed directly: this seat, blocked across eleven documents whose mtimes fell four seconds apart.

None of those re-reads was spurious. The swept key is what a valid domain document declares, so a seat going on to write the old spelling would write a wrong document.

An eager announcement to live seats was weighed and set aside: a message wakes the seat it reaches, so announcing spends a turn on every live seat including those that would never compose again, while a refusal charges only a seat that goes on to write. The lead who raised the case withdrew it on that ground.

The two repositories are not spelling one property two ways; they are two properties, and neither lags. `pages/page-property-definition/domain-slug.page-property-definition.md` states `key: slug`, `type: slug` — a domain's own name. `pages/page-property-definition/finding-domain-slug.page-property-definition.md` states `key: domain-slug`, `type: relation-address` — the domain a finding concerns. `project-domain-slug`, `initiative-domain-slug` and `theme-domain-slug` share the second shape, so a memory document spelling `domain-slug:` is correct and no sweep is owed there.

Not measured: how often a sweep of this shape runs, so its standing cost is unknown.
