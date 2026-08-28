---
page-type-slug: finding
title: "The root build is clean over a third of the tree"
domain-slug: domain/checks-system
---

# Claim

`bunx tsc -b` at the repository root returns exit 0 having looked at roughly a third of the tree's top-level code directories.

Its `references` list omits whole directories that carry a `tsconfig.json`, so a clean build says nothing about them. `ops checks audit typecheck` is the honest instrument and reports failures at the same commit.

# Evidence

Measured against `main` on 2026-08-28.

The root `tsconfig.json` names 52 references, reaching four top-level directories: `alanwalton`, `infra`, `shared`, `temper`.

Carrying a `tsconfig.json` and absent from that list: `archive-of-worlds`, `audhdalan`, `automation`, `collections`, `editor-extension`, `lua-compiler`, `media`, `smilingjenny`, `stories`.

`bunx tsc --noEmit` at the root is worse and not the same fault: the root config ends `"files": []`, so it compiles nothing at all — 0.194 seconds, exit 0, zero files. The check already defends against that trap internally. `projectsIn` skips any config whose parsed `fileNames` is empty, under a comment reading "A CONFIG CLAIMING NO FILES OWNS NONE," so a solution-style root does not stand as the owner of every file beneath it. The trap was known and guarded inside the check, and still caught two seats outside it within an hour of each other.

The audit does not share the gap. A file under no project is judged under default options, so `tools/` and `lua-compiler/` are reported. `ops checks audit typecheck` read 176 failures at a commit where `tsc -b --force` reported exit 0 and no output.

One instance found by that difference: `tools/lib/local-executor/index.ts` forwards four names on lines 3, 5, 6 and 7 that `./executor.ts` does not export — the same shape as a barrel removed from `shared/pages-core` on 2026-08-27, alive and unreported because no root reference reaches `tools/`.

Not measured: whether extending the references list would make the root build agree with the audit, or what it would cost.
