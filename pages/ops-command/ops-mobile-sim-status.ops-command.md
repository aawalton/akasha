---
id: 4cb2c1ec-84fa-5d5c-85db-b21e1e19528a
page-type-slug: ops-command
title: "Ops mobile sim status"
slug: ops-mobile-sim-status
domain-parent-slug: domain/ops-mobile-sim
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/mobile/sim/status.ts
path: mobile sim status
---

# Definition

- **Ops mobile sim status** — the recorded sim session and its age, beside whether the server and the session still answer.

# Help

Report the current sim-driving session state: the recorded session id / udid / route / webview context and age, whether the macbook Appium server is up, and whether the recorded session still answers. Read-only; exit-0 always.
