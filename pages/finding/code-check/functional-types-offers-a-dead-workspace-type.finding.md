---
id: 8aa67478-62ff-5d44-8024-0ed99212c6fd
slug: functional-types-offers-a-dead-workspace-type
page-type-slug: finding
title: "Functional types offers a dead workspace type"
domain-slug: domain/global
---

# Claim

`FUNCTIONAL_TYPES` still offers `next-app`, a workspace type nothing in the repo can validly be. #18508 removed the dead `next-app` row from the classifier it was reviewing but left the vocabulary constant standing, because `check-layer-monotonicity` and `check-tsconfig` both read it and `ops package add` offers it in a second package. The measured cost is that the invalid-value refusal prints the vocabulary, so it offers `next-app` to an author, who then gets a mismatch on the next run.

# Evidence

Handed up by #18508's seat while it worked on `check-workspace-purity`, as a loose end it deliberately declined to take. Treat it as evidence rather than fact: the seat measured the refusal text, and the claim about the two other readers is its reading of the imports rather than mine.

Why it was left rather than fixed, and the reason is sound: emptying the constant lands a behaviour change inside `check-tsconfig`, which is unreviewed and still on the `dalla/code-check` burn-down. A repair made inside a check nobody has read is a change whose blast radius nobody has measured — the same shape `review-check` exists to stop.

So this is blocked behind a review rather than open work. Whoever reviews `check-tsconfig` should meet it there: the question is whether `FUNCTIONAL_TYPES` can lose `next-app` without changing what that check refuses, and the answer is in the two readers plus `ops package add`.

What makes it worth filing rather than dropping: the harm is not a false verdict, it is an author being offered a value by a refusal message and then failing on it. Nothing measures that, and the classifier it came from is now green either way — #18508's tree exits 0 over 389 of 389 workspaces before and after its change, so no instrument will bring this back up.
