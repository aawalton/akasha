---
id: 0c37d560-be38-5a5e-a806-dfff655b169f
page-type-slug: finding
title: "Only the second reads two ways"
domain-slug: domain/global
---

# Claim

A clause on `build-parent-deploy` line 44 reads two ways, and one tells a seat to proceed over a failed land. The Deploy bullet says the command "answers separately for the land and for the pipeline over the landed SHA, and only the second is what the next stage observes". Either the running system reflects the main pipeline rather than the bare land, which is true — or only the second verdict counts, which licenses ignoring a failed land. It stands verbatim at `build-singleton-deploy.md:40`.

# Evidence

Raised by the review-instructions reading of 2026-08-07, which did not rewrite it on its own reading because the two ask for different acts.

Verified myself in the live document at line 44, quoted above in the bullet's own words.

Fifth finding this run of the same shape — a clause whose two readings ask different things, with the safe reading the one a careful reader lands on and the unsafe one available to a scanner. The others are `define-definition/cross-reads-two-ways`, `verify-handback/judge-reads-two-ways`, `handle-inbound/invariant-contradicts-l10` and `build-parent-commit/both-reads-two-ways`.

This one is the sharpest of the five: the wrong reading does not merely mislead, it licenses shipping over a failure.
