---
id: a4d27dd4-8f15-56c8-be40-d1bf7e683ef0
page-type-slug: ops-command
title: "Ops mobile sim boot"
slug: ops-mobile-sim-boot
domain-parent-slug: domain/ops-mobile-sim
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/mobile/sim/boot.ts
path: mobile sim boot
---

# Definition

- **Ops mobile sim boot** — the macbook's Appium server up and a simulator booted, with the udid and the server printed.

# Help

Bring the macbook sim-driving environment up: start the on-demand Appium server (only if `/status` shows it down — coexists with a raw-runbook session already driving) and ensure a target simulator is booted. Does NOT create a WebDriver session — run `ops mobile sim open-url` for that. Prints the resolved udid + Appium base.
