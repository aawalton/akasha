---
id: fb651a03-6323-5de1-8c83-119facd1d593
slug: changed-set-misses-cross-package-breakage
page-type-slug: finding
title: "Changed set misses cross package breakage"
domain-slug: domain/global
---

# Claim

A branch can pass CI over a test it broke, because a package outside the change's computed set is never run.

The changed set decides which packages CI executes. A change whose blast radius reaches a package it does not touch by path leaves that package's suites unrun, and the branch reports green. The scoping treats the files a change edits as the bound on what it can break, which holds for a change whose effects are local and fails for one crossing a seam.

# Evidence

Reported to me by the developer on #18398, whose branch moves supervisor deciders into the instructions repository. Branch CI went green while a test in `packages/infra/checks` was broken by the change; that package was not in the changed set, and the developer found the failure only by running the package directly. The change edits `packages/agents/supervisor` and the instructions tree, so `packages/infra/checks` is reachable through what the change means rather than through what it edits.

NOT VERIFIED BY ME. I did not reproduce the green run, did not read the changed-set computation, and did not confirm which test failed or how `packages/infra/checks` depends on what moved. This is a delivering seat's report on its own branch, which is the class of claim I would normally re-run before acting on — filed rather than acted on for that reason.

NOT MEASURED AT ALL. Whether the scoping has a declared population or headroom reading that would have shown the gap. Whether any check watches for it. How often a change crosses a package boundary the set does not follow, this being one case rather than a population. Whether the same gap exists on the main pipeline as against branch CI.
