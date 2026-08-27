---
id: 7210a906-92b2-5506-b56b-2d70009f5b43
slug: retired-gloss-names-one-replacement
page-type-slug: finding
title: "Retired gloss names one replacement"
domain-slug: barred-meaning/jargon
---

# Claim

A retired-word entry names one replacement, but `red` was written three different ways in the single commit that swept it — `fails`, `failure` and `refusal` — which is what a one-replacement gloss looks like when the word carries more senses than the gloss counted.

# Evidence

`domains/retired/red.md` glosses the word as "a failing check, or a main branch failing; now written as failure." One replacement is named.

Commit `67b6f026` swept `domains/tasks/code-harness/review-check.md` on 2026-08-06 and removed all seven uses of `red` from it. It did not write `failure` seven times. It wrote three different words, one per sense:

- **`fails`**, for a check acting on a defect. "the only thing that reds on the defect" became "the only thing that fails on the defect", and "one that reds main" became "one that fails on main".
- **`failure`**, for the event as a countable thing. "Where every red in the window you read is its own refusal" became "Where every failure in the window", and "removal takes the red away with the check" became "removal takes that failure away".
- **`refusal`**, for what a check prints. "a red naming no act has deferred the defect" became "a refusal naming no act has deferred the defect" — in a sentence that already opens "Read what it prints when it refuses", so the replacement now repeats a word standing eight words earlier.

The gloss reached the second of those three and not the other two. An editor holding only the entry would have written `failure` in all seven places; the three-way split is the editor's own sense inventory, made silently and recorded nowhere.

One substitution also moved a claim rather than a word. "which is worse than a red because a red is loud" became "which is worse than a failure because a failure is loud". The original asserts that the CI signal is loud, which is a property of the harness. The replacement asserts that failures in general are loud, which the same sentence denies of the third kind it is describing — one that "fails nothing and costs continuously".

Measured by reading the commit against the file as it now stands, both at `1108ecc0` and after.
