---
id: 8f471e6e-187d-5fa9-a13d-e4d7645cb984
page-type-slug: finding
title: "check-code-comments reaches the instructions repository, the disqualification two checks were retired for"
domain-slug: domain/global
---

# Claim

`check-code-comments` reaches the instructions repository for its verdict, the same disqualification `check-work-surfacing-coverage` was retired for in #19392 and `check-ast-unused` before it in `8392949e28`.

# Evidence

Measured on 2026-08-18, on `origin/main` at `906cae7506`.

`packages/infra/checks/src/checks/check-code-comments.ts` calls `resolveTree(flags.instructionsRoot)` and then reads `tools/code-comment/scan.ts` out of that tree, running it to produce the reading its verdict is taken from. Both halves of the verdict come back from there: `reading.reached` is the file population the check reports over, and `reading.outside` is the violation set. A change to that scanner, or to the globs `domains/code-comment.md` declares, moves the verdict on a code-repo branch whose diff shows nothing.

`Local Verdict` on `domains/repos/code-repo.md` says to delete a check in the code repository that reaches the instructions repository, and adds that a command is a reach as much as a file is.

After #19392, three checks under `packages/infra/checks/src/checks/` still name the instructions tree. `check-instructions-tree` is not one of these: it passes `violations: []` and never rules on content — it acquires the tree the CI run shares, and its population is the files it wrote. `check-code-comments` is the one remaining instance.

Not measured here: what the reading is worth, whether an audit is the right home for it, and whether the scanner could instead be projected. #19392 chose an audit for the work-surfacing reading on `Change Reach`, but that reading weighed one declared path where this one weighs the whole tree, so the same answer does not follow.
