---
id: fda1b391-42d9-567f-aad4-9de9ce4ba6a4
page-type-slug: finding
title: "Workstation repositories undeclared"
domain-slug: domain/global
---

# Claim

Nothing in the estate declares which repositories a workstation must hold. `~/instructions` is on this box because someone cloned it, and a second workstation gets it only if someone remembers — so "provisioned wherever `~/instructions` is" is a claim no surface can settle and no instrument can check.

# Evidence

Measured 2026-08-03 while standing `~/memory` up under #17596, which was dispatched naming `packages/shared/dotfiles/setup-symlinks.sh:163-165` as the declared provisioning inventory.

That file declares symlinks, not repositories. Its three lines there link `$HOME/instructions/dirty/docs/system-prompt.md`, `$CODE/.claude/settings.json` and `$CODE/.claude/.mcp.json` into `~/.claude/`, and `packages/agents/instruction-surface/src/anchors.ts:34-75` parses it for exactly that. Nothing in it says a repository must be present, and nothing in it could: a repository holding no file anyone symlinks has no line to appear on.

Neither provisioner clones anything. Searching `provision-workstation.sh` and `provision-macbook.sh` for `clone` returns three matches, all prose in comments about a fresh checkout needing `bun install`. No `git clone` runs in either.

Searching the repo for `alan/instructions.git` returns two hits, both under `packages/infra/git/transport/k8s/` — the bare repo on the cluster, which is where a workstation pushes to rather than a statement that a workstation exists. The remote on this box's `~/instructions` was configured by hand.

The one place naming the trees is `ESTATE_TREES` in `packages/infra/checks/src/lib/estate-trees.ts`, and its own module comment says it answers a different question: which declared tree a file a check ALREADY OPENED was read from. `estateTreeRoots()` returns a path whether or not the directory is there, and a tree nobody mounted reads as UNMEASURED rather than missing.

Both halves are open: no surface says which repositories a seat needs, and no instrument reports one that is absent. `~/memory` inherits the gap on the day it is created rather than introducing it.
