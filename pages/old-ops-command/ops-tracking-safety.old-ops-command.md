---
id: e89663f4-1abb-5974-815f-19b3c670ba6e
page-type-slug: old-ops-command
title: "Ops tracking safety"
slug: ops-tracking-safety
domain-parent-slug: domain/ops-tracking
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/tracking/safety.ts
path: tracking safety
---

# Definition

- **Ops tracking safety** — splitting the open session at a new safety level, carrying its title and difficulty over.

# Help

Live safety change for the SAME activity: split the currently-open session at the instant and reopen a new one cloning its title, difficulty, and relationship tag(s) — only the safety level changes. One word instead of re-typing a full `switch "<same title>" --safety`. `<level>` is the new safety on the −2…5 half-step scale (same as `--safety` elsewhere). `--at` backdates the split instant (default now). Errors when no session is open — use `tracking start` to begin a stretch first.
