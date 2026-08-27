---
id: c30c72ef-8007-53ef-95df-b1ce639b5631
slug: launcher-root-spelled-twice
page-type-slug: finding
title: "The shell launchers spell the instructions root twice and the second ignores INSTRUCTIONS_ROOT"
domain-slug: domain/agent-harness
---

# Claim

The shell launchers spell the akasha root twice, and the second spelling ignores `AKASHA_ROOT` altogether, so one launcher line reaches a checkout the others do not.

# Evidence

Read 2026-08-19, while clearing thirteen red tests in `aw-sn-seat` traced to a root path.

`tools/aw/init/entry-points.ts:4` exports `ROOT` as `${AKASHA_ROOT:-$HOME/repos/akasha}`, and both `ROOT_LOCAL` on line 5 and `reload.ts`'s `AW_CLI` on line 4 read it, so those two cannot drift apart again. `OPS` at line 9 is not built from it: it stands as the literal `~/repos/akasha/tools/ops/cli.ts`.

Rendering the init through `generateBashInit` shows the split in the emitted shell. Four `local _root=` lines and the `_aw_cli` line all carry `${AKASHA_ROOT:-$HOME/repos/akasha}`; the `cna` launcher's line carries `bun run ~/repos/akasha/tools/ops/cli.ts claude-account add`. A shell with `AKASHA_ROOT` set to another checkout therefore runs that checkout's supervisor, proxy and `aw` CLI, and the default checkout's `ops`.

`OPS` has one reader, `tools/aw/init/bash-launchers.ts:18`, inside a launcher that already declares `_root` from `ROOT_LOCAL`, so the value it would need is in scope on the same line.

Not measured: whether anything depends on `OPS` staying tilde-form rather than `$HOME`-form, which is why it was left standing rather than folded into `ROOT` alongside the other two.
