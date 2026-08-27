---
id: ee0b2875-a762-59da-8e79-23c7f35ffc3d
slug: tracking-stall-is-announced-once
page-type-slug: finding
title: "Tracking stall is announced once"
domain-slug: domain/alan-harness
---

# Claim

The hourly tracking confirmation stopped asking for four days because an answer Alan gave was never applied to the ledger, and the design reports that stall once rather than repeatedly.

# Evidence

Measured 2026-08-04, after Alan dismissed one hourly confirmation and I looked at the surface behind it.

`Still …?` question rows by day: 07-28 one, 07-29 eight, then none on 07-30, 07-31, 08-01 or 08-02, then 08-03 eleven and 08-04 eleven. Across the four silent days he had 44 open `Session Tracking` blocks (7, 16, 11, 10), and question rows of other kinds were created throughout (2, 5, 17, 5) — so neither the tracking nor the question machinery was down.

`tracking-hourly-confirm.timer` fired every hour throughout: 240 journal lines on each silent day, the same as on the working ones. The service ran and chose not to ask, saying why identically every tick from 07-29 to 08-02:

    decision quiet / why already-filed / reason awaiting-reconciliation
    detail  awaiting-reconciliation@019faf08-… has already been filed — a stall is reported once, never repeated

The emitter blocked correctly: it will not open a new question while an answered one is unapplied. Applying it is the persona seat's work — `hourly-confirm-context.ts` opens by naming it "what Amy is being asked to apply when Alan answers the hourly confirmation in his own words". Nobody applied it, and `progress` climbed from `68h of 6h` to `70h of 6h` in three ticks while saying nothing new.

Two properties compound rather than one failing. The stall is announced once by design, so the notice landed on 07-29 and the four days after were indistinguishable from a quiet workstation. And the block on new questions is unbounded, so one dropped hand-off cost four days of the record rather than an hour.

It resumed 08-03 when the question was reconciled, and nothing in `hourly-confirm.ts` changed after 07-29, so this was operational rather than a regression. The stream is not blocked today.

Not measured: who reconciled it, whether any surface would have shown Alan the stall, whether a bound was considered and rejected, and how many of the 44 blocks he later rebuilt by hand.
