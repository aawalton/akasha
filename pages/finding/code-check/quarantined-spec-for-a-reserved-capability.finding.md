---
id: 78596fdb-4efb-51e4-9daa-12292ed4aa93
page-type-slug: finding
title: "Quarantined spec for a reserved capability"
domain-slug: domain/global
---

# Claim

Three quarantined documents describe checks that #18157 deleted, so the ingest task's first filter now cuts all three on sight — and one of them holds the only written specification of a capability the estate has nothing else for.

# Evidence

#18157 removed `check-forbidden-reachability`, `check-node-degree-caps` and `check-bundle-budget` from the code repo on 2026-08-07, landing on `main` at `47a2a573e45a`. Their prescriptive docs had already been quarantined into the instructions repo and stand at `dirty/code/packages-infra-checks-docs-{forbidden-reachability,node-degree-caps,bundle-budget}.md` awaiting ingest.

The `review-check` reading that dispatched the removal put one reservation on record: `check-forbidden-reachability` was the only one of the three whose capability nothing else covers. Nothing else in the estate expresses "A must never reach B" for a package pair that is rank-legal and acyclic — `check-layer-monotonicity` gates rank and `check-acyclic-packages` gates cycles, and a forbidden pair violating neither passes both.

`dirty/code/packages-infra-checks-docs-forbidden-reachability.md` is what remains of that specification. Read by the ingest task it fails filter 1 on every pointer: its links to `../src/lib/graph-transitive.ts` and `../src/lib/workspace-deps.ts` resolve to nothing, and the check it documents exists at no path on `main`. A seat applying the filter as written cuts it with nothing kept. That is the right verdict for the other two and loses the reserved specification for this one.

One defect in that rule is worth carrying into any re-landing, and is recorded nowhere else: a rule whose `from` or `to` glob matched no workspace was silently skipped with no finding, so three typo rules printed `OK — 3 rule(s) ... zero findings` and exited 0. Both sibling checks guarded that case and it did not.

Not measured: whether the quarantined document is complete enough to re-land from, when the ingest queue will reach it, or whether some other estate surface expresses the same reachability constraint in a form a search on these three names would not find.
