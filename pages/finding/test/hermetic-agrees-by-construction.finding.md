---
id: 2ff3bc49-099a-5891-a67e-c59e26bb6cc1
slug: hermetic-agrees-by-construction
page-type-slug: finding
title: "A test that builds the tree it then reads agrees with the code whatever the corpus holds"
domain-slug: domain/test
---

# Claim

A test that builds its own tree and then asserts against it agrees with the code by construction, whatever the corpus holds. `project-document.unit.test.ts` created `projects/` inside a scratch root and read it back, so it passed for months while `PROJECTS_DIR` named a directory the memory repository does not have. Its one line stating the literal path stated the wrong one. Every reader of a project document answered for a file that was never there.

# Evidence

Read in the worktree at `/var/home/walton/worktrees/19447`. Documents stand at `pages/project/<seq>.md`; `~/repos/memory/projects` does not exist. Before the repair, `projectDocumentStands` was false for every project, `projectSeqsStanding` returned `[]` off a swallowed ENOENT, and `readProjectCommitHashes` and `readProjectParentSeq` were empty for every project. Three consumers rode on it, including the branch classifying a worktree as in flight, which could never be taken.

The constant is repaired at `918e7bc164`. What is filed here is the shape of the test, not the constant.

Not measured: how many other tests in either repository build the tree they then assert against, and how many state a path literal that no run compares to the corpus.
