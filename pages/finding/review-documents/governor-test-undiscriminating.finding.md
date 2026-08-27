---
id: 9feca326-4383-5efd-ba71-474bf85a40af
page-type-slug: finding
title: "Governor test undiscriminating"
domain-slug: domain/global
---

# Claim

Step 2 of `review-perimeter` cannot separate the subjects it means to serialise from the ones it means to dispatch together. Six surfaces govern every document on the perimeter, so every pair of subjects shares a governor, every pass serialises in full, and the second half of the step — "dispatch the rest together" — names a set that is always empty.

# Evidence

`bun ~/instructions/tools/stale-reviews.ts` named 54 subjects owed a reading on 2026-08-05. `ops instructions governs --file-path <p>` was asked of each, and the governors were counted across the 54 answers:

- `domains/global.md` — 54
- `domains/folders/instructions-repo.md` — 54
- `domains/agent-harness.md` — 54
- `domains/domain-definition.md` (`# Definition`) — 54
- `domains/domain-design.md` (`# Design`) — 54
- `domains/domain-intent.md` (`# Intent`) — 54
- `domains/principle.md` — 54 (52 anchored to `# Principles`, 2 whole)
- `domains/rule.md` — 54 (52 anchored to `# Rules`, 2 whole)

The next most common governor, `domains/domain.md`, reaches 27.

This is not a property of this backlog. `governs` closes a match over ancestry, and every domain surface stands under `global` through `agent-harness`, so the top of the tree governs everything below it by construction. Any subject set drawn from the perimeter comes back fully meshed.

The pass was run serially in consequence, which is the literal reading and is also what concurrent commits through one door would want.
