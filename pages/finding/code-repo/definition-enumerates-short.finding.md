---
id: c79f2e3d-e7e3-51f6-9c0b-4b113090d474
page-type-slug: finding
title: "Definition enumerates short"
domain-slug: repo/code-repo
---

# Claim

`code-repo` is the only one of the three "local domain of" definitions carrying a list after a colon, and the list is narrower than what the surface claims: three packages in the checkout fall under none of its items, while `code-path: "**"` states the whole repository.

# Evidence

The family:

- `domains/folders/code-repo.md` — "the local domain of the monorepo: the products, the agent fleet and the infrastructure"
- `domains/folders/memory-repo.md` — "the local domain of the repository memory documents sit in"
- `domains/folders/instructions-repo.md` — "the local domain of this repository"

`ls ~/code/packages` returns twelve: agents, alanwalton, archive-of-worlds, audhdalan, automation, books, collections, infra, media, shared, stories, temper. `shared`, `automation` and `collections` are named by none of the three items in the enumeration, while the surface declares `code-path: "**"`.

Against cutting the list: "the monorepo" is a name without an extent to a reader who has not seen the checkout.

The reading's own recommendation, recorded as evidence rather than as a decision: cut the list, on Parsimony and on the family shape. It did not land it, because `domains/domain.md` assigns a definition "out of shape with the family it sits in" to `define-definition`, which is a lead's task.

This meets `pages/finding/instructions-repo/definition-points-not-names.finding.md` from the opposite side: that one observes `instructions-repo` alone points rather than naming what is inside, where this one observes `code-repo` alone enumerates. Whoever takes either should see both, since the shared frame "the local domain of" spans all three and "local domain" is defined nowhere.

Raised by the `review-instructions` reading of `domains/folders/code-repo.md` on 2026-08-06.
