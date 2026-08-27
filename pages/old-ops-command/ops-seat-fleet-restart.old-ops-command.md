---
id: 74a03cb5-c9fb-5efc-8efd-e95280b448e3
page-type-slug: old-ops-command
title: "Ops seat fleet restart"
slug: ops-seat-fleet-restart
domain-parent-slug: domain/ops-seat-fleet
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/seat/fleet/restart.ts
path: seat fleet restart
irreversible: true
---

# Definition

- **Ops seat fleet restart** — every seat whose client started before the settings standing now, cycled onto them.

# Design

A seat is stale by when its client started, never by what its settings file holds now.

A seat already on the current settings is left alone.

The calling seat's own restart is queued on idle rather than taken where it stands.

# Help

Cycle every live seat whose Claude client started before the last commit to `settings/agents.json`, so a hook registration or a permission change reaches the running fleet. A hook's SCRIPT is read afresh at every fire; its REGISTRATION is read once, when the client starts. That is the whole reason this command exists, and why `ops seat refresh-settings` does not do this job: it rewrites the file a running seat watches, which carries permissions but never a registration.

STALENESS IS READ FROM WHEN EACH CLIENT STARTED, never from what its settings file holds now. `refresh-settings` rewrites that file IN PLACE, so a stale client and a current one can be reading the very same bytes — the file cannot tell them apart and neither can you.

Each stale seat is handed to `ops seat resume`, which cycles it in place with its turn kept rather than killing anything out from under it. The CALLING seat is done last and queues its own restart on idle, so it is answered before it dies.

A seat whose client cannot be found is reported `unreadable` and left alone: not knowing is not the same as being current, and this prints the difference rather than hiding it.
