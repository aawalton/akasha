---
id: 1f318147-0a39-5f96-b846-9e870d3ea33a
slug: imagery-direction-in-code
page-type-slug: finding
title: "Imagery direction in code"
domain-slug: domain/relationship-level
---

# Claim

Relationship-level imagery direction (closeness, wardrobe, pose per level) is authored only inside the code repository and read by a workstation command, so moving it outside that repository risks carrying only what the existing text happens to hold rather than Alan's actual intent, and risks breaking deployed workers that import the same module for its level arithmetic — baselines, points per green day, and the level-for-points function.

# Evidence

Project #18828, domain relationship-level, parent #18829, initiative harness-without-a-deploy, status someday_maybe, live-on commit. `project` is a barred meaning now and that row is gone, so nothing carries this but the finding.

Where the subject stands today: `alan/persona/closeness/closeness.ts`. `LevelImagery` at :13 is the three fields, `LEVELS` at :24 is the authored direction for each stage — `closeness`, `wardrobe` and `pose` in prose per level — and `STAGES` at :3 names them. The code repository is gone, so the direction is no longer outside the pages repository; it is prose inside a TypeScript file rather than on a page of its own.

Three objectives stood open, none met:

(1) The imagery direction for each relationship level should be authored outside the code repository. Closeness, wardrobe and pose per level are read by a workstation command alone, so nothing about them reaches production and nothing about them needs a deploy.

(2) Alan should settle the direction rather than a seat carrying over what stands. What stands was written into code, and a seat moving it elsewhere would carry his intent only where the old text happened to hold it.

(3) No deployed worker should lose the level arithmetic when the direction moves. The baselines, the points per green day, and the level-for-points function sit in the same module and are imported by workers that do reach production.

Still one module. `GREEN_BASELINE_DAYS` stands at `alan/persona/closeness/closeness.ts:81`, `levelForPoints` at :85, `percentProgressForPoints` at :101, `levelForGreenDays` at :120 and `clampLevel` at :149 — all beneath `LEVELS`. `DEFAULT_GREEN_DAY_POINTS` moved out, to `readouts/ring/ladder/ladder.ts:17`. The importers are `alan/persona/ledger/ledger.ts:2-8`, `alan/persona/pending-report/pending-report.ts:6`, `tools/lib/daily-tracking/tracking-modules.ts:15` and `alanwalton/personas-core/src/render-prompt.ts`.

No Notes section was present on the project. No measurements, dates, commits, or file paths were recorded against it.
