---
id: 3c14e16c-d3f4-5227-9f97-c21bd583937d
slug: reference-plain-sense-collides
page-type-slug: finding
title: "Reference plain sense collides"
domain-slug: barred-meaning/jargon
---

# Claim

The declared term `reference` has a plain verb sense competing with it, and the instrument cannot part the two. `checks/terms-in-reach.ts` flags `domains/repetition.md` for using Reference out of its readers' reach, but line 23 is the ordinary imperative heading "Reference a design-system token; never write the value it resolves to." The flag fires on a sentence-initial capital. `domains/jargon.md` says a word whose plain sense competes with the declared one is written plainly instead.

# Evidence

Surfaced by a review-instructions seat on `domains/alignment.md` from its `ops instructions run-checks` run, as an observation beside its own subject.

I verified the flagged line firsthand: `domains/repetition.md:23` reads "**Reference a design-system token; never write the value it resolves to.**" — the imperative verb, capitalized because it opens the sentence, not the declared term. `reference` is declared in the glossary of `domains/instructions-harness.md`.

Not measured: how many other advisories from this check are the same false positive, whether the check has any way to tell a sentence-initial capital from a term use, and whether the advisory has ever caused anyone to change a document wrongly. `run-checks` exits 0 with this advisory standing, so nothing is blocked by it.
