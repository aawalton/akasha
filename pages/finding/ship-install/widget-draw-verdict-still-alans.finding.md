---
id: 4c7032b4-40f9-5a0f-9586-2e014cbcfe6d
slug: widget-draw-verdict-still-alans
page-type-slug: finding
title: "Widget draw verdict still alans"
domain-slug: task/ship-install
---

# Claim

`ship-install` stage 4 says to take what the widget shows from Alan alone, because a simulator, a preview and CI each report on a build the widget is not in. An instrument now says what a widget draws, from a workstation, with no bundle involved. A seat reading that stage today would not learn it exists, so the first verdict on a tile still reaches Alan by instruction — which `domains/readouts.md` intends never to happen and whose Device Conditions rule assumes the instrument is used.

# Evidence

Found 2026-08-10 during a `review-instructions` pass over `domains/readouts.md`.

Ran `packages/alanwalton/native-shell/scripts/render-harness/run.sh --widget pipeline-health --out /var/tmp/render-readouts-review` from a Linux workstation. It shipped the working tree to the macbook over ssh, rendered there and brought the images back: 17 cases passed — ten coverage cases over every widget and family the sources declare, six reference comparisons at 0.0000% moved, and `refused-is-distinct`. It renders SwiftUI views through `ImageRenderer` under `simctl spawn`, so it needs no app, no window and no installed bundle, which is the condition stage 4's reason turns on. `references/alanwalton/manifest.json` records what the references were blessed under: Xcode 26.6, iOS 26.5, iPhone 17 Pro.

The harness's own header states the state stage 4 describes and dates it as past: "The only instrument in this system that says what a widget DRAWS — before this, a widget change reached its first verdict at a TestFlight cut, on Alan's own phone."

Stage 4's reason is still true as far as it goes: `scripts/build-sim.sh` does delete the widget extension from the installed bundle, so a simulator install still shows a build the widget is not in. What has changed is that a verdict on what the tile DRAWS no longer needs an install.

Not measured: how much of stage 4 the harness replaces — whether anything beyond drawing still needs his hands, and whether the step belongs before the cut or after it. Nothing was repaired, because that is judgment about this task rather than something an instrument settles.
