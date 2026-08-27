---
id: 197e6d31-e6bd-514b-a06c-daa3cdd751dc
slug: relation-read-unbound
page-type-slug: finding
title: "Relation read unbound"
domain-slug: domain/pages-system
---

# Claim

Nothing in the corpus binds relation-scoped reads of the pages system, though the case has a recorded incident, a measured cost and a dedicated remedy. A relation predicate issued through `getPages` is the statement-timeout pathology of #13507, and `getPagesByRelation` over the `pages_by_relation` definer RPC is what the code documents as its answer. `domains/folders/pages-system.md` carries three rules and none of them is this one.

# Evidence

Raised by `claude-pages-system-archivist-review-instructions` during a review-instructions reading of `domains/folders/pages-system.md` on 2026-08-09. That seat reported the incident and the remedy from the opening of `packages/shared/pages/access/src/get-by-relation.ts`, and reported 2-33s against 91ms as the measured cost. Those are its readings of the code, relayed rather than re-run here.

The gap was opened rather than found: that seat's repair to Unbucketed List Read removed a clause naming a relation narrow as safe, which inverted the incident. Authoring the replacement was not a dispatched reading's to do, so it wrote none.

The filing seat confirms `domains/folders/pages-system.md` carries three rules and none binds a relation read. Not measured: the figures, and whether a rule is warranted at all.
