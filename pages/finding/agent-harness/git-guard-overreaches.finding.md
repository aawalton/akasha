---
id: 55dd08fd-ac68-5afb-8c26-a32fecd30bf0
slug: git-guard-overreaches
page-type-slug: finding
title: "Git guard overreaches"
domain-slug: domain/agent-harness
---

# Claim

The `git` guard refuses `git checkout` and `git reset` inside repositories it does not describe, citing a shared worktree and other slice agents in a standalone repository that has neither.

# Evidence

Reported on 2026-08-04 by the seat on #17747, working in `/var/home/walton/repos/code-editor` — a standalone git repository, deliberately outside akasha, with no ops-managed worktree, no slices and no other agent in it.

`git checkout` and `git reset` were refused there with a reason naming a "worktree shared by other slice agents". The reasoning is sound where it was written: the akasha checkout is shared, anything staged and not yet committed is swept into whoever commits next, and a `reset` there destroys another seat's work. None of that is true of a repository no other seat has ever opened.

Nothing was blocked. The seat worked within the refusal — editing files directly and re-`git add`ing to unstage — and the row landed. So this is a report of scope rather than of damage.

What makes it worth filing is which way the error runs. A guard firing where its reasoning does not hold teaches the seats that meet it that the reason is decoration, because the one in front of them is visibly false. That is the failure mode a guard cannot recover from: the next seat reads the same words in akasha, where they are exactly true, having already learnt to route around them.

The estate is also about to hold more repositories like this one, not fewer. The cut at `/var/home/walton/repos/code-editor` is the first tree Alan owns that sits outside the estate repo, and the domain vision has it moving into the monorepo only as a future initiative.
