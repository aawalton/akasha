---
id: c58524ac-fe3d-52a5-a65b-85ba5f0606d2
page-type-slug: domain
title: "Ops mobile"
slug: ops-mobile
domain-parent-slug: domain/ops-cli
required-reading-slugs:
  - domain/ops-namespace
  - domain/ios-install
---

# Definition

- **Ops mobile** — the commands that build an app's iOS shell on the macbook, ship it and say where the last cut is.

# Design

Every command names its app with `--app`, falls back to alanwalton when it is not given, and refuses a slug it does not know rather than building the wrong app.

The two that build reach the macbook over ssh and run xcodebuild there; the two that report answer from App Store Connect and the recorded fingerprints without touching it.

The fingerprint a shipped cut records is what a later run compares origin/main against.

# Intent

A command that reports never builds.
