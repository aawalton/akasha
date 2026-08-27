---
id: b34713a1-0555-523a-bb97-81dc7199dfe5
page-type-slug: finding
title: "A workflow page cannot be created"
domain-slug: domain/pages-system
---

# Claim

No `workflow` page can be written at all. Stating a `name` is refused because `name` is computed, and omitting it is refused because the type is named for a pattern containing `name`. The two refusals point in opposite directions, so there is no accepted form of the write.

# Evidence

Measured by attempting the write both ways against the live service:

- Stating `name` — refused: "`name` is computed on `page`, so the engine supplies it and no file states it."
- Omitting `name` — refused: "`workflow` is named `{pipeline-seq}-{name}`, and this write carries no `name:`."

`properties/page-name.md` declares `name` with `computed: true`, and `page-types/workflow.md` states `named-for: "{pipeline-seq}-{name}"`. Each is coherent alone. Together they leave the type unwritable.

Passing a `slug` is the only way through, and a page created that way reads `name` back as `undefined`, so a reader cannot recover the name it was supposed to be named for.

This is not confined to `workflow`. The same shape stands on `merge-queue-batch`, which is likewise unable to take an automatic name. What the two share is a `named-for` pattern quoting a key that something else supplies, so the type inherits a requirement its own declaration cannot satisfy.

Nothing depends on this tonight: every CI page type stands at zero pages during the transition, and the readers being repointed address pages by declared keys whether or not a page can currently be written. It becomes blocking the moment the code harness is brought back up, because the first act of a pipeline run is to mint workflow pages.

Found by the seat re-keying the CI readers, which tried to create a real page as a fixture rather than reasoning about whether one could exist.
