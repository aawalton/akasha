---
id: 9b66d80d-b60f-5669-8a10-a5e2d4c13e95
page-type-slug: refusal
title: "Block destructive git checkout"
---

# Refusal

git checkout is prohibited - switches branch or destroys path-level changes in a worktree shared by other agents.

Safe alternatives:
  - To verify a pre-existing failure: copy each file you changed aside, git show <ref>:<path> > <path> for each, run the command, then copy yours back
  - To read a file at a specific revision: git show <ref>:<path> (read-only) or git ls-tree + git cat-file --batch
  - To revert local edits to a single file: edit the file directly with the desired content
