---
id: 7ad7d0b2-6263-528c-b62b-9c67fe579fdc
slug: block-destructive-git-stash
page-type-slug: refusal
title: "Block destructive git stash"
---

# Refusal

git stash is prohibited - refs/stash is shared across all worktrees of a repo, so concurrent stash push/pop in parallel agents can swap or corrupt changesets.

Safe alternatives:
  - To verify a pre-existing failure: copy each file you changed aside, git show <ref>:<path> > <path> for each, run the command, then copy yours back
  - To read a file at a specific revision: git show <ref>:<path> (read-only) or git ls-tree + git cat-file --batch
  - To revert local edits to a single file: edit the file directly with the desired content
