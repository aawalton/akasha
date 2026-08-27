---
id: 66a755a6-d779-54ac-9eae-21c90eaa75a5
page-type-slug: finding
title: "Tmp worktree leak exhausts inodes"
domain-slug: domain/global
---

# Claim

The documented safe pattern for verifying a pre-existing failure, `git worktree add /tmp/check-<seq> origin/main`, leaks a ~1.1GB/~100k-inode checkout that nothing removes; because `/tmp` is tmpfs with a shared, fleet-wide, hard inode cap of 1,048,576, roughly ten such leaks exhaust every agent's shell with ENOSPC while bytes stay mostly free, so the failure misdiagnoses as "disk full" and is produced by following the documented instruction, not by deviating from it.

# Evidence

From project #16193 (domain: code-harness). Found while working #16055: every Bash call began failing with ENOSPC, including ones that write nothing.

MECHANISM: `/tmp` is tmpfs with a hard cap of 1,048,576 inodes. The documented safe alternative for verifying a pre-existing failure is `git worktree add /tmp/check-<seq> origin/main`. Each such worktree is a full checkout: ~1.1GB and ~100k inodes. Nothing removes it, so about ten — or six plus normal `/tmp` traffic — exhausts the inode table while leaving most bytes free.

MEASURED: `/tmp` inodes 946,924/1,048,576 = 91% (exhausted); bytes 37% used (plenty free). Leaked directories: `/tmp/check-16032`, `/tmp/check-15942`, `/tmp/check-15628`, `/tmp/check-main-repo-paths`, `/tmp/sweep-repro`, `/tmp/exe-probe`. Deliberately not deleted — an unfamiliar directory under another agent's seq may be its in-flight work.

AT WRITING: the acute condition cleared on its own (18% inodes; worktree directories gone). The population moved; the mechanism did not — nothing prevents recurrence.

WHY EXPENSIVE: (1) fleet-wide, not per-agent — tmpfs is shared, so one agent's leak takes out every agent's shell, including the ability to diagnose it; (2) it misdiagnoses itself — ENOSPC with most bytes free reads as "disk full," false; the inode dimension is invisible to `df -h`/`free -h`, only `df -i` shows it. Produced by following the documented instruction, not by deviating from it.

CANDIDATE DIRECTIONS, not a decision: place ephemeral worktrees somewhere without a shared inode cap; make the documented pattern self-cleaning; or make the exhaustion loud early so the first agent to notice sees the inode dimension rather than "disk full."

NOT FIXED HERE — outside #16055's scope, touching a repo-wide pattern rather than this row's own surface. A later addendum records a separate, unrelated self-correction episode: a halt note falsely claimed #16193's own branch was landed when it was pushed but not merged into `origin/main`.
