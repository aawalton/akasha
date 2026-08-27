---
id: 80b74d10-a54b-5d0f-be9b-5e2792c70837
slug: plugin-dirs-reach-no-seat
page-type-slug: finding
title: "Plugin dirs reach no seat"
domain-slug: domain/agent-harness
---

# Claim

The plugin-directory stage of the seat launch passes nothing to every seat, and the project path it asks about is one no installed plugin names.

# Evidence

Measured 2026-08-18, reviewing which Claude settings this system decides against `domains/agent-harness.md`.

`tools/lib/supervisor-interactive-spawn.ts:148` asks `getInstalledPluginDirs` for the plugins of `${HOME_DIR}/code`, and pushes a `--plugin-dir` flag for each answer.

`tools/lib/supervisor-plugin-dirs.ts` answers by reading `~/.claude/plugins/installed_plugins.json`, which Claude Code writes for itself when a plugin is installed. A project-scoped install is skipped where its `projectPath` is not the one asked for.

That manifest today holds one plugin, `skill-creator@claude-plugins-official`, scoped to the project `/var/home/walton/projects/11682/worktree`.

Run against the live manifest, the answer is empty for every project path:

    as the seat launch asks:            []
    asking for the instructions repo:   []
    asking for no project at all:       []

So no seat carries a `--plugin-dir` flag at all, and has not since that worktree stopped being the project.

Which plugins are installed is Claude Code's own state rather than a decision this system makes, so it is not a value this repository would declare. The decision that IS this system's is which project's plugins a seat loads, and that stands as `${HOME_DIR}/code` in TypeScript while a seat's own work is in `${HOME_DIR}/instructions`.

Not measured: whether any plugin is wanted on a seat at all; whether `$HOME/code` was right when it was written; whether user-scoped installs, which this reader does accept, have ever been used.
