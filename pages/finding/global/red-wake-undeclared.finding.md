---
id: d270b236-cf99-5382-a5eb-58e76f2f4835
page-type-slug: finding
title: "Red wake undeclared"
domain-slug: domain/global
---

# Claim

Instruction surfaces use `red` and `wake` as count nouns in senses no domain declares, which `Plain Or Declared` on `domains/global.md` names and no instrument reports.

# Evidence

`domains/global.md` carried a new principle on 2026-08-06, `Plain Or Declared`: "Write the plain phrase; where you give a word a sense of its own, declare it as a domain first." It exempts a declared word in its declared sense, and binds instruction rather than how a persona speaks.

Two words in standing instruction are used in a sense plain English does not carry, and neither is declared. `grep -rn --include=*.md -E "\ba red\b" domains/` returns 10 uses and `\ba wake\b` returns 7. Neither has a `domain-slug:` anywhere under `domains/`: `grep -rl "^domain-slug: red$" domains/` and the same for `wake` are both empty. `seat` and `lead` are jargon of the same kind in the same sentences, and are declared at `domains/seat.md` and `domains/roles/lead.md`, so they are exempt.

The uses concentrate in the project task family and reach past it:

- `a red` — `build-singleton-commit.md:28`, `build-singleton-deploy.md:51`, `build-parent-commit.md:34`, `build-parent-deploy.md:35` and `:57`, `build-child-commit.md:32`, and `tasks/code-harness/review-check.md:28`, `:32`, `:33`, where it is also a verb ("the only thing that reds on the defect").
- `a wake` — `build-singleton-commit.md:32`, `build-singleton-deploy.md:55`, `build-parent-commit.md:39`, `build-parent-deploy.md:61`, `build-child-commit.md:27`, `build-child-deploy.md:38`, `tasks/general/loop.md:28`.

Two further hits, in `domains/personas/grace.md` and `talia.md`, are the colour red in portrait prose and exempt twice over.

No instrument reports this. `ops instructions run-checks` exits 0, and its `terms-in-reach` line reads "24 term(s) against 353 domain(s) — 2 use(s) out of reach on the perimeter". That check measures declared terms used outside their readers' reach, so an undeclared word is not among the 24 it counts. Neither use it names is `red` or `wake`.

Measured while reviewing `domains/tasks/projects/build-singleton-commit.md`, which carries one of each.
