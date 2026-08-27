---
id: 79c1ae63-5456-52db-8fa5-890f0d279eeb
page-type-slug: ops-command
title: "Ops tracking switch"
slug: ops-tracking-switch
domain-parent-slug: domain/ops-tracking
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/tracking/switch.ts
path: tracking switch
---

# Definition

- **Ops tracking switch** — closing the open session and opening the next at one instant.

# Help

Live transition: stamp endTime on the currently-open session and open the next one in a single step, at the same instant. The new session takes the given title; `--safety` defaults to the just-closed block's safety (a transition rarely flips Alan's state) and `--difficulty` defaults to the matching `session-activity` default for the title (max when several match). A title no activity matches is REFUSED rather than written unrated — pass `--difficulty`, or add the activity with `tracking activity-set`; nothing is closed and nothing is opened. `--at` overrides the transition instant (default now). Errors when no session is open — use `tracking start` to begin the first block of a stretch.
