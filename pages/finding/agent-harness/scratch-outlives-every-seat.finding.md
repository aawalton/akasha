---
id: 86649011-dfca-5bd3-b0b7-cf53cd862132
page-type-slug: finding
title: "Scratch outlives every seat"
domain-slug: domain/agent-harness
---

# Claim

`/tmp` accumulates scratch trees from dead seats and nothing reaps them, so the estate wedges itself. `ops seat start` refuses under a 200,000 free-inode floor, and a spawn was refused at 94,376 free. Clearing every top-level directory untouched for more than two days — none held by any running process — recovered 586,668 inodes and took free from 156,997 to 743,665, from 86% used to 30%.

# Evidence

Measured 2026-08-08 on the workstation `/tmp`, a 32 GB tmpfs with 1,048,576 inodes.

The refusal names the mechanism correctly: "the exhausted resource is INODES, not bytes, so df will report the mount healthy". At the time it fired, `df -h /tmp` showed 21% of bytes used.

The debris is per-seat scratch: negative-control trees, extracted snapshots, fixture roots, worktree copies. A `review-check` seat builds one tree per control and a replay sweep builds one per commit examined, each carrying a `node_modules` and a copy of the repo, and a tree costs on the order of 2,000 to 27,000 inodes. Nothing deletes them when the seat exits.

Scanning every `/proc/[0-9]*/cwd` found no running process with a working directory under any of the stale trees — only `claude-1000`, which is the runtime's own scratch and was excluded, and a wine server socket directory. So the whole of the reclaimed space belonged to seats that had already exited.

Two things make this worse than ordinary untidiness.

It is silent until it is fatal. Nothing reports the level, so the first signal is a spawn refusing or a seat taking `ENOSPC` mid-run — which reads as a disk-full error and is not one. One seat took `ENOSPC` during a reading tonight and correctly declined to clear what it could not establish as debris.

And the pressure rises fastest exactly when the estate is working hardest. Free inodes fell 18,000 in three minutes during a replay sweep, so a seat trying to free space by hand loses ground against live consumers. Two seats independently declined to clear the large live trees, both reasoning that deleting a tree an agent returns to costs a batch while waiting costs minutes. That is the right call and it leaves the reaping to nobody.

The floor is doing its job — a spawn onto a full filesystem would fail later and less legibly. What is missing is anything that removes a seat's scratch when the seat exits, or reports the level before a refusal does.
