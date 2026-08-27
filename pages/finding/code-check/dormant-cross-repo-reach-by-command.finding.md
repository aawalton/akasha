---
id: 20a08997-9dff-5c69-885f-ebd6eb6cc055
page-type-slug: finding
title: "A cross-repo reach by command sits ready in the code checks library, reached only from an unimported module"
domain-slug: domain/global
---

# Claim

A cross-repo reach by command sits ready in the code checks library, reached only from a
module nothing imports.

# Evidence

`packages/infra/checks/src/lib/instructions-owner.ts` spawns `ops instructions champions` with
`INSTRUCTIONS_ROOT` set to an instructions checkout, and returns the owners it reads back.
`Local Verdict` on `domains/repos/code-repo.md` counts that as a reach in full — "a command
is a reach as much as a file is" — so a check calling it would take its verdict from a tree
no diff of its own shows.

No check calls it today. Its only importer is
`packages/infra/checks/src/lib/deletion-residue-scans.ts`, and nothing imports that in turn:
searching the tree for `deletion-residue-scans` returns the file itself and no consumer. So
the chain is dormant rather than live, and #19407's sweep of the six reaching checks
correctly did not touch it.

What makes it worth recording is that it is staged rather than absent. The library, the
spawn and the env-var handoff all stand, so wiring one check to `deletion-residue-scans`
reintroduces the exact class #19407 spent five children removing, and no instrument in the
code repo would name it: the reach travels by an environment variable through a spawned
command, which no import graph follows.

Read on the `project-19407` branch after its five commits, before that branch reached main.
Verified against the same branch that `ops audit ast-unused` was run by two of its children
without naming this chain.
