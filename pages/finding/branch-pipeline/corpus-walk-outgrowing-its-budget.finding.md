---
id: 779d1f78-571e-5a7b-8edb-6ebdeef45cc9
slug: corpus-walk-outgrowing-its-budget
page-type-slug: finding
title: "Corpus walk outgrowing its budget"
domain-slug: domain/branch-pipeline
---

# Claim

A branch pipeline step is drifting up against a fixed time budget as the corpus it walks grows, so it now fails on projects whose changes do not touch it. The failure names the step rather than the growth, so each seat that meets it reads it as its own change breaking something.

# Evidence

A seat landing #19153 reported `check-unit-tests` timing out at 254s in `packages/agents/shared` against a 240s budget, on a change that touches no file in that package. The step is the live-corpus walk in `project-binding.unit.test.ts`, which spawns a subprocess per domain against the memory corpus.

What separates growth from a flake, in that seat's own reading: `project-19152` failed the identical step at 248.9s one minute earlier, on an unrelated change, and `27995` passed it at 247.1s. Three consecutive readings clustered just either side of the budget, on three different changes. The seat gave the step's median as 130s and measured it at 99s locally, and a re-run at the same commit went green 49 of 49.

A budget a walk passes at 99s alone and fails at 254s under a loaded queue is not measuring the change in front of it. The corpus it walks grows with every project and initiative filed, and nothing re-reads the budget when it does.

This is the same shape as `timeouts-sized-for-an-idle-box` filed against `instructions-harness`, on a different repository and a different mechanism: that one moves with fleet load, this one moves with corpus size and does not come back down.
