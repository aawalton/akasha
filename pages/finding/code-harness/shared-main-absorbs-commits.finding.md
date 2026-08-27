---
id: c8a6a155-9bb2-5016-bdef-ebd9820aca47
slug: shared-main-absorbs-commits
page-type-slug: finding
title: "Agents sharing the code repository's main checkout commit each other's uncommitted work"
domain-slug: domain/global
---

# Claim

Agents sharing the code repository's main checkout commit each other's uncommitted work, because staging from `git status` cannot tell whose change a modified file is.

# Evidence

Three times in one afternoon on 2026-08-19, work landed inside a commit written by an agent who had not made it.

`a77b02dbf8`, "a persona's last-messaged-at stands beside her document", carries a strip of inline Prometheus alert annotations and the wrapping of `ALERTS_YML` alongside its own persona and wallpaper changes. `9348584093`, "agents: dormancy and the liveness lattice go together", carries a whole CI check with its four tests and the workflow-surface plumbing it reads. In both cases the absorbing agent learnt of it afterwards, and in the second the author learnt of it from `git commit` answering "no changes added to commit".

The absorbing agent named the mechanism without being asked: staging was done from `git status` rather than from a list of files that agent had touched. A modified file in a shared checkout carries nothing saying who modified it, so the two cases — my change, and someone else's change I am about to claim — are one line of output.

Neither commit lost work and neither was reverted. Unpicking a file from a commit that already has commits on top of it, while other agents are committing into the same tree, destroys more than the wrong commit message costs. So the cost is not lost work: it is that `git log` on a file answers with a message about something else, and that the agent who wrote the change cannot commit it, because it is already in.

A worktree per agent is the arrangement this replaced. The accelerated rebuild period is the reason it was replaced, and this is what the arrangement costs while it stands.
