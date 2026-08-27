---
id: 7eb60acc-7fb7-5b48-ade7-a2f5748a0982
slug: quarantined-habit-order
page-type-slug: finding
title: "Quarantined habit order"
domain-slug: domain/alan-harness
---

# Claim

Six quarantined instruction surfaces under `dirty/code/` state the health-habit stoplight's render order, and every one of them states the order the system stopped rendering.

# Evidence

`packages/shared/status-bar-access/src/habit-stoplights.ts` declares `HABIT_ORDER`, and #17343 moved it from `sleep, plants, activity, hygiene, capacity, safety` to `plants, activity, sleep, hygiene, capacity, safety` at Alan's request, so that the circles run in the sequence his memorized model already runs in.

The tree that landed that change could not carry the prose with it. Commit `7205e28efd` moved 1,125 markdown files out of the code repository into `dirty/` for triage, and five of the six documents restating this order went with them. The commit holding the prose restatements therefore had nothing left to apply, and it was dropped when the branch was rebased — the edits were not reverted, and their targets are simply no longer in that repository.

Searching the instructions repository for the order spelled case-insensitively and across a line break, with `rg -Uil 'sleep[^a-zA-Z]{1,12}plants'`, returns six files and all six sit under `dirty/code/`: `packages-shared-status-bar-access-claude.md`, `packages-agents-vscode-extension-claude.md`, `packages-agents-vscode-extension-docs-feature-status-bar.md`, `packages-agents-vscode-extension-docs-feature-status-bar-indicators.md`, `packages-alanwalton-native-shell-docs-widgetkit-widgets.md` and `docs-ambient-hud-staleness.md`. The same search for the new order returns nothing.

The sixth of those, `docs-ambient-hud-staleness.md`, was named by neither #17343 nor #17346. It was found only because the search ran against the instructions repository rather than the code one, which is where both rows measured their surface.

Where they stand these documents bind nobody, so nothing is false against a reader today. What the observation bears on is what triage promotes. One of them carries a sentence whose two halves are in positional correspondence — the labels `Sleep / Plants / Activity` against the per-day pillar rollups `sleepPoints`, `nutritionPoints` and `activeCalories` — so reordering the labels without the rollups turns a conventional line into a false one.
