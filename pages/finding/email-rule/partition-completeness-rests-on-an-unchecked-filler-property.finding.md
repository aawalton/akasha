---
id: e9327def-cb0b-58de-813a-85de5785f1be
slug: partition-completeness-rests-on-an-unchecked-filler-property
page-type-slug: finding
title: "Partition completeness rests on an unchecked filler property"
domain-slug: rules-engine-rule-set/email-rule
---

# Claim

The completeness of `tools/lib/email-partition.ts` rests on two legs, and the one that is not written down does not hold for the `from` and `to` fields.

# Evidence

The checker decides disjointness and coverage over each field's realisable signatures, a signature being which literals a value satisfies. It does not decide realisability. It searches for a witness, composing the chosen literals into one string — longest prefix, the chosen contained values, longest suffix — joined by a filler, and records what that string is measured to satisfy.

The search is complete only if two things hold. First, nothing the witness satisfies is accidental: every literal it satisfies must be one that any string realising the signature satisfies too, as `ends with amazon.com` forces `contains com` in any string at all. Second, ordering: implication is a partial order, so a signature's literals can be added shortest-implied-first, every intermediate set staying closed under implication, and the walk tries every order. The second is stated in the code and is correct.

The first is not established. `fillerFor` checks only that no literal holds of the filler standing alone. It never checks that no literal can span the seam between a value and the filler, which is what completeness needs. A literal cannot cross a seam if the filler carries a character appearing in no literal anywhere.

Measured over the corpus as it stood: 153 literal values across 40 distinct characters. The subject and list filler ` ~ ` carries `~`, absent from every literal, so those fields are straddle-proof. The from and to filler `someone@unnamed.` has no character absent from the literals, so the field carrying most of them is where the guarantee is missing. `~`, `^` and `q` were each absent then.

Soundness is unaffected, only signatures a real string achieved being recorded. Completeness is not: a subset whose every composition trips an extra literal is pruned as a dead end, so a realisable cell can go unbuilt, and a missing cell can only hide an overlap or a gap. The failure mode is a false pass.
