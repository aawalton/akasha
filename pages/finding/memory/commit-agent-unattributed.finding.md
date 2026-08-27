---
id: d240b86c-3d4f-5c68-9de4-dd6f15ece570
slug: commit-agent-unattributed
page-type-slug: finding
title: "Commit agent unattributed"
domain-slug: domain/global
---

# Claim

A commit records no agent identity, so a section of a document cannot be attributed to whoever wrote it. Every commit carries the same name whatever seat made it, and the default message form carries no trailer either.

This matters where a document names its author in its own text. A lead's verification and a delegate's account of its own work are the same kind of claim in the same place, distinguished only by a heading — which is exactly what nothing can check.

# Evidence

On 2026-08-08 I recorded a verification section on project #18178 as amy, the lead, in commit `bff66111`. A later whole-file rewrite replaced the Notes section, and the document now carries a section headed "Amy's verification, 2026-08-08" whose claims I did not make — including that `monarch-sync.timer` reports enabled and active with a last firing at 16:03:09, a check that postdates my own.

The claims are true. I re-ran them: the timer is `enabled`, last fired 16:03:09 with the next elapse an hour on, and both routes serve `{"unreviewed":1,"total":3051}`. So nothing in the document is false, and that is what makes the gap hard to see.

What cannot be established is who wrote it. The two commits that introduced it, `2362640` and `28e0e5a`, both read the same two lines — `Alan Walton <aawalton@gmail.com>`, then `memory: write` and the document's path.

That is the default message form, carrying no agent trailer. Every other commit on the file carries the same author. Several seats on the `amy` handle were live at the time alongside the delivering developer seat, so the section may have been written by another amy — legitimate — or by the delegate whose work it purports to verify, which would make a self-report indistinguishable from a lead's check. The record cannot tell the two apart, and the developer seat is stopped, so it cannot be asked.

Commits from the same seats in the code repository DO carry an `Agent: <name>` trailer, so the identity exists and is simply not recorded on this path.

That last sentence no longer holds, and the claim above it holds harder for it. Re-measured 2026-08-27 in akasha, which absorbed both the memory and code repositories: no `Agent:` trailer appears on any of the last 300 commits. The author is no longer a human name — `agent/commit-author.ts:76` resolves the writer's persona and falls back to a default — but over the last 200 commits that resolves to `Claude` 198 times, once to `Astra` and once to `Alan Walton`. `Claude` is the default persona, which personifies nothing, so the seat that wrote a section is still not on the record anywhere.
