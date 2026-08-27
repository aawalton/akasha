---
id: 298c5703-8f73-57f4-b42f-22a017c1333d
page-type-slug: finding
title: "Commit track carve out rests on an unenforced premise"
domain-slug: barred-meaning/project
---

# Claim

The `live-on: commit` carve-out on the lead-verification CI gate is premised on a condition nothing enforces. The gate skips the CI-verdict demand entirely for a commit-track row, on the stated ground that such a row's commits are not in the code repository. Nothing checks that. A commit-track row whose work IS a code-repo feature branch reaches the merge queue having never been asked for a verdict, and the skip is silent.

# Evidence

`enforce-handoff-gate.ts` calls `runsBranchCi(input.liveOn)` and, where it is false, renders the verdict from a decider handed `hasGreenFullBranchVerdict: false` and `branchGroundTruth: null` — it never looks. Its own comment states the premise: "Both lookups below search the code repository, and a `commit` row's commits are not there — so on such a row a git call and two pipeline queries would be spent to learn nothing."

That premise is a convention rather than an invariant. `live-on` is declared by hand in the project document's frontmatter, at cardinality `once`, and `readProjectLiveOn` reads it with no reference to where the row's commits actually are.

#19104 is the case. Defined `live-on: commit`, its six children committed 242615 comment deletions across roughly 13000 files onto `project-19104` in the CODE repository. It passed `awaiting_lead_verification` and was asked for nothing. `ops pipeline list --branch project-19104` returns empty: no pipeline has ever existed for that branch.

The same comment names what would otherwise have happened: "It is still the DECIDER that renders the verdict, and it is handed the row's REAL recorded SHA: were the carve-out ever removed from it, this path would refuse such a row rather than pass it." So the exemption is the only reason it passed, and the row carries a real recorded SHA that would have failed the demand.

What is NOT true, and is worth stating because it is the natural fear: the flag does not open a route to `main`. `live-on` is read at this one gate and nowhere in the landing path — the deploy verb and the merge queue never consult it, and the queue's staging CI still tests the merged result. What the flag removes is the QUESTION, not the guard.

Worth deciding: whether the carve-out should be conditioned on the absence of a code-repo branch for the row, which is the thing it actually means, rather than on a hand-declared key that a definer can get wrong without ever being told.
