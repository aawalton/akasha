---
id: f5258a2b-e7d3-59f6-81bd-1c4840af902e
slug: coined-binds-a-word-not-a-sense
page-type-slug: finding
title: "Coined binds a word not a sense"
domain-slug: domain/global
---

# Claim

`coined: true` binds a word, not a sense. Where the word carries a second sense, the gate refuses correct prose and sends the writer to a document that does not govern what they wrote. `page-types/retired-domain.md:21` already states the invariant this breaks — a retired domain retires one sense of a word, and the word stands wherever it carries another. The gate cannot see a sense: `tools/lib/vocabulary.ts` matches the term and consults `coined` only to decide whether to refuse.

# Evidence

Three cases inside one day of the property landing, 2026-08-15.

`Claim` is retired for "a schema or a document taking a path". `page-types/finding.md` requires a `# Claim` heading, so every finding written from now is refused on its own mandatory section heading unless its author has read `domains/retired/claim.md`. This one was.

`walk` is retired for "reading a document line by line". A delegate writing `pages/finding/code-check/worker-placement-silent-skip-returns.finding.md` was refused on the check's own term for its traversal, `handler walk` and `package walk`. He kept the wording and reasoned past the gate, correctly.

`presence` was coined live by the audit at `7bb5f6ef9`, meaning when Alan was at his machine, while `domains/seat.md:20` uses the bare word for whether an agent is in a seat. The flag came off at `c91ab4c2`; the clash is filed under `findings/presence/`.

The three differ in kind, which is what makes it a pattern rather than an incident: one retired sense over a mandatory heading, one retired sense over a code term, two live domains over one word. All three produce the same refusal, and none is distinguishable by anything the gate sees.

The audit that set the 54 flags weighed each term alone and cross-checked none of them against the corpus, so the collision population is unmeasured. All three above were found by being hit rather than by looking.

Not measured: whether any refusal has been silently accepted. A writer paraphrasing to satisfy the gate leaves no trace, and that is the outcome this claim most needs and least has.
