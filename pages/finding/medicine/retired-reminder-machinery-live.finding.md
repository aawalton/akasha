---
id: ea482535-a1dc-5224-958b-d02801fc720a
slug: retired-reminder-machinery-live
page-type-slug: finding
title: "Retired reminder machinery live"
domain-slug: domain/medicine
---

# Claim

The morning meds reminder's bespoke machinery is still live in code, though Alan retired the rule and
forbade a replacement. `decideMedsReminderFire` and its unit tests stand in
`packages/automation/scheduler/src/meds-reminder-decide.ts`, and `activity-conditions.ts` registers
`meds-not-taken-today` in the scheduler's live condition registry. No automation row uses either. A
seat reading the scheduler meets a supported-looking condition for the one prompt he ruled out.

# Evidence

Alan retired the rule on #16264, 2026-07-25, in these words: *"Meds reminder should be dropped, that
is no longer needed."* The same row withdraws the replacement requirement explicitly: *"Do not build
a replacement, do not mint a notification page, do not route it to elaine or anyone else."*

What still stands, read today at `~/code`:

- `packages/automation/scheduler/src/meds-reminder-decide.ts` exports `decideMedsReminderFire`,
  described in its own docblock as "Pure deciders for the meds-reminder rule — the first instance of
  the time + activity scheduled-trigger class", beside `meds-reminder-decide.unit.test.ts`.
- `packages/automation/scheduler/src/activity-conditions.ts:57` binds
  `"meds-not-taken-today": medsNotTakenToday` into the condition registry the scheduler resolves
  against, importing `isMedsTakenForDay` from `@alanwalton/meds/tracking/today`.
- `git log --oneline -- packages/automation/scheduler/src/meds-reminder-decide.ts` returns exactly
  one commit, `d814b4b820 feat(#13575): activity-conditioned scheduled triggers — meds-reminder rule
  engine`. Nothing has touched the file since it landed; there is no removal commit.

The rule itself is gone from the data. `ops page list --type automation --count` returns 13;
`--include-deleted --count` returns 17. Listing all 17 titles with `--all` shows no meds-reminder row
among either the live or the deleted set — the deleted four include "Aelwyn morning ritual at 6am
Mountain". So the row is absent while its bespoke decider and condition remain.

Not verified: five of the seventeen rows returned a blank title under a `--properties title`
projection, so a meds row carrying no title cannot be excluded by this census alone. The code half of
the claim does not depend on it.

The generic engine is worth keeping — `@automation/core/pure/activity-trigger-due` is a reusable
class. What is orphaned is the meds-specific layer: a decider named for the retired rule, its tests,
and a registered condition whose only consumer was that rule.
