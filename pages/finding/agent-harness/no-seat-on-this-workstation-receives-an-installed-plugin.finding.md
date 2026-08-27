---
id: 7f1ccd91-f958-554f-a63b-457f34628111
page-type-slug: finding
title: "No seat on this workstation receives an installed plugin"
domain-slug: domain/agent-harness
---

# Claim

The plugin registry on this workstation writes three keys the supervisor's install schema refuses, so the whole registry is discarded rather than the extra keys ignored, and every seat spawned here is launched with no `--plugin-dir` flag at all — measured live, and silent from every direction.

# Evidence

`~/.claude/plugins/installed_plugins.json` carries one install, `skill-creator@claude-plugins-official`, whose entry holds `installPath`, `installedAt`, `lastUpdated`, `projectPath`, `scope` and `version`.

The schema admits three of those. `PLUGIN_INSTALL_SCHEMA` is `{ scope, installPath, projectPath? }.strict()`, in `packages/agents/shared/lib-cli.ts` in the code repository and now also in `tools/lib/supervisor-plugin-dirs.ts` here. `.strict()` refuses the entry, the refusal is caught around the whole parse, and the function answers the empty list rather than an install it could not read.

Measured three ways on 2026-08-13. Driving `getInstalledPluginDirs` from the code repository answers `[]`; driving the port here answers `[]`. The consumer chain is `supervisor-interactive-spawn.ts:171` to `claude-launch-args.ts:123`, which pushes one `--plugin-dir` per entry — so an empty list is no flags. And across the live process table, 31 running claude processes carry `--plugin-dir` zero times.

Nothing reports it. The catch is a fallback rather than a log, so a registry that cannot be read and a registry with nothing in it are the same observable.

Second instance of one class in a day; the other is `pages/finding/agent-harness/turn-end-mode-key-is-malformed-to-the-code-side-reader.finding.md`. Both are a `.strict()` schema whose producer started writing a key the reader was never widened for, and both were written on the reasoning that strictness makes drift show up. There it shows as `malformed`; here it shows as nothing.

Not repaired under the port that found it, deliberately. A port is held to answering what the file it replaces answers, so repairing it there would have destroyed the equivalence the port exists to prove — the porting seat was right to reproduce the fault and report it. It is also not repaired here yet because the supervisors still boot from the code repository, so the copy that runs today is that one; a fix landing only in this repository would fix nothing until those units are repointed.
