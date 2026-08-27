---
id: 43ed152d-65cd-54be-891a-3d8a707a034d
page-type-slug: finding
title: "Code tree work unowned"
domain-slug: repo/code-repo
---

# Claim

The work the old initiatives left in the code tree is owned by no initiative, and one piece of it was parked on the nearest shelf rather than on anything that owns it.

# Evidence

Three pieces, each verified on 2026-08-01. `settings/agents.json` registers hook scripts out of `$HOME/code/packages/infra/scripts/`, two of them named for this repository — `block-instructions-direct-write.sh` and `block-instructions-direct-commit.sh` — and `BASH_ENV` points at `$HOME/code/packages/shared/dotfiles/bash-env.sh`; the critical-path objective states it is not reached while the machinery spans both trees, and it does. `packages/infra/checks/src/lib/remediation-doc.ts` hardcodes `~/instructions/docs/`, a directory this repository has never had, and 41 distinct slugs pass through `instructionDoc(...)`, so every failing check hands an agent a dead path. The persona row consumers — the name guard, the lead routing, and the dead-read floor — still read what the corpus was meant to replace.

Only the second has an objective anywhere, on `initiatives/corpus/folder.md`, and it was put there because that domain was the nearest thing to a home rather than because it owns the code tree's remediation surface.
