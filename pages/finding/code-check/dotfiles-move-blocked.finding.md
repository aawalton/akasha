---
id: 46953a40-7294-5c81-8384-6550e620b8b9
page-type-slug: finding
title: "Dotfiles move blocked"
domain-slug: domain/global
---

# Claim

`packages/shared/dotfiles` is workstation-local by Alan's boundary rule and so does not belong in the code repository, but three things in the code repository name its path and two of its files exceed the instructions repo's byte ceiling, so moving it is a project rather than an edit.

# Evidence

Read on 2026-08-12 against `~/worktrees/18822`: 157 KB over 59 tracked files, second on `ops graph unreached-roots`.

Alan ruled the same day that provisioning another machine is not deploying to it, which settles the only part that looked otherwise — `provision-macbook.sh` and `Brewfile.macos` provision the MacBook. The rest is this workstation: `.bashrc`, 30 systemd user units, udev rules, sysctl drop-ins, container registry conf.

WHAT NAMES THE PATH, each read directly:

- `packages/alanwalton/personas/core/src/git-byte-pathspecs.ts:25` declares `ATHENA_DOTFILES_PREFIX = "packages/shared/dotfiles/"`, a git-byte faucet: Athena's earned points are committed bytes under that prefix, metered by extension (`sh`, `bashrc`, `service`, others). Moving the directory out of the code repository does not relocate that surface — the commits cease to exist in git. The same module feeds the cumulative `totalPoints` pass in `@alanwalton/daily-tracking` and the `ops persona level` ledger.
- `packages/agents/vscode-extension/src/features/agent-tree/activate.ts:52` builds a runtime path from `os.homedir()` and `code/packages/shared/dotfiles/bin/ops`.
- `packages/agents/supervisor/src/supervisor-config.ts:73,78` composes remediation text naming `setup-symlinks.sh` at that path.

Comment-only mentions: `doctrine-path-citations.ts:171`, `mcp-registry.ts:67`, `ai-toolkit-up.sh:28`, and a fixture prefix list in `faucet-engine.unit.test.ts`.

AGAINST THE INSTRUCTIONS REPO'S CEILING: `provision-workstation.sh` is 25,237 bytes and `setup-symlinks.sh` is 26,518, against 15,000. Neither is a lock file, so the exemption at `9861908e5` does not reach them.

Not established: what share of Athena's points comes from this prefix. Nothing was measured.
