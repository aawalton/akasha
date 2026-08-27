---
id: 02769fae-5a0d-50d1-9d77-af954773285a
page-type-slug: finding
title: "The supervisor asks for plugins scoped to the code tree while every seat now spawns in the instructions tree"
domain-slug: page-type/seat-conditions
---

# Claim

The supervisor asks for project-scoped plugins installed against `~/code`, but every seat now spawns in `~/instructions`, so a plugin installed for the instructions tree would never be passed to the agent and nothing would report its absence.

# Evidence

`tools/lib/supervisor-interactive-spawn.ts` line 116 calls `getInstalledPluginDirs(`${HOME_DIR}/code`)`, and that path is a literal rather than the launch cwd.

`tools/lib/supervisor-plugin-dirs.ts` skips any install whose `scope` is `project` and whose `projectPath` differs from the one passed, so an install recorded against `~/instructions` is filtered out before the directory is ever checked for existence.

Nothing is broken today: `~/.claude/plugins/installed_plugins.json` records one plugin, `skill-creator@claude-plugins-official`, scoped to `/var/home/walton/projects/11682/worktree`, and both that project path and the recorded `installPath` are gone from disk. `getInstalledPluginDirs` answers `[]` for `~/code` and `[]` for `~/instructions` alike, so no `--plugin-dir` reaches any launch and the mismatch costs nothing while no plugin is installed.

This is the same residue as the workspace-trust failure repaired on 2026-08-18: the supervisor's launch cwd moved to the instructions tree and a path naming the code tree stayed behind. Trust was found through a visible symptom, a confirmation prompt on every restart. This one has no symptom — a plugin would simply not load.
