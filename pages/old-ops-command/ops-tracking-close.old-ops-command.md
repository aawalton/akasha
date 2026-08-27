---
id: 24a287e7-6d72-51f6-919d-e1fa9352b4a5
page-type-slug: old-ops-command
title: "Ops tracking close"
slug: ops-tracking-close
domain-parent-slug: domain/ops-tracking
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/tracking/close.ts
path: tracking close
---

# Definition

- **Ops tracking close** — stamping the finish on the open session without opening another.

# Help

Close the currently-open session — stamp its endTime — without opening a new one (stopping for the day, a break, or heading out). `--at` overrides the close instant (default now). Errors when no session is open.
