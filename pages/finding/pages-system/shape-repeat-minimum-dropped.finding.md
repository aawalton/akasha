---
id: 1ca7d0b9-d8d7-5884-93e7-4e20744f8e99
page-type-slug: finding
title: "A shape repeat minimum is read and dropped"
domain-slug: domain/pages-system
---

# Claim

A body shape cannot require a minimum number of repeats, so a shape stating an exact count enforces only its ceiling. `boundOf` in `tools/lib/page-shape-level.ts` reads `repeat: 3` into `{ required: min > 0, max: 3 }`, and `required` is a boolean rather than a count, so `repeat: 3` and `repeat: 1-3` gate identically. Every shape naming an exact repeat reads to its writer as enforced and admits anything from one upward.

# Evidence

`page-body-shapes/domain.md` was tightened at commit `4ebb8d21e` from `repeat: 1-3` to `repeat: 3` on `blocks.principle` and `blocks.rule`, to hold a directive at exactly its warrant and two aids.

A dry-run edit deleting one aid from `Daemon Composition` on `domains/daemon.md`, leaving the act, the warrant and one aid, returned `[page-holds-shape] pass  16 part(s) against the shape `domain` states`.

The cap in the same commit does bite: a 155-character paragraph in the same slot returned `[page-holds-shape] fail  1 part(s) outside the shape `domain` states`.

`tools/lib/page-shape-level.ts` line 38: `return { cardinality: { required: min > 0, max } , why: null }` — the minimum is read and then dropped.
