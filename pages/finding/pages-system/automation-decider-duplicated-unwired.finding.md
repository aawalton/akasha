---
id: 2603f3f6-041f-514a-b3a2-aa3b3e4db78c
slug: automation-decider-duplicated-unwired
page-type-slug: finding
title: "Automation decider duplicated unwired"
domain-slug: domain/pages-system
---

# Claim

`@shared/pages-ui-store` carries a complete, unit-tested client automation decider that nothing calls, duplicating the fold in `@shared/pages-ui` that is actually wired. Its own docblock names the wired one "the PGlite-era client shell", though that shell reads the TanStack collection — so the dead copy reads as the current one. The feature's whole claim is one decider and no skew, and what stands is two hand-maintained folds, one of them unreachable.

# Evidence

Read against `~/code` on `main`.

`packages/shared/pages/ui-store/src/optimistic/automation-decider.ts` exports four names: `buildAutomationIndexFromPageRows` (line 64), `ComputeAutomationSetArgs` (74), `AutomationPrediction` (97) and `computeAutomationSet` (122). I searched EACH of them across `packages/`, not one, because a module's wiring often uses the export you did not search for. Three return exit 1 outside the module and its own unit test. `AutomationPrediction` returns two hits and both are `OptimisticAutomationPrediction` in `packages/shared/pages/ui/src/supabase/optimistic-automations.ts` — a different symbol matched as a substring, not a caller.

`packages/shared/pages/ui-store/src/index.ts` exports `runPagesOptimisticMutation` and the `PagesMutationPlan` / `RowOverlay` types. It does not re-export the decider, so nothing outside the package can reach it either.

The wired path is elsewhere: `packages/shared/pages/ui/src/supabase/mutations/build-automation-plans.ts` calls `loadAutomationIndex` and `computeOptimisticAutomationSet` from `packages/shared/pages/ui/src/supabase/optimistic-automations.ts`, and is itself called from `mutations/use-optimistic-patch-page.ts:34`. Both files hold a near-identical private `foldSourceEffects` over the same nine `PlannedEffect` arms.

The naming inverts which is current. `automation-decider.ts:6` calls the pages-ui shell "the PGlite-era client shell", but `loadAutomationIndex` reads `collection.toArray` filtered on `page_type_slug === "automation"` — the TanStack collection, no PGlite — and `build-automation-plans.ts:4` records that it was "re-homed onto the TanStack collection for #14313 D2". A reader trusting the docblock works on the dead copy.

`packages/shared/pages/ui-store/package.json:14` declares `"@automation/core": "workspace:*"`, and `automation-decider.ts` and its test are the only files in the package that import it — so the dependency edge exists for the unreachable module alone.
