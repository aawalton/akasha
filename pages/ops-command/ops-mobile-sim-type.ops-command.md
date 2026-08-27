---
id: e6a056f4-ee9f-58b1-b1d8-9bee6fb51fee
page-type-slug: ops-command
title: "Ops mobile sim type"
slug: ops-mobile-sim-type
domain-parent-slug: domain/ops-mobile-sim
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/mobile/sim/type.ts
path: mobile sim type
---

# Definition

- **Ops mobile sim type** — text sent to the sim's webview, into a selector or into whatever holds focus.

# Help

Type text into the sim's webview. With --selector, the element is native-tapped first (focus + raise keyboard) then typed into; without it, text goes to the currently-focused element. Reuses the active session.
