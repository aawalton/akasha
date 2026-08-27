---
id: db1d5fd0-3f6c-5393-a4b2-7d68d4ab9f2f
page-type-slug: refusal
title: "Block addon direct install"
---

# Refusal

Direct ESO addon installs are prohibited. The shared live AddOns/ folder is reconciled by the deploy pipeline, so a direct install races the reconcile and produces non-deterministic in-game state.

Canonical addon test loop:
  - Commit your change straight onto main in ~/repos/akasha.
  - Deploy it through the ops CLI.
    Its post-land step installs the deployed bytes to the live AddOns/ folder reproducibly.
  - Then /reloadui in-game and verify against the deployed artifact.

To compile-check TS->Lua without installing (no live-folder write), --build-only is allowed:
  ops temper addon build <AddonName> --build-only
