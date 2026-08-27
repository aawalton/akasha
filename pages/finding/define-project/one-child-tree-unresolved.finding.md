---
id: 10e8a0b8-0a4c-5a6b-9110-897516fed9b2
page-type-slug: finding
title: "One child tree unresolved"
domain-slug: domain/global
---

# Claim

"one child for a parent is correct" reads two ways, and one of them licenses a tree that is strictly more expensive than not decomposing at all. The bullet's own economy argument tells against that reading without excluding it.

# Evidence

`domains/tasks/lead/define-project.md:28`: "**Decompose** as little as the work allows. Every child costs a whole agent lifecycle whether or not the split earned it, work that would fit as a checklist under one child is that checklist, one child for a parent is correct, and scope is the only reason to add another — never tidiness, separation of concerns, or parallelism."

The two readings:

- If you are dividing, do not invent a second child just to look decomposed. This fits the bullet's economy argument.
- A one-child tree is a correct cut.

A one-child tree is strictly more expensive than the undivided project covering the same work: `domains/tasks/lead/dispatch-project.md` puts a manager on the parent and a developer on the child, where an undivided row takes one developer and hands back to the lead directly.

The machinery permits it. `ops project move-to --help` gates `awaiting_manager_claim` on "the row has at least one child, AND at least one child is work a manager can START", and states that the count is checked before the predicate. One startable child passes.

Corpus evidence leans against without settling: `domains/tasks/projects/build-child-deploy.md` defines its subject as "building one child project's change alongside its siblings", which presupposes siblings.

Whether a one-child tree is ever the right cut is a judgment about how the estate is run, and no instrument answers it.

Raised by the `review-instructions` reading of `domains/tasks/lead/define-project.md` on 2026-08-06, which landed five commits and took the file from 3680 to 3445 bytes.

Context that reading recorded, not a fork: `ops project list --json` shows an open row #17937, "Reconcile the two carriers of live-on: the document key and the project property". Stage 2's **Declare** bullet describes exactly that arrangement, and every clause of it holds today — including "absent from the project reads as `deploy`", which is `project-ladders.ts:50`. That bullet is the one most likely to need rewriting when #17937 lands.
