---
id: f002c5de-0e11-56fe-aef2-c4bb95514888
slug: worktree-measurement-stale
page-type-slug: finding
title: "Worktree measurement stale"
domain-slug: domain/global
---

# Claim

A measurement taken inside a worktree of a shared artefact (a file length, registry count, ratchet size, allowlist or declared population) can be stale relative to main, and nothing in the act of measuring distinguishes a current reading from a behind one, so a stale number can be committed as a stated fact.

# Evidence

Project #17198 (status someday_maybe, live-on deploy, domain `project-path`); notes captured 2026-08-15, no objective written.

Exploration measured this is needed, across six live worktrees, with a committed design resting on a dissolved constraint. `both-verdict-coverage-families.ts` sat at 493/500 lines; `19dd29a0a6 refactor(#17093)` split declarations out, leaving it 108 lines on main. Six worktrees carried stale copies at three lengths: 493 (17162, 16927), 470 (17075, 17044), 447 (17057, 17052), 108 (17188, 17136, 16973 — current). None had uncommitted work there; they were simply behind.

Committed instance: worktree 17162's HEAD (`refactor(#17165)`) states the coverage pairing "stays out of the family registry, because the registry file sits at its length cap and no declaration fits in the seven lines left" — seven lines left is 493/500. The design may still be right, but the stated reason is already false, and it's committed, so it outlives the branch and rebases into main's history.

Why measurement is worse than a stale read: a stale fact may be corrected by the next read; a measurement carries the authority of observation, though the observation is of a local artefact (the worktree), not the world. `wc -l` on a file in one's own tree is true of that tree and gets written down as a statement about the shared constraint.

Class is larger than caps: any branch-local measurement of a shared artefact (file lengths, registry counts, ratchet sizes, allowlist contents, declared populations) can be stale.

Distinct from #17174 (there the measuring rule is wrong; here it's right and the subject is stale) and #17093's concurrent-addition shape (two authors converging on one file; here one author is simply behind — #17093 fixed that file, not this).

A follow-up note (2026-07-29) adds a propagation chain observed end to end — four links, three agents, one unmeasured number — as further evidence; that capture was cut at a paragraph boundary.
