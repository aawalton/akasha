---
id: 7cdabe63-d0cc-59e8-ac2e-dcf90758087f
page-type-slug: ops-command
title: "Ops model-gateway status"
slug: ops-model-gateway-status
domain-parent-slug: domain/ops-model-gateway
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/model-gateway/status.ts
path: model-gateway status
---

# Definition

- **Ops model-gateway status** — the model gateway version each live seat is running, read against the tree standing on disk.

# Help

Show model gateway version drift across live seats. With auto-swap disarmed
(#14982), a running gateway stays on its spawned version until a deliberate
`ops model-gateway swap` refreshes it — this command reports the resulting
lag. For each live seat it compares the RUNNING gateway version (from the
seat's state file) against the version of the gateway tree STANDING ON DISK
here, which is what the next spawn or swap would run: `current` when they
match, `lagging` when the tree has moved and the seat has not swapped onto it.

On disk rather than published, because the gateway is spawned from this
repository rather than deployed: nothing here publishes a version for it, so
a comparison against one would read as agreement whatever the tree said.

Default stdout: one TSV row per seat `<name>\t<status>\t<running>\t<on-disk>`
--json stdout:  { ok, onDiskVersion, seats: [{ agentId, name, status, runningVersion }] }
