---
id: 10babf06-318d-5eee-ad8a-b21f8af794a1
slug: read-graph-outlives-its-instruction
page-type-slug: finding
title: "Read graph outlives its instruction"
domain-slug: barred-meaning/jargon
---

# Claim

"The read graph" now stands in exactly one place — a comment at `tools/tests/domain-edges.test.ts:7` — with nothing left for it to be the second spelling of, the refusal body it was quoting having been reworded to name `domain-parents:` instead.

# Evidence

Measured 2026-08-11, on a `review-instructions` reading of `refusals/domain-owner-not-a-parent.md` dispatched from `review-documents`. That reading replaced the phrase in the refusal body at `c9179ac32` and left the test comment, not having established whether Plain Or Declared binds a TypeScript comment as it binds an instruction.

A grep for the phrase across the repository now returns one line: `tools/tests/domain-edges.test.ts:7`, "descending an edge the read graph does not carry". It stood twice before — there and in the body it quotes.

No domain declares the term. `domains/global.md`, Plain Or Declared: "Write the plain phrase; where you give a word a sense of its own, declare it as a domain first." `domains/global.md` also carries Ubiquitous Naming, and the thing already has a name the four sibling refusals all use plainly: `domain-parents:`.

`domains/jargon.md` bears on the fork the reading declined to take and was not cited by it. Its Design reads: "A word the code spells is jargon on the same test as any other, and what that spelling changes is the price of the work rather than the verdict." Its Definition is "a word no domain defines that a plainer word could replace", which the phrase meets on both halves.

The repair is one exact-string replacement.

Not measured: whether any other coined phrase in this repository's TypeScript comments has lost the instruction it mirrored, or whether the test's own header depends on the phrase for anything.
