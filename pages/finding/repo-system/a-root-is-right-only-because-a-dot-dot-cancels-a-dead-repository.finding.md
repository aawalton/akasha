---
id: d7063e88-80c4-51f8-8627-e525d1afe26d
page-type-slug: finding
title: "A root is right only because a dot-dot cancels a dead repository"
domain-slug: domain/repo-system
---

# Claim

`repo/roots/roots.ts:56` holds `const BESIDE = resolve(HERE, "..", INSTRUCTIONS)`, which resolves to `/var/home/walton/repos/instructions`. That directory is not on disk. `instructions` was one of the repositories consolidated into `akasha`, and it is not among the `*.repo.md` pages `REPOS` is scanned from, so it is not addressable either.

`BESIDE` has exactly two readers, both inside `rootBeside`.

`roots.ts:111` — `if (repo === INSTRUCTIONS) return BESIDE`. Dead. `instructions` is not in `REPOS`, and every caller loops `REPOS`. If it were ever reached it would hand back a directory that is not there.

`roots.ts:113` — `return resolve(BESIDE, "..", repo)`. Live, and right only by cancellation. It expands to `resolve(HERE, "..", "instructions", "..", repo)`; the `".."` cancels the dead segment, so it equals `resolve(HERE, "..", repo)`.

That live branch is the default path for every repository with no `<REPO>_ROOT` set. It runs inside `rootOf` (`roots.ts:118`) on every `clonedHere()` and `resolveRoots()`, and via the one external caller `page/index/store/store.ts:220` (`indexReaches`).

A path that is correct only because a `..` cancels a directory that is not there is green over something broken. It survives exactly until someone adds a segment to the join, or until a path is normalised somewhere that does not collapse the pair.

# Evidence

Verified on 2026-08-28 against the tree as it stood.

`REPOS` is `["akasha", "code-editor"]`, scanned at module load from `pages/repo/*.repo.md`, which holds `akasha-repo.repo.md` and `code-editor-repo.repo.md` and nothing else.

`BESIDE` is `/var/home/walton/repos/instructions`, and `existsSync` on it returns `false`.

`rootBeside("instructions")` returns `/var/home/walton/repos/instructions` — the dead branch at `roots.ts:111`, handing back a directory that is not there.

`rootBeside("code-editor")` returns `/var/home/walton/repos/code-editor` — the live branch at `roots.ts:113`. Compared against `resolve(HERE, "..", "code-editor")` in the same process, the two are equal.

`resolveRoots()` returns `{"akasha":"/var/home/walton/repos/akasha","code-editor":"/var/home/walton/repos/code-editor","target":"akasha"}`, every non-akasha entry of which comes through the cancelling branch.

Not measured: whether any other path in the tree is built on a segment that only survives because a later `..` removes it.
