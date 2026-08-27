---
id: bfc27d4e-be60-5e7a-a2af-a461271de7c0
slug: code-binds-from-quarantined-surfaces
page-type-slug: finding
title: "Code binds from quarantined surfaces"
domain-slug: domain/agent-harness
---

# Claim

Two decisions in the instructions repo's own tools cite rulings under `dirty/`, which the corpus loader quarantines, so the surface a reader is sent to for the reasoning is one no reader can reach.

# Evidence

`tools/lib/compose-seat-name.ts:43-66` sources name-distinctness-as-the-exclusion to `dirty/rulings/identity/name-distinctness-is-the-exclusion.md`. `tools/lib/seat-resolve.ts:53-75` sources domain-is-a-supertype to `dirty/rulings/identity/domain-has-subtypes.md`. `tools/lib/roots.ts:74-76` excludes `dirty/` from the corpus.

The second claim survives in prose at `domains/domain.md`, in its Design section, but not at the cited address.
