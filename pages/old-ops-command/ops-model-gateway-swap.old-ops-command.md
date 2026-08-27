---
id: 782b6d85-76b9-51ba-a77a-5325ee4ac61b
page-type-slug: old-ops-command
title: "Ops model-gateway swap"
slug: ops-model-gateway-swap
domain-parent-slug: domain/ops-model-gateway
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/model-gateway/swap.ts
path: model-gateway swap
---

# Definition

- **Ops model-gateway swap** — a seat's model gateway respawned on the current bytecode, or every live seat's in turn.

# Help

Deliberately swap an agent's model gateway to the current on-disk bytecode —
the ONLY swap path now that auto-swap is disarmed (#14982). Writes a
`proxy_swap` action to the seat's uncommitted file; the supervisor consumes it at handling
time, respawns only the gateway (same port, `ANTHROPIC_BASE_URL` unchanged, no
Claude restart), and arms nothing further. Use this to roll out a critical
gateway fix (credential selection, 429 handling); ordinary deploys no longer
propagate to running gateways automatically.

THE UNCOMMITTED FILE STILL CARRIES `proxy_swap`, not a name matching this command. The
action value is a wire protocol read by supervisors already running the code
they booted with, so renaming it in one step would strand every live one. It
moves when both values can be accepted for as long as a supervisor booted
before that change could still be alive. The ack subsystem's own label for this command is
`proxy-swap`, typed in `tools/lib/seat-action.ts` beside the action value it sends.

One target: `model-gateway swap <agent>`. Whole fleet: `model-gateway swap
--fleet` (every live seat, staggered). A seat with no live gateway is skipped —
its next boot spawns fresh at the current version.

Default stdout: `<status>\t<agentId>` per seat (`swapped` | `no-live-proxy`)
