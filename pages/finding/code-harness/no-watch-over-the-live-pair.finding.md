---
id: 449c0489-4501-5096-a105-8b454fbc8f93
slug: no-watch-over-the-live-pair
page-type-slug: finding
title: "No watch stands over the live pair"
domain-slug: domain/global
---

# Claim

Once the unused-export reading stops gating, nothing catches a reference from the instructions repository that resolves to nothing in the code repository at the moment it is created. It surfaces only when somebody next runs the audit by hand, or when the command built on it dies for every seat at once.

# Evidence

`packages/infra/checks/src/lib/ast-unused-reach-roots.ts:61` refuses its run when a reference named under `tools/` in the instructions repository resolves to nothing under the code root. That refusal is the only reading anywhere that follows a reference across the two repositories. The references are path strings and package specifiers loaded at run time, so no import graph in the code repository contains them, and the typecheck cannot see them either — recorded at `pages/finding/agent-harness/cross-repo-reach-invisible-to-importer-sweep.finding.md`, where two agents reached the wrong answer twice on that exact ground.

Project #19390 moves that reading into an audit command and scopes this out deliberately, so the reading survives on demand and nothing holds it standing.

The cost of nothing holding it standing is already recorded. On 2026-08-15 an instructions commit named a module whose code half was not deployed, and `ops graph off-workstation` exited 70 for every seat until somebody ran it and found out — `pages/finding/agent-harness/instructions-caller-outruns-code-deploy.finding.md`. No instrument reported it.

A check is the wrong home for it, which is what #19390 settles: its verdict turns on state outside the repository it runs in, and on a branch it fails whoever pushed next rather than whoever created the condition. `domains/watch.md` names the kind that fits — an instrument run on state, ruling on whether a condition holds. What it would run over is the live pair: instructions HEAD against deployed code, which is where the two either agree or do not.

What is unsettled is where such a watch reports and what it wakes, given that the condition is ordinarily true for the length of a deploy and is a fault only past that.
