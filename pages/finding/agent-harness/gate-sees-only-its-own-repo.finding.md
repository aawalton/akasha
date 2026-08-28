---
page-type-slug: finding
title: "akasha's gate runs only for writes into akasha, so a landing elsewhere can strand it unjudged"
domain-slug: domain/agent-harness
slug: gate-sees-only-its-own-repo
---

# Claim

`land` runs akasha's checks only where the repository being written is akasha: `akasha/repo/land/land.ts:278` returns ahead of the gate for every other repository. So akasha is judged against changes made into it and never against changes made elsewhere that break it. A landing in another repository can strand akasha's imports with nothing looking. A gate reports on the patch it refuses, and nothing about what the rest of a multi-repository landing left in a repository its write never touched.

# Evidence

Read on 2026-08-26. `akasha/repo/land/land.ts:278` is `if (repo !== AKASHA) return`, standing before the gate call. `runGate(checks, patch)` in `checks-system/run/gate.ts:55` takes the patch being landed, and `treeOn` overlays the changed bodies on the repository being written. Nothing in the path reaches a second repository.

The domain line this sits under is exact and insufficient: every change into akasha is judged before it reaches disk. A change into instructions that removes a name akasha imports is not a change into akasha, so it is judged by nothing, and akasha is broken by a landing that was correctly gated where it landed.

Reported by the agent who hit it, whose forwarding-removal landing in instructions left akasha reaching seven names through forwards that no longer existed. The akasha half of the same work was separately refused on typecheck, correctly, for naming a package outside akasha — but that refusal named a different pair of files than the ones actually stranded, so the refusal was not what found the damage. What found it was resolving every named import in akasha against its export set, over the whole repository, after the landing. That instrument is shaped like the outcome rather than like the patch, and it does not need to know which write caused what it finds.

The incident is not reproducible here: it was repaired at `499f920017` before this was read, so the code fact above is first-hand and the incident is not.
