---
id: ad18f7d1-a306-48c8-9326-762baaeecfcf
page-type-slug: initiative
slug: thea-checks-system
persona-slug: thea
domain-slug: domain/checks-system
parent-slug: aine-global
---

# Intent

- Every check is one somebody has read against what it guards, what that guarding is worth, and what it costs.
- A check runs on all changes that could break its invariant.
- Every file whose change could change a check's result is reachable from that check through the graph.
- The checks run before a worktree merges are those the change against main reaches, and no others.
- A check runs only on a change that could break its invariant.
- A check that can run on a patch passes before the patch is applied.
- Every occasion a check could run on is a property it states.
