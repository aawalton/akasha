---
page-type-slug: finding
slug: pinned-files-live-roots
title: "The standard suite runs a worktree's files against the live checkout's roots, the branch that would have pinned them being dead since the rename"
domain-slug: domain/checks-system
---

# Claim

The standard suite runs each check against a worktree of one commit and tells it the roots of the live checkout. Its files are pinned and its roots are not.

`suiteTreeEnv` exists to point every repository root at the tree it pinned. It points none of them there. The branch that would have done it tests for a repository named `instructions`, and no repository has carried that name since the rename, so the branch has done nothing since the day it stopped matching. Handed a pinned tree, the function returns an environment with no entry equal to it.

What follows is a split nobody declared. Code under test is read from the worktree, because that is where the runner was pointed. Everything reached through a stated root — pages, the index, whatever a check reads about the repository — comes from the live checkout, which is the working tree as it stands right now, uncommitted changes included. A suite whose purpose is to judge one commit is reading half its inputs from a tree that is not that commit.

This is also what makes the two roots disagree, and that disagreement is what drops a page scan into an unbounded disk walk.

# Evidence

Measured 2026-08-28 at `c53b4e87`.

THE BRANCH. `tools/lib/suite-tree.ts:23-32`:

    export function suiteTreeEnv(pinnedAt: string): Readonly<Record<string, string>> {
      const roots = resolveRoots()
      const env: Record<string, string> = { ...(process.env as Record<string, string>) }
      for (const repo of REPOS) {
        const root = repo === "instructions" ? pinnedAt : roots[repo]
        if (root === undefined) continue
        env[rootEnvName(repo)] = root
      }
      return env
    }

`pinnedAt` is reachable only through `repo === "instructions"`.

THERE IS NO SUCH REPOSITORY.

    REPOS: akasha, code-editor
    REPOS.includes("instructions"): false

read from `repo/roots/roots.ts` at this commit. The comparison is against a name the rename retired, so the true branch is unreachable and `pinnedAt` is dead in the only place it is used.

RUN RATHER THAN READ. Calling `suiteTreeEnv` with a sentinel and asking what came back:

    pinned tree handed in : /var/tmp/suite-trees/PINNED-SENTINEL/repo
      AKASHA_ROOT        = /var/home/walton/repos/akasha
      CODE_EDITOR_ROOT   = /var/home/walton/repos/code-editor

    env entries equal to the pinned tree: 0 (none)

Not one entry in the environment the suite hands its children names the tree it just built.

WHAT IS STILL PINNED. `suite-runs.ts:151-158` spawns each batch with `cwd: tree.at`, and `withSuiteTree` at `suite-tree.ts:44` creates that worktree at the sha with `git worktree add --detach`. So the test files, and every module they import by a relative path, are the pinned commit's. That half works.

WHAT IS NOT. Anything resolved through `resolveRoots()` or `AKASHA_ROOT` answers the live checkout. `repo/roots/roots.ts:38` freezes `HERE` from that at import, so it is the live checkout too. A check reading pages, the page index, or any root-stated path inside a suite run is reading the working tree as it stands at that moment — including changes not committed, and including changes made by other seats while the suite is running.

THE CONSEQUENCE ALREADY MEASURED. `pages/finding/pages-system/scan-walks-symlink-cycles.finding.md` records what the disagreement costs when a caller presents the worktree root while `HERE` holds the live one: the page scan finds no index for that root, falls back to `globSync`, follows the workspace symlink cycles `linkModulesInto` planted, and grows at about 54 MB a second to 8.9 GB before the kernel kills it. That is the mechanism by which the standard suite reaches 72 of the 581 files it asks for.

WHAT I DID NOT ESTABLISH. Which checks actually read a stated root during a suite run, and therefore how much of the suite's verdict is taken against the live tree rather than the pinned one. The split is established; its blast radius is not. That wants an audit of what each check reads, not an inference from this function.

Nor did I establish when the branch last matched, beyond that it cannot now. Whether the suite ever pinned its roots, or whether this was written after the rename against a name that was already gone, is a question for git and not for this reading.

THE THIRD OF ITS KIND TONIGHT. A recorded green naming a sha that is not an object in this repository, and a check comparing against a folder name that moved, are both on record from other seats. This is the same shape: a comparison against a name that used to be right, which fails closed and silently, and reads as working because nothing it guards has complained.
