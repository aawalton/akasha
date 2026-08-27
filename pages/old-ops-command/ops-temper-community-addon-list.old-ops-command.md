---
id: a46432d4-7dd7-50b6-9bd8-22d6eb135fff
page-type-slug: old-ops-command
title: "Ops temper community-addon list"
slug: ops-temper-community-addon-list
domain-parent-slug: domain/ops-temper-community-addon
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/temper/community-addon/list.ts
path: temper community-addon list
---

# Definition

- **Ops temper community-addon list** — every installed addon folder against the ESOUI catalog, with its installed and latest version.

# Help

List every addon folder installed under ESO's live/AddOns directory, matched against the ESOUI catalog. Reports installed vs latest version and a status per addon: outdated, up-to-date, unmatched (no ESOUI entry — orphan or bundled sub-library), or deploy-owned (on the deploy pipeline's install roster). Read-only.
