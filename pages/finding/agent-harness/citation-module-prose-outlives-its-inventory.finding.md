---
id: 9dfb4ab4-41b2-532f-bd00-5e4e45a3070e
page-type-slug: finding
title: "Citation module prose outlives its inventory"
domain-slug: domain/agent-harness
---

# Claim

The live module whose job is catching stale path citations carries stale ones in its own header docblock: it names a symlink whose declaration was deleted and a CI gate that was retired to an out-of-band audit.

# Evidence

`packages/agents/instruction-document/src/doctrine-path-citations.ts` is tracked live in `~/code`. Its header docblock says at lines 23-24 that "`~/.claude/system-prompt.md` points into `~/instructions`". That declaration is gone: `rg -n "system-prompt" packages/shared/dotfiles/setup-symlinks.sh` exits 1, the string is not in the file, and exactly one `link` call targets `~/.claude/` — `.mcp.json` at line 168. `pages/finding/agent-harness/system-prompt-symlink-retired.finding.md` records the removal at `4193ce7c21a5c814f5e71e0b6e0f8c7648a511a6` and measured its citations across `~/instructions` alone, concluding the clean perimeter names the path nowhere. This site is in `~/code` and is live rather than quarantined, so it stands outside what that finding swept.

The same docblock says at lines 29-30 that "The I/O shell is `check-doctrine-path-citations` in `@infra/checks`", and at line 27 calls itself a gate — "which is what lets this gate run where no pod checks out `~/instructions`". `ops enforcement list` names no `check-doctrine-path-citations` among its 232 mechanisms; the nearest name is `check-emitted-path-citations`. `packages/infra/checks/src/lib/check-configs-citations.ts` records the retirement in place of the config: the check stood there until #17875 and was removed because doctrine rows are written out of band by `page update` and `persona set`, so no commit-scoped closure re-runs it. The surviving reading is `ops audit doctrine-path-citations`, registered at `packages/shared/cli/src/ops/registry.ts:156`.

Both claims are load-bearing where they sit rather than incidental: this is the module a reader opens to learn which roots a boot-time citation resolves against, and its executable half is correct — `classifyCitationRoot` at lines 118-119 branches on the prefix constants, and the `.claude/` set is derived at runtime from the inventory at line 145, so the code cannot go stale against `setup-symlinks.sh` in the way its own prose has. Measured 2026-08-08.
