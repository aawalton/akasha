---
id: 78a67961-6e07-5c34-9ba2-3b9f62aaf8db
slug: block-destructive-git-reset
page-type-slug: refusal
title: "Block destructive git reset"
---

# Refusal

git reset is prohibited - moves HEAD that other agents are committing on top of and (with --hard) discards the working-tree edits of every concurrent agent.

Safe alternatives:
  - To verify a pre-existing failure: copy each file you changed aside, git show <ref>:<path> > <path> for each, run the command, then copy yours back
  - To read a file at a specific revision: git show <ref>:<path> (read-only) or git ls-tree + git cat-file --batch
  - To revert local edits to a single file: edit the file directly with the desired content
