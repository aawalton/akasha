---
id: 0f244858-7edb-5a95-8893-510ed3729f2f
page-type-slug: finding
title: "Parent edge does no work"
domain-slug: domain/global
---

# Claim

`loop` is the only task in the corpus with two parents and the only one carrying `domain-owner:`, and neither key changes what any reader holds or where ownership lands.

# Evidence

`domains/tasks/general/loop.md` declares `domain-parents: [role, task]` and `domain-owner: role`. Every sibling declares `domain-parents: task` alone — `domains/tasks/general/define-task.md`, `domains/tasks/general/file-finding.md`, and all three under `domains/tasks/archivist/`.

Neither key does work:

- `ops instructions governs` returns an identical five-surface set for `loop.md` and for `define-task.md`, because `domains/role.md` reaches every task under `domains/tasks/general/` through its own `instructions-path:` glob with no edge needed. The extra parent produces no read obligation.
- `ops instructions champions` returns "athena, named by domains/agent-harness.md" for both domains, so `domain-owner: role` picks a descent arriving where the other parent already arrives.

Against calling it surplus: `domains/domain.md` Design says "Two domains of one kind can carry different parents", which licenses it outright, and no check refuses a redundant edge. So nothing runnable parts a surplus edge from a deliberate statement that a loop is a thing a ROLE does.

Raised by the `review-instructions` reading of `domains/tasks/general/loop.md` on 2026-08-06.
