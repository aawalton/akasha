---
id: f0ae02a9-e7a6-57ed-b066-b0cbfec952a1
slug: sibling-order-unexpressible
page-type-slug: finding
title: "Sibling order unexpressible"
domain-slug: barred-meaning/project
---

# Claim

No edge expresses "this sibling must have committed first". A `dependsOn` edge asserts its target is terminal, and a child cannot reach `done` until after its parent's deploy — so the only available mechanism states something the tree can never satisfy, and a hard dependency between two children falls back to prose.

# Evidence

Two define passes asked for the same edge independently on 2026-08-01. The pass on #17444 asked for `#17444 dependsOn #17443`, both rows editing `get-status-bar-snapshot.ts:73` and `project-progress-fold.ts`; the pass on #17443 asked for that edge and `#17445 dependsOn #17443` besides, #17445 changing behaviour in three files #17443 renames wholesale, one of them including its filename. Neither pass could see the other. Both reached for the same mechanism and both gave the same reason: prose in two rows' notes is the weakest thing available.

`ops project sibling-dep-census` documents why the mechanism does not fit. A sibling edge asserts its target is TERMINAL; a child reaches `done` only after its parent's deploy, while siblings are dispatched during the tree's implementation; so no ordering of the tree's own work produces it, and a manager resolves it by hand from prose anyway. The census reports the class and refuses nothing, because both readings of such an edge are legitimate and no predicate separates them.

The lead declined both edges for that reason and carried the ordering to the manager instead. That is the right destination — `tasks/projects/build-parent-deploy.md` and `tasks/projects/build-parent-instructions.md` put ordering in the manager's stage 1, where a child is held back only when a sibling's result would invalidate its work. What is missing is any structure holding it: the manager learns the ordering from the parent row's notes, and a manager that skips the sentence dispatches a dependent child early with nothing refusing.

What the census can already distinguish is thinner than the gap: presence of an `unblockCondition` says the deploy reading was written down, and absence says commit OR a deploy nobody recorded. So even the existing edge cannot be read as a commit-ordering with confidence.
