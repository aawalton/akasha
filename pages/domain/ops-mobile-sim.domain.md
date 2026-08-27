---
id: 9c1c91b7-a8bd-59cf-9c6c-349b4be06fed
page-type-slug: domain
title: "Ops mobile sim"
slug: ops-mobile-sim
domain-parent-slug: domain/ops-mobile
required-reading-slugs:
  - domain/ops-namespace
---

# Definition

- **Ops mobile sim** — the commands driving an app in the macbook's iOS simulator through one session held between calls.

# Design

The simulator, the Appium server and the build all stand on the macbook, and every command reaches them over ssh or the tailnet.

One recorded session on this workstation is what the driving commands share, and each re-acquires the webview context before it acts.

A command that finds another driver already at work skips rather than fighting it.

The identity injected is the throwaway account unless the caller asks for Alan's, and his is asked for only to read.

# Intent

Nothing here stops the Appium server unless it was asked to.
