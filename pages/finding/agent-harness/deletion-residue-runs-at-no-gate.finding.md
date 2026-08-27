---
id: 483fe4f2-c72b-5d74-a02c-360f601eb27e
page-type-slug: finding
title: "Deletion residue runs at no gate"
domain-slug: domain/agent-harness
---

# Claim

An instrument for finding what a deletion left behind already exists, and a deletion still landed leaving references standing across four packages, so nothing runs it at the moment a surface is removed.

# Evidence

`packages/infra/checks/src/lib/deletion-residue.ts` reduces what a deletion left behind over declared instruction carriers, and states its own premise: a deleting project's grep is closed under its own worktree and the question is not. Its unit test at `packages/infra/checks/src/lib/deletion-residue.unit.test.ts:32,161` uses `domains/identity.md` as the fixture.

`domains/identity.md` was deleted on 2026-08-05 by commit `415fb0b1`. Measured the same day: 81 source lines across 58 files still name it, excluding build output — 65 in `packages/agents`, 9 in `packages/shared`, 5 in `packages/alanwalton`, 2 in `packages/infra`. Three sit inside strings that reach a reader.

The instructions repo's own `ops instructions rm` runs `[mentions]` and `[links]` over both repos it knows, and the code repo is not one of them.
