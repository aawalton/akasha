---
id: 6b931ae6-8135-4899-828f-a8c739ec21df
slug: the-parallel-read-record-suite-is-red-and-nothing-runs-it
page-type-slug: finding
title: "The parallel read record suite is red and nothing runs it"
domain-slug: domain/read-record
---

# Claim

`tools/tests/record-read-concurrency.on-demand.test.ts` stands red on main: 7 of its 15 cases fail. It is an on-demand file, so the standard suite never runs it, and it guards the property that concurrent reads all reach the record — the property a reader would most want held before trusting the record under a fleet.

Five failures are the parallel batch cases, at 2, 3, 5 and 10 at once and one over a partial read. Each dies at `record-read-concurrency.on-demand.test.ts:61` with `ENOENT` opening the fixture's record. The record was never created rather than written wrongly, so what failed is the recording never running in the fixture, not the merge under contention.

One failure is `nothing beside the page but the record itself`. One is the case for a lock whose holder died, which dies on `EFAULT: bad address in system call argument` removing the `.lock`.

Whether the fixture cannot invoke the read command on this machine, or the recording genuinely does not land, is not settled here. The `EFAULT` is a kernel-level answer to `rm` and reads as a property of this machine rather than of the code.

# Evidence

Found while establishing whether a change to `agent/record-read.ts` had broken this suite. It had not: measured 2026-08-28 against akasha at `fdf390a31` and again in a worktree at `a45426a87`, the commit before that change, both give 8 pass and 7 fail across 15 cases. Two consecutive runs at the head give the same 7, so the failures are not timing.

The suite names no epoch: searching it and `tools/tests/fixture.ts` for `recordEpoch`, `context-replaced` and `replacedAt` matches nothing. Its cutoff is therefore always 0, and `agent/record-read.ts:19` returns the records unchanged on that value, so the retention landed at `f4c7d97b1` cannot reach these cases.
