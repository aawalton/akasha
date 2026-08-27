---
id: c30c72ef-8007-53ef-95df-b1ce639b5631
page-type-slug: finding
title: "The shell launchers spell the instructions root twice and the second ignores INSTRUCTIONS_ROOT"
domain-slug: domain/agent-harness
---

# Claim

The shell launchers spell the instructions root twice, and the second spelling ignores `INSTRUCTIONS_ROOT` altogether, so one launcher line reaches a checkout the others do not.

# Evidence

Read 2026-08-19, while clearing thirteen red tests in `aw-sn-seat` traced to a root path.

`tools/aw/init/entry-points.ts` now exports `ROOT` as `${INSTRUCTIONS_ROOT:-$HOME/repos/instructions}`, and both `ROOT_LOCAL` and `reload.ts`'s `AW_CLI` read it, so those two cannot drift apart again. `OPS` on the line below is not built from it: it stands as the literal `~/repos/instructions/tools/ops/cli.ts`.

Rendering the init through `generateBashInit` shows the split in the emitted shell. Four `local _root=` lines and the `_aw_cli` line all carry `${INSTRUCTIONS_ROOT:-$HOME/repos/instructions}`; the `cna` launcher's line carries `bun run ~/repos/instructions/tools/ops/cli.ts claude-account add`. A shell with `INSTRUCTIONS_ROOT` set to another checkout therefore runs that checkout's supervisor, proxy and `aw` CLI, and the default checkout's `ops`.

`OPS` has one reader, `tools/aw/init/bash-launchers.ts:18`, inside a launcher that already declares `_root` from `ROOT_LOCAL`, so the value it would need is in scope on the same line.

Not measured: whether anything depends on `OPS` staying tilde-form rather than `$HOME`-form, which is why it was left standing rather than folded into `ROOT` alongside the other two.
