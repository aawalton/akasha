---
id: 01a046d1-9ec4-72bb-be82-efbe7050d97e
page-type-slug: finding
slug: a-write-passes-its-gate-and-then-fails-to-commit
title: "A write passes every check and then loses the index lock, so the gate answered and the commit did not"
domain-slug: domain/pages-system
---

# Claim

`ops write` ran its whole gate over one changed file, passed all nine checks, and then failed to commit because another process held `.git/index.lock`. It exited 3 with the file already written to the working tree. The gate's verdict and the commit are not one event, and only the commit is what the caller asked for.

This matters beyond the one write. Every report tonight that says its commits are on main rests on nobody having hit this window and not noticed, because the failure is loud only if the caller reads the exit code — the file is on disk either way, so a caller that checks its own edit rather than the exit status sees a change that looks landed and is not.

# Evidence

The refusal, verbatim, on 2026-08-27 writing `pages/finding/page-writes-system/unattributed-clear-never-traced-to-a-write-path.finding.md`:

    gate: 9 akasha check(s) over 1 changed file(s), none refused
    error: git commit failed: fatal: Unable to create '/var/home/walton/repos/akasha/.git/index.lock': File exists.

    Another git process seems to be running in this repository, or the lock file may be stale

Exit code 3. The two lines are the whole of it: the gate answered on the first, the commit failed on the second.

The file was already written when the commit failed. The retry that succeeded reported `7634 → 7634 bytes (+0)` — no change — which is only possible if the failed attempt had already put the new content on disk. So the post-condition of a failed `ops write` is a modified working tree with no commit, not a no-op.

The load is the cause and is ordinary here rather than exceptional: roughly forty agents on a 24-core box, all writing into one checkout. Git's index lock is per-repository, so the more seats work in parallel the likelier two commits overlap, and this is the configuration the fleet runs in by design rather than a stress test.

A retry cleared it on the first attempt, which says the lock was genuinely held and momentarily rather than stale. Nothing in `ops write` retried on its own — I wrote the retry loop by hand at the shell.

This is the same shape as two other things found in this repository tonight, which is why it is filed rather than worked around: a check that returns a verdict over a population it never reached (`rows-sidecar-held-to-no-type`, blind to gitignored sidecars) and an audit whose pass covers no `.tsx` file without saying so. In all three the instrument answers, the answer looks like the one asked for, and the gap between them is not stated anywhere in the output.

Not established: whether `ops write` should retry, wait on the lock, or fail as it does and leave the retry to the caller. Retrying inside it hides contention that may be worth seeing; failing as it does is only safe if every caller reads the exit code.

Not established: how often this has already happened and gone unremarked. The working tree is left modified, so a subsequent `ops write` naming the same path would commit it silently under a different message — which is close to what happened here, since my retry committed content the first attempt had written.

Not established: whether the leftover modification can be swept into another seat's commit. `pages/repo/akasha-repo.repo.md:35` states that a parent's worktree is shared by every child and anything staged and not committed is swept up, and its Atomic Commit rule tells writers to name their paths rather than reach for `-a`. That rule holds the risk down; it does not remove it, and nothing checks that every writer obeys it.
