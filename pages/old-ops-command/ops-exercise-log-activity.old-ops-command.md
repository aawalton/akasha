---
id: f4124cff-9c7e-5301-8f0e-a9c77c567276
page-type-slug: old-ops-command
title: "Ops exercise log-activity"
slug: ops-exercise-log-activity
domain-parent-slug: domain/ops-exercise
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/exercise/log-activity.ts
path: exercise log-activity
---

# Definition

- **Ops exercise log-activity** — writing one cardio or mobility activity into a session, timed or held rather than repped.

# Help

Log one cardio or mobility activity into a session — the non-strength sibling of log-set. Writes a set-log row with activityType set and duration/distance instead of reps/weight. --duration is given in MINUTES (stored as durationSeconds); --hold is given in SECONDS for mobility holds (also stored as durationSeconds) — pass at most one of the two. --session defaults to the most recent open session; setNumber auto-increments per exercise within the session (override with --set-number).
