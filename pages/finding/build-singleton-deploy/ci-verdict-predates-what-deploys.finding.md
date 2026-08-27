---
id: 99c5cea1-2a5e-5245-9192-1cf823b5bdd1
slug: ci-verdict-predates-what-deploys
page-type-slug: finding
title: "CI verdict predates what deploys"
domain-slug: domain/global
---

# Claim

Stage 3's branch CI is keyed to a SHA the stage 5 deploy does not enqueue, because the deploy's sync phase rebases onto `main` first. No act closes the window and no slice can see it, since it spans two stages.

# Evidence

Measured 2026-08-06 on `domains/tasks/projects/build-singleton-deploy.md`.

The reading reports from `ops project deploy --help` that the deploy's sync phase rebases onto `main`, so what ships is not the commit branch CI rendered its verdict over. `ops project check --help` says running it first "shrinks that window but cannot close it" — so the gap is acknowledged by the machinery and has no remedy in it.

The document tells the seat to run branch CI at stage 3 and to deploy at stage 5, and says nothing about the relationship between the two verdicts.

Why no slice could reach it: each bullet is true read alone. Stage 3's claims about branch CI were separately verified and all hold; stage 5's claims about the deploy were separately verified and all hold. The gap is between them, and a walk that judges each bullet against what it asserts cannot see a fact that belongs to neither.

The fork, and the reading's own position on it: there is no act to prescribe, so the only question is whether to tell the seat at all. Its stated preference was to leave it out — "a warning with no remedy attached is weight without an act" — which is Cut The Obvious and Parsimony reasoning rather than a claim the risk is unreal.

The case the other way, which it did not argue: a seat that meets a post-deploy failure has no way to know this window exists, and would look for a cause in its own change.

Not established: how often the rebase actually changes what ships, or whether any deploy has failed on a commit branch CI never saw.
