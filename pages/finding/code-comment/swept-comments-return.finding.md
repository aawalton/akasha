---
id: c1289fa6-4ca1-5753-b11e-ef926f1a4cde
page-type-slug: finding
title: "Comments outside the forms return to swept packages, and what the deleted ones said is nowhere"
domain-slug: domain/code-comment
---

# Claim

Comments outside the forms return to packages the sweep cleared, and what the deleted ones said stands nowhere. The sweep at `9ee41dca30` deleted 46,368 comments on 2026-08-14 and moved none onto a domain. Two met since on one branch, at `ad5d6f47fc` and `d32eeca023`, both post-date it by five days. Nothing observes whether a deletion carried the comment's substance across, so a sweep that carried none leaves a tree indistinguishable from one that carried all.

# Evidence

Provenance is `git log -L` and `git blame` in the worktree at `/var/home/walton/worktrees/19447`, off `0e6e760a9d`. `git merge-base --is-ancestor 9ee41dca30 ad5d6f47fc` returns true, which places the comment after the sweep rather than surviving it. The 46,368 is the sweep commit's own deletion count, not a count taken again.

Not measured: how many comments stand in the code repository now, how many post-date the sweep, and how many of the 46,368 held substance worth keeping. The two were met by walking one branch for an unrelated reason, so they are an encounter rate on one path, not a rate across the tree.
