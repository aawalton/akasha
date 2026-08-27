---
id: d87199a0-4ff3-5aa9-a9e5-96a8adab0591
slug: scale-names-uncompared
page-type-slug: finding
title: "Scale names uncompared"
domain-slug: readout-scale/safety-level
---

# Claim

Nothing compares the eight safety-scale names on `capture-time-tracking` against the shipped table they translate, and they have disagreed once already.

# Evidence

Reported by the review of `domains/tasks/alan-harness/capture-time-tracking.md` on 2026-08-16, which checked all eight against `packages/audhdalan/web/app/routes/safety-levels.tsx` and found them agreeing today; the document writes bare adjectives where the shipped table writes capabilities. The memory finding `safety-scale-level-four-inverts.md` records the earlier disagreement: the document carried "4 vulnerable" against a shipped "Can be secure", the one rung where dropping the frame flips the meaning, so a seat hearing "I feel vulnerable" would have scored him second-highest of eight. That repair has landed, and the reviewer left the finding in place, it closing on a question Alan holds and has not answered. Not re-checked here.
