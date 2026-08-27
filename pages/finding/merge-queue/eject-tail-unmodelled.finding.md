---
id: c5f3f471-99d2-5331-a97e-8de6aa531a7f
page-type-slug: finding
title: "Eject tail unmodelled"
domain-slug: domain/global
---

# Claim

The `packages/infra/ci/merge-queue/coordinator` package, though in the repo's Mandatory Coverage Domains set for formal methods, has no `.fizz` or `src/pure/*.spec.ts` modelling the `STAGING_BUILD_MAX_ATTEMPTS` bounded stall / eject-tail transition introduced by #14471, and that gap pre-dates and is not closed by #16203.

# Evidence

Project #16220, domain `merge-queue`, `someday_maybe`, captured but never defined. Found during #16203 (the merge-queue config-load-timeout outage) by the spec agent authoring `config-load-timeout.fizz`.

Finding: `packages/infra/ci/merge-queue/coordinator` is in the repo's Mandatory Coverage Domains set for formal methods. A grep of every `.fizz` and every `src/pure/*.spec.ts` in the package returns zero hits on the `staging_build_fail` bounded stall/eject-tail introduced by #14471 — the `STAGING_BUILD_MAX_ATTEMPTS` counter, its bound, and the eject-tail transition releasing the staging slot are unmodelled.

Why it matters: this is the structural sibling of the transition #16203 just added (bounded counter on a non-attributable forming-path failure, terminal releases the staging slot). #16203 had to construct `staging_build_fail` as a contrast control to keep its `NoEjectOnConfigLoadTimeout` property non-vacuous, so the sibling transition is now partially represented in `config-load-timeout.fizz` purely as a foil, with no spec or properties of its own. The eject-tail blames an entry, so it is where an unproven guard is most costly: the difference between releasing a wedged slot and ejecting an innocent one.

Pre-existing, not introduced by #16203; recorded in `spec/docs/coverage.md` under "Not modeled" rather than absorbed into #16203's fix, so as not to hide the gap.

Scope stated: author the missing spec for #14471's transitions (bounded stall, attempt counter, eject-tail terminal, slot release, recycle-guard `failureClass` stamp), mutation-verified per `config-load-timeout.fizz`'s pattern; also check the same question for other bounded/terminal arms in `advance-forming-helpers.ts` — the audit may be worth more than the single spec.

Domain noted as devops at filing; dalla named as the seat.
