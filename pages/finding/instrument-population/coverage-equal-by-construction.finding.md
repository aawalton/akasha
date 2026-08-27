---
id: 7bef9217-d067-56f2-8a88-24cffdbfd7bb
page-type-slug: finding
title: "Coverage equal by construction"
domain-slug: domain/instrument-population
---

# Claim

A verdict whose coverage `observed` and `declared` are computed from the same count reports full coverage on every run and cannot fall, so the pair carries no information while reading exactly like a measurement that could have come out otherwise.

# Evidence

`importVerdict` in `packages/alanwalton/elaine-cli/src/lib/health-import-verdict.ts` builds `coverage` as `{ observed: outcome.tally.recordLines, declared: outcome.tally.recordLines, unit: "export records for the two imported metrics" }`. Both fields are the same expression, so the ratio is 1.0 on every run regardless of what the import did — a run that converted nothing and a run that converted everything report identical coverage. The verdict itself is sound: FAIL comes from loss findings and UNKNOWN from doubt findings, computed independently, and those carry the whole judgment. Only the coverage pair cannot move.

The reasoning behind it is deliberate and recorded in the module: the population is the records the Mac-side awk filter yielded for the two imported metrics, not the whole archive, and a denominator claiming the archive would overstate what was examined. That is right. What follows is that no independent declared count exists to compare against, and the code supplies the observed count twice rather than saying so.

`domains/instrument.md` holds the principle this sits under — an instrument is made to fail before it is trusted, because a blind one and a clean one both return nothing. A coverage pair equal by construction has no case that produces anything but full.

The number outlives its explanation. A verdict document carrying a caveat is read once; the coverage figure travels with every later run of the verb and in front of readers who never see the caveat.

What I did NOT measure: what the honest denominator would be. The filtered stream is the only count available where the verdict is built, and whether a real declared count could be obtained was not investigated.
