---
id: dd07cf74-13c2-5ce7-a74c-e8fb0a46084d
slug: one-pass-unreachable
page-type-slug: finding
title: "One pass unreachable"
domain-slug: domain/agent-harness
---

# Claim

Two workers independently found that a repo-wide sweep cannot be landed as one `edit.ts` call, and each used `replace` instead.

# Evidence

Both were dispatched with a brief saying to land the sweep as one pass per repository, on the reasoning that `tools/write.ts` and `tools/edit.ts` each take an array of files and admit or refuse the set whole, so a sweep landed in parts leaves the repo saying it two ways in between.

Neither could do it, and both said so unprompted.

The worker on the `surface` retirement reported that `read-before-write` binds every file in the array, and `tools/` is 1.06 MB across 150 files, so the sweep went in as 28 commits with the repo reading both ways in between.

The worker on the `identity` retirement reported the same wall with a figure: `edit.ts` would have required reading 8,666 lines whole to satisfy `read-before-write`. It landed about forty `ops instructions replace` calls instead, and argued that each call is gated and typechecked whole so no broken intermediate could land, and that each covers every occurrence of one spelling at once — so the repo never said one thing two ways, and the partial states were incomplete rather than contradictory.

That argument is worth weighing rather than dismissing. The failure the one-pass instruction names is the repo contradicting itself; a per-spelling `replace` does not produce that state, while a per-file split does.

`domains/role.md` carries Horizontal Change, which says to land a change spanning the instructions repo yourself in one pass rather than dispatching it, because a delegate re-derives the sites and lands the sweep in parts. Both of these were dispatched, both were larger than one seat's context, and both landed in parts.

So the instruction and the tooling disagree at a size the corpus reaches routinely: above roughly a megabyte of affected files, the verb that admits a set whole cannot be reached, and the verb that can be reached admits one spelling at a time.

Nothing reports this. Both workers volunteered it in a hand-back after the fact, and a worker who did not mention it would read as having complied.
