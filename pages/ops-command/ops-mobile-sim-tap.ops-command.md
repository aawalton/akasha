---
id: c949d509-fdcc-5c30-8214-11b84ab070fd
page-type-slug: ops-command
title: "Ops mobile sim tap"
slug: ops-mobile-sim-tap
domain-parent-slug: domain/ops-mobile-sim
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/mobile/sim/tap.ts
path: mobile sim tap
---

# Definition

- **Ops mobile sim tap** — a native tap in the sim's webview, at a CSS selector or at viewport coordinates.

# Help

Native-tap the sim's webview — by CSS selector (the element is clicked as a real native tap, which RAISES the software keyboard, unlike a programmatic focus) or by viewport coordinates. Reuses the active session; re-acquires the current webview context first.
