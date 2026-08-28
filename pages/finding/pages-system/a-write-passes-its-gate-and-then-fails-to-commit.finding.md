---
id: 01a046d1-9ec4-72bb-be82-efbe7050d97e
page-type-slug: finding
slug: a-write-passes-its-gate-and-then-fails-to-commit
title: "A write passes every check and then loses the index lock, so the gate answered and the commit did not"
domain-slug: domain/pages-system
---

# Claim

`ops write` ran its whole gate over one changed file, passed all nine checks, and then failed to commit because another process held `.git/index.lock`, exiting 3 with the file already written to the working tree.

# Evidence

The refusal, verbatim, on 2026-08-27 writing `pages/finding/page-writes-system/unattributed-clear-never-traced-to-a-write-path.finding.md`:

    gate: 9 akasha check(s) over 1 changed file(s), none refused
    error: git commit failed: fatal: Unable to create '/var/home/walton/repos/akasha/.git/index.lock': File exists.

    Another git process seems to be running in this repository, or the lock file may be stale

Exit code 3.

The file was already written when the commit failed. The retry that succeeded reported `7634 → 7634 bytes (+0)` — no change — which is only possible if the failed attempt had already put the new content on disk. So the post-condition of a failed `ops write` is a modified working tree with no commit, not a no-op, and a caller that checks its own edit rather than the exit status sees a change that looks landed and is not.

The load is the cause and is ordinary here: roughly forty agents on a 24-core box, all writing into one checkout. Git's index lock is per-repository, so the more seats work in parallel the likelier two commits overlap.

A retry cleared it on the first attempt, which says the lock was genuinely held and momentarily rather than stale. Nothing in `ops write` retried on its own — I wrote the retry loop by hand at the shell.

Not established: whether `ops write` should retry, wait on the lock, or fail as it does.

Not established: how often this has already happened and gone unremarked. The working tree is left modified, so a subsequent `ops write` naming the same path would commit it silently under a different message — which is close to what happened here, since my retry committed content the first attempt had written.

Not established: whether the leftover modification can be swept into another seat's commit. `pages/repo/akasha-repo.repo.md:35` states that a parent's worktree is shared by every child and anything staged and not committed is swept up, and its Atomic Commit rule tells writers to name their paths. Nothing checks that every writer obeys it.
