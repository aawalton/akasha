---
id: 8e33abbe-fcca-55f7-9fcb-b36da762865c
page-type-slug: finding
title: "Native shell reads as hand built"
domain-slug: ios-app/alanwalton-ios
---

# Claim

The iOS shell's own package description says a build is a person opening Xcode, and the agent-driven command that actually does it stands two namespaces away, named nowhere near it.

# Evidence

`packages/alanwalton/native-shell/package.json` describes itself as "De-risk spike skeleton — NOT a monorepo workspace; built standalone on the macbook via Xcode". Its `scripts` block offers only `cap`, `ios:add`, `ios:sync`, `ios:open` and `console:capture` — every one of them a step in a build somebody is driving by hand.

`ops mobile deploy-testflight` drives the whole thing over `ssh macbook`: SPA build on the workstation from the pinned origin/main tip, rsync, cap sync, archive, export, altool upload, with `ops mobile cut-status` reading the fingerprint back. Nothing under `packages/alanwalton/native-shell/` names either command, and `domains/readout-displays/readout-display-upkeep-stoplights.md` names `UpkeepStoplightsWidget.swift` in its `code-path` without saying what carries that file to a device.

I acted on the description. I told Alan that changing one word on a widget caption would cost him a hand-driven Xcode build and an install on his phone, and I used that cost as the argument for a design change. He corrected me: the mac build is agent-driven. The design change was right on its own merits; the reason I gave him for it was false.
