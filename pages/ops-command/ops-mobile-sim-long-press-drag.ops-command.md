---
id: e0ee38e4-9d9d-57dc-8983-381ae0a2395f
page-type-slug: ops-command
title: "Ops mobile sim long-press-drag"
slug: ops-mobile-sim-long-press-drag
domain-parent-slug: domain/ops-mobile-sim
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/mobile/sim/long-press-drag.ts
path: mobile sim long-press-drag
---

# Definition

- **Ops mobile sim long-press-drag** — a touch held in the sim's webview, dragged from one point to another, and released.

# Help

Long-press at (--x,--y), then drag to (--to-x,--to-y) and release — a native touch gesture the coordinate tap (60ms, no travel) cannot make. Holds ~800ms so a touch long-press opens a context menu, then drags to an item, reproducing the iOS long-press-a-sentence → drag-to-menu-item interaction. Set --to-x/--to-y equal to --x/--y for a pure long-press with no drag. Reuses the active session; re-acquires the webview context first.
