---
id: cf96ffd0-8640-4671-87ad-6da8ccfefc6b
slug: a-failed-git-call-is-read-as-an-empty-repository
page-type-slug: finding
title: "A failed git call is read as an empty repository"
domain-slug: domain/repo-system
---

# Claim

Four helpers turn a non-zero git exit into an empty collection, and two of them feed a decision. `trackedUnder` refuses a removal saying git holds no file under the directory. `namesGitHolds` drops every carried rename from the pathspec commit that would land it, leaves the rename on disk, and reports the write done. Only `unknownToGit` documents failing open deliberately.

# Evidence

Read 2026-08-28 at HEAD. The four sites:

    repo/land/land.ts:101              namesGitHolds  -> new Set()
    repo/git/git.ts:243                gitIgnoring    -> new Set()
    repo/git/git.ts:296                unknownToGit   -> []
    ops-cli/global/rm/rm...ts:25       trackedUnder   -> []

`unknownToGit` is deliberate and says so: the doc comment at `repo/git/git.ts:256-271` gives it two paragraphs, the second naming it — it plans a commit rather than guarding one, so a path it cannot establish is left in for git itself to refuse. `heldByRepo` beside it (`git.ts:272`) takes a failure the other way, added at `e8523f42f3`. The other three carry no line either way.

`trackedUnder` is a presence test today. `rm.command.code.attachment.ts:93` refuses on `under.length === 0` with "is a directory git holds no file under — a removal takes what the repo holds, so this would take nothing". A failed `ls-files` yields that sentence, which states something about the repository the code never established.

`namesGitHolds` has two consumers. At `land.ts:185` its answer becomes `carriedHeld`, which at `land.ts:250` filters which carried paths are named to `commit`; `commit` is pathspec-limited (`git commit ... -- <landing>`, `git.ts:327`). The renames are already applied to the worktree at `land.ts:236-240`. So a failed `ls-files` drops every carry from the commit, the rename stands uncommitted, and `landFiles` returns and prints `commit: <sha>` over it. At `land.ts:182` the same helper feeds `strayed`, whose result prints "NO HISTORY HOLDS WHAT WENT AT ..., which git never tracked" at `land.ts:368` — asserted of paths git was never successfully asked about.

Not established: whether any of these calls has failed in practice. Nothing records a non-zero exit at these sites, so this is a reading of the code rather than of a run.
