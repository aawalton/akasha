---
id: 0cc69c96-8c9e-51aa-9851-1453b5db18ae
page-type-slug: domain
title: "Ops temper community-addon"
slug: ops-temper-community-addon
domain-parent-slug: domain/ops-temper
required-reading-slugs:
  - domain/ops-namespace
  - domain/temper
---

# Definition

- **Ops temper community-addon** — the commands that install and update the addons Temper did not write, from ESOUI into the game.

# Design

Every command reads the deploy pipeline's roster first and leaves those folders alone, and an installed folder the ESOUI catalog does not match is reported rather than removed.

An install is unmanaged on purpose: nothing stamps it into the deploy manifest, so the pipeline's prune cannot reach it.
