---
id: 7a36037a-2a98-556d-bff5-bebf8e8b3652
page-type-slug: finding
title: "Hygiene cannot read untracked"
domain-slug: domain/global
---

# Claim

The health-stoplights group states an invariant it cannot hold: Alan ruled that a day with nothing logged renders every circle black, and four separate guards enforce that, but the Hygiene meta-circle has no reachable no-data path and renders green or blue on an untracked day. The `HabitInputs` type documents an empty-input no-data reading for that circle which no caller can produce, so the branch guarding it is dead.

# Evidence

Found 2026-08-07 emptying `dirty/code/packages-agents-vscode-extension-docs-feature-status-bar-indicators.md`, whose line 30 asserts a no-readings day renders six black circles. Every citation re-read from tracked source in `~/code`.

THE RULING, on the `HabitInputs` type at `packages/shared/status-bar-access/src/habit-inputs.ts:39-46`: "every circle renders black rather than distinguishing untracked from genuinely-zero ... A later reader who adds a distinct no-data state is overriding him."

ENFORCED, NOT ONLY COMMENTED. `habit-stoplights.ts:118-120`, `laddered` returns black for a null reading. `:130-133`, `capacityTier` pre-checks negatives outside `evalDailyTier`'s clamp. `habit-inputs.ts:92` returns null on an absent OR EMPTY relation because `sum([])` is 0 and would "render red with nothing tracked, against Alan's rule that no data is always black" (:79-83). `:140-152` returns null on an unexpected aggregate config.

THE GAP. Hygiene's no-data branch is `hygieneTier` at `habit-stoplights.ts:143-147`: `if (inboxTiers.length === 0)`. `HabitInputs.inboxTiers` is documented at `habit-inputs.ts:59-60` as "Empty when none resolved — the no-data reading for the meta-circle". No caller produces empty: `readHabitInputs:221` fills it from `getInboxStoplightTiers`, which is `INBOX_ORDER.map(...)` at `inbox-stoplights.ts:164-168` over a six-member `as const`.

WHAT RENDERS INSTEAD. With no `daily-tracking` row all four cached counts coerce to 0 (`inbox-stoplights.ts:180-182, 194-198`), and count 0 is blue at `:103`, weighted 2 at `:105-111`. Four blues mean 8/6=1.33; `evalDailyTier` (`packages/alanwalton/personas/core/src/daily-tier.ts:48-64`) puts that past the `1` threshold — green. Six give exactly 2 — blue.

Not measured: whether blue is wrong here is Alan's to say, hygiene's input being inbox state that exists whether or not he logged health. I did not read his bar, the widget's hygiene path, or whether the branch was ever reachable.
