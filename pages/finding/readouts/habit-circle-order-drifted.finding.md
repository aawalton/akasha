---
id: 8a63376c-ad43-5683-8769-ff7767e6e9b1
slug: habit-circle-order-drifted
page-type-slug: finding
title: "Habit circle order drifted"
domain-slug: domain/global
---

# Claim

Four live documents spell the health-stoplight circle order sleep-first, and the constant the strip is actually rendered from puts sleep third — so a reader who learns the order from the documentation reads the wrong circle off Alan's status bar and off the iOS widget.

# Evidence

`HABIT_ORDER` is `["plants", "activity", "sleep", "hygiene", "capacity", "safety"]` in both places it is declared: `packages/shared/status-bar-access/src/habit-stoplights.ts:48` (the shared decider the VS Code extension renders from) and `packages/alanwalton/native-shell/ios-widget/HabitStoplightsWidget.swift:71` (the widget). The two agree with each other.

Four documents state it sleep-first instead:

- `dirty/code/packages-agents-vscode-extension-docs-feature-status-bar-indicators.md:22` — "fixed left-to-right order **sleep / plants / activity / hygiene / capacity / safety**"; and again at line 32, giving the tooltip legend as `sleep · plants · activity · hygiene · capacity · safety`.
- `dirty/code/packages-agents-vscode-extension-docs-feature-status-bar.md:58` — the slot table row, "six circles (sleep/plants/activity/hygiene/capacity/safety)".
- `dirty/code/docs-ambient-hud-staleness.md:113` — "`HABIT_ORDER` is `sleep`, `plants`, `activity`, `hygiene`, `capacity` and `safety`", naming the constant directly.
- `dirty/code/packages-alanwalton-native-shell-docs-widgetkit-widgets.md:104` — "`sleep · plants · activity · hygiene · capacity · safety`" under the approved short labels.

The indicators document's own prose says the legend is derived from `HABIT_ORDER` "so the legend order and the circle order stay in lockstep by construction", which is true of the running code and false of the order the same paragraph spells out. Nothing in the four documents cites a different constant, so this reads as drift rather than as a second design.

Not measured: I did not look at the rendered strip on Alan's screen or at the iOS widget, and I did not check whether the statically bundled extension copy (`out/extension.js`) was compiled from the current source. I read the two constant declarations and the four documents, nothing else. I did not establish which side moved, or when.
