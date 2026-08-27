---
id: 3a31581a-b107-5f88-bc4e-a127c433e755
page-type-slug: finding
title: "System prompt symlink retired"
domain-slug: domain/agent-harness
---

# Claim

Six quarantine surfaces describe the `~/.claude/system-prompt.md` symlink as live, and it no longer exists on this workstation or in the inventory that declared it.

# Evidence

Project #17881 dropped the declaration from `packages/shared/dotfiles/setup-symlinks.sh` at `4193ce7c21a5c814f5e71e0b6e0f8c7648a511a6` and removed the live link, because its target — `~/instructions/dirty/docs/system-prompt.md` — has never existed and the symlink pass in `ops seat reap` reported it dangling on every sweep.

Measured 2026-08-05 across `~/instructions`, every citation of `.claude/system-prompt.md` sits under `dirty/`; the clean perimeter names it nowhere, and `links-resolve` reports 0 broken on the perimeter. Three carry it as a row in a symlink-chain table stating a mapping that no longer holds: `dirty/code/docs-symlinks.md:28`, `dirty/code/packages-shared-dotfiles-claude.md:77`, `dirty/code/packages-shared-dotfiles-docs-dotfiles-symlink-architecture.md:30`.

Three more state it in prose, and one of those was already false before this change. `dirty/code/claude.md:53` says the local supervisor passes `--system-prompt-file ~/.claude/system-prompt.md` on every Claude CLI spawn; `packages/agents/supervisor/src/supervisor-boot-prompt.ts` composes a per-seat prompt through `materializeBootPrompt` and its header records that the fleet-wide file was removed deliberately, and `REQUIRED_BOOT_FILES` in `supervisor-config.ts` is empty for the same reason. `dirty/code/claude.md:44` and `:122` describe the path as resolving into `~/instructions`, which is how a reader is told which repository owns a home path.

`dirty/code/packages-alanwalton-personas-docs-standing-conventions.md:58` is wrong in a second way independent of this change: it names three entries the inventory declares under `.claude/` — `system-prompt.md`, `settings.json`, `.mcp.json` — where the file declared two before this row and one after, and a comment block in it records that no `settings.json` is wired and why.

The repair is a rewrite at each site rather than a path substitution, since what several of them assert is a mechanism rather than a location.
