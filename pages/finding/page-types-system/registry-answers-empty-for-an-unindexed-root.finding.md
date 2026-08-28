---
id: 9a18739a-6f6a-5ecb-aebb-29434375e0d9
page-type-slug: finding
title: "The page type registry answers empty for a root the index does not cover"
slug: registry-answers-empty-for-an-unindexed-root
domain-slug: domain/page-types-system
---

# Claim

`registryOf` takes a `FileTree` and never asks it which page types stand under its root. `pageTypePaths` at `page/property/registry.ts:66-78` builds the path set from `loadPages()` and the tree's own `pending` set. `loadPages()` reads one index, under a root worked out from `AKASHA_ROOT` or the module's own location, that no caller can pass in. A tree rooted where that index does not reach is answered a registry of nothing rather than refused, and `page-write-where.ts:23` reads that empty as `no such page type` and returns null, so `writePage`, `writeRow` and `rowAppender` write nothing and say nothing.

The caller cannot tell `this tree declares no page types` from `I was not able to look at this tree`. It should be told the second. A root the index does not cover is a source the registry could not read, and Answer Or Refuse puts a refusal there, not an empty list. The empty already decides shipped behaviour once: `documents-on-demand.ts:47-50` reads it as a root that declares none and drops its domain filter.

# Evidence

Read and run on 2026-08-27 against `d3c45ef4c` on `main`.

**The tree is consulted twice and never for its page types.** `pageTypePaths(tree)` uses `tree` at line 70, to drop a repo the tree does not name, and at line 73, to union in the paths of a write being judged. It never calls `tree.paths`, which stands on the `FileTree` interface at `page/file-tree.ts:10` and globs whatever roots the tree was built from. The function's own comment at lines 58-60 says where the set comes from instead: `READ OFF THE INDEX RATHER THAN GLOBBED`.

**No caller can name the index.** `loadPages` at `page/index/store/store.ts:399` takes no argument and reads a file under `indexRoot()`. `indexRoot()` at `page/index/place/place.ts:52` runs `git rev-parse --absolute-git-dir` against `akashaStands()` and caches the answer in a module-level variable. `akashaStands()` at line 20 reads `AKASHA_ROOT`, or resolves the directory this file sits in. Nor is `AKASHA_ROOT` a per-call knob: pointed at another root it makes `repo/roots/roots.ts:79-85` throw at import, because `namedOnDisk` reads `pages/repo/*-repo` from the same place.

**A tree the index does not cover answers empty.** A fixture under `/var/tmp` holding `keeper.page-type.md`, `keeper-day.page-type.md` and one property definition, handed in as `diskFileTree({akasha: root})`, answers:

```
indexRoot()            : /var/home/walton/repos/akasha/.git/pages/index
loadPages() row count  : 59065
page-type files present: [ "keeper.page-type.md", "keeper-day.page-type.md" ]
registryOf(tree).length: 0
tree.open sees keeper   : true
whereFor keeper-day/ada : null
whereRowsStand          : null
```

The same tree, same root, same files, with those three paths handed in as `pending`, answers `2` and the slugs `keeper-day` and `keeper`. Against the indexed checkout `registryOf` answers `393`. So the files were reachable the whole time — `tree.open` found them — and nothing but where the path list came from decided the answer.

**Every caller that meets this is a test.** Eight test files build a fixture root and let `whereFor` build the default tree over it: `tools/tests/page-rows-write.test.ts`, `page-rows-uncommitted.test.ts`, `page-write-filed.test.ts`, `page-write-seq.test.ts`, `page-attachment-write.test.ts`, `page-write-deferred.test.ts`, `page-commit-queue-durability.test.ts`, and `tools/lib/page-rows-resolve.test.ts`. 53 tests fail across them, with this among their causes. Two of the eight already name it: `page-write-seq.test.ts:38-44` and `page-attachment-write.test.ts:52-58` carry the same note, that a page type invented in a temp root `stands in no index, so whereFor finds no type and writePage answers null, writing nothing and saying nothing`.

**No shipped call site passes a root the index does not cover.** Six shipped functions take an akasha root as an argument rather than resolving one — `documents-on-demand.ts:54`, `hold-seat.ts:142`, `seat-resolve.ts:56` and `:95`, `oauth-page-mark.ts:80`, `workflow-dsl/discovery.ts:78` — and every entry point above them supplies the resolved one: `agent-hook-compose-subagent.agent-hook.code.attachment.ts:45` passes `rootFor(resolveRoots(), AKASHA)`, `tools/commands/seat/start.ts:68` the same, `tools/seat.ts:38` `akashaRoot()`, `tools/audits/persona-values.ts:15` `rootFor(repo.roots, AKASHA)`. The root parameter is a test seam. The count of shipped sites passing a foreign root today is zero. What reaches an index that does not answer for its tree does so through the environment rather than through an argument, below.

**The accommodation is the cost already paid.** `tools/lib/documents-on-demand.ts:47-50` says a root declaring no page types says nothing about what a domain is, and that a fixture root holds no page types, so where `domainKinds` comes back empty the filter stands aside and every page is a candidate. That comment is right about fixtures and cannot tell them from a root the registry could not read. A refusal would have needed no such arm.

**Refusing is what its neighbours do.** `repo/roots/roots.ts:79-85` throws where the folder holds no `*-repo` page rather than answering an empty list. `pages-system/store/files.ts:60` takes the root as an argument and walks it, and `statedAt` at line 101 answers a refusal string where a page cannot be read; its comment records this same fault caught once already, a missing YAML parser making the store answer `an empty map of page types` and tell a caller `the repository declares none`.

**A worktree reaches an index of its own, and the two diverge.** Measured here on 2026-08-27. `indexRoot()` resolves through `git rev-parse --absolute-git-dir`, and a worktree's git dir is private to it, so each checkout carries its own index. `git worktree list` names two on this machine, and both indexes stand built and disagree: `.git/pages/index/pages.jsonl` holds 59013 rows, `.git/worktrees/base-wt/pages/index/pages.jsonl` holds 59198. So what stands here is not an empty index but two that disagree, which is worse to read: an answer that looks right for a tree it was not taken from. A worktree whose index has never been built is the empty case, and none was caught standing. Which of the two a caller reaches turns on `AKASHA_ROOT`, which stands in the login environment here naming the main checkout, so a reader in a worktree that inherited it is answered from main and one that did not is answered from the worktree.

Not measured: whether a page type file standing on disk but not yet landed in the index is invisible to a reader outside a gate, which is the same mechanism at a smaller scale.
