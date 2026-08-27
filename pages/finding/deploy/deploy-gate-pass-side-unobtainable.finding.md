---
id: 496b8bb6-aff2-5f83-8b58-4a04c5a6c932
page-type-slug: finding
title: "Deploy gate pass side unobtainable"
domain-slug: domain/deploy
---

# Claim

`deploy-gate-acceptance.md` requires a pass-side observation from one real `bun ops project deploy` through the extended gate, but that command loads step code from `~/code`, so a project's own deploy exercises main's copy of whatever it changed rather than its own change — the observation is structurally unavailable within the row making a deploy-gate change, except on the render leg, which `move-to-deploy-render-gate-preland.ts` already re-runs pre-land against the worktree's fresh copy.

# Evidence

From project #17034 (status `someday_maybe`, `live-on: deploy`, domain `deploy`), captured and never defined.

The gap: `deploy-gate-acceptance.md` requires a two-sided proof for any deploy-gate change, and its pass side must be one real `bun ops project deploy` exiting 0 through the extended gate. But `bun ops project deploy` loads step code from `~/code`, so a project's own deploy runs main's copy of whatever it changed. The pass-side observation is therefore structurally unavailable inside the span of the row making the change — the first deploy to exercise it is the next one, run by someone else, and a throw aborts every fleet deploy at phase zero.

The remedy already exists, for exactly one leg: `move-to-deploy-render-gate-preland.ts` re-runs the render-gate leg pre-land at the fresh-land chokepoint — the doc's own words: "the phase SHELLS the worktree copy of the leg so the NEW code actually runs against pre-land prod." The doc states plainly it does not cover the non-render legs (outcome-verify, undeclared-attributes) and, as of capture, `object-name-claims-gate.ts` at [0/7].

What it costs, observed: project-16924 held D1 out of #16937 because it could not obtain the pass side. The change was correct and agreed, and could not be accepted. Second time a deploy-gate change in this domain has been blocked or mis-shipped on this axis; the first cost a fleet-wide outage (the doc's own worked example).

Why a project, not just a finding: the diagnosis is settled and the remedy has a landed precedent. The shape: generalise the shell-the-worktree-copy phase from the render leg to the other gate legs.

Open questions for definition: whether every phase-0/1 leg can be re-run pre-land safely (some may have effects); whether the trigger set generalises from `decide-render-gate-surface.ts`'s data-defined shape; whether `@shared/verdict` (a module, not a step) can be covered by a per-leg construction or needs the diff-trigger to reach transitive imports.
