---
id: 4a25de3e-bba3-5f5e-b6fb-4793a6dc536c
page-type-slug: refusal
title: "Block instructions direct commit"
holes:
  - repo
  - dir
  - aim
---

# Refusal

git commit is prohibited inside the {repo} root - the commit would put content into that repo without validating it.
This one targets: {dir}
Content enters through that repo's own commands, which validate, then write, then commit the paths they wrote:
  - ops edit{aim}    change passages in a file already there
  - ops write{aim}   carry a whole body; the command that can create a file
ALREADY EDITED THE FILE? Hand it to `ops write` as its own source — reading the file back out of {dir} — and it is validated and committed in one act.

ASK THE COMMAND FOR ITS FLAGS — `--help` on either prints them. They are deliberately not repeated here: this hook carried a copy, the commands moved, and the copy went on naming flags they do not take. That does not fail loudly — an unrecognised flag leaves the command reading its payload from stdin, waiting for input nobody is sending.

Until the file goes through a command the edit is live for every agent and nothing has checked it.
Reads (git status, git log, git diff) are not gated.
DERIVED THIS BY RULE RATHER THAN AUTHORING IT? Then it is a script's to make and to commit, and this
guard is not aimed at it. It reads the text of the command it was handed, so a `git commit` inside a
heredoc trips it too: write the script with a file-writing tool, run it, and let the checks judge it.
