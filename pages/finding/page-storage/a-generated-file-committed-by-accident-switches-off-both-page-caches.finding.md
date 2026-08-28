---
id: 7a978689-92ef-5e83-bff9-60b8d34c3c55
page-type-slug: finding
title: "A generated file committed by accident switches off both page caches"
domain-slug: domain/page-storage
---

# Claim

A generated `.d.ts` committed by accident silently switches off both page caches, and no check reports it. The `diff-index` clause of `matchesHead` (`page/property/type-cache.ts:136`) and `matchesCommit` (`page/shape/mark.ts:51`) refuse the ground over any tracked file a build rewrites under the code folders. The untracked clause drops `**/*.d.ts`; the tracked clause drops nothing, `.gitignore` names no `*.d.ts`, and no check names build output.

# Evidence

Measured 2026-08-28. `during-call/during-call.d.ts` was the only tracked `.d.ts` sitting beside its own `.ts` source, of 264 tracked and 24,769 untracked. It was committed at `d9d910af2` as three `export declare` lines; a build later rewrote it with doc comments copied from `during-call.ts`, and it stood modified.

While it stood modified, `git diff-index --quiet HEAD` over the eight folders of `CODE_DIRS` exited 1, and that one file was the only path it named. `ownCodeParts` (`mark.ts:86`) and `groundOver` (`type-cache.ts:163`) refuse on that, so `shapeMarkOf`, `typeMarkOf` and `keyFor` all returned null. `.git/pages/resolved/page-type` held 2,905 entries, none written since 2026-08-27 11:50.

Untracked at `8ef9e5b0b`. `diff-index` now exits 0 over the whole tree, `groundOverCommit` returns a ground, the shape mark is `202f4274…`, and two cache entries were written within a second of the commit, the first in sixteen hours. `bunx tsc -b` at the root exits 0 before and after, and a forced build of both projects naming `during-call.ts` exits 0.

An untracked one is harmless: 48 untracked `.d.ts` stand under `page/` alone, all dropped by the `:(exclude,glob)**/*.d.ts` of `looseIn` and invisible to `diff-index`. The emitter still writes beside sources — `checks-system/check/check-shape.d.ts` stands untracked beside `check-shape.ts` — and which project emits in place is not established. Nothing stops the next one being committed.
