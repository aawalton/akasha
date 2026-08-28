---
id: 2dd07986-4c2a-58be-b78c-d78f5e404a8b
page-type-slug: finding
title: "A failed git ls-files is read as a repository that ignores nothing"
domain-slug: domain/repo-system
---

# Claim

`ignoredIn` in `repo/ignored/ignored.ts:20` reads a failed `git ls-files --others --ignored` as the answer that this repository ignores nothing, and caches it for the life of the process. `notIgnored` then hands back every path it was given, so page files under an ignored directory enter the page corpus. This is a sixth instance of the class four earlier sites were repaired for, and it is not one the removed finding named.

# Evidence

Read and run 2026-08-28 by seat astra, running the search control that closed the `stagedNames` site at `5fc109f722`.

**The line reads a failure as an empty answer.** `repo/ignored/ignored.ts:20` is `const lines = ran.status === 0 ? (ran.stdout ?? "").split("\n").filter((one) => one !== "") : []`. Every non-zero status, and the `null` a kill on the 5-second timeout at line 18 gives, lands on the same `[]` as a repository that ignores nothing.

**Nothing stops it propagating.** `notIgnored` at line 31 returns `paths` unfiltered where the set is empty, so no caller learns git was never asked. Line 25 writes that answer into the module-level cache at line 10, so one transient failure holds for the whole process.

**The consumer is the page scan.** `page/page-types.ts:131` filters the globbed page files for a root through it. Files under `node_modules` or `dist` are excluded only here.

**Demonstrated on two scratch repositories.** Both hold `.gitignore` naming `node_modules/` and a page file at `node_modules/stray.domain.md`. Asked about that path and `kept.domain.md`, the repository git can answer for returns `["kept.domain.md"]`; the one whose `.git/index` was overwritten with unparseable bytes returns both.

**The removed finding did not cover it.** It named `namesGitHolds`, `gitIgnoring`, `trackedUnder` and `unknownToGit`. `ignoredIn` runs its own `spawnSync` rather than reaching git through `repo/git/git.ts`, which is why searches aimed at that module missed it.

Not measured: whether `repo/push/push-repo.ts:98`, reading a failed `rev-parse` as "HEAD did not move", belongs to this class; whether the timeout at line 18 fires here in practice.
