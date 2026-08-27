---
id: b9adf978-efe2-5886-929d-0b755ae84f7f
page-type-slug: ops-command
title: "Ops tower turn"
slug: ops-tower-turn
domain-parent-slug: domain/ops-tower
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/tower/turn.ts
path: tower turn
---

# Definition

- **Ops tower turn** — one action resolved by the Tower's formula, its roll kept as an event only the coordinator sees.

# Help

Resolve one action through the pure Tower engine and print the roll.

Reads an engine ActionInput JSON from --action (a path, or '-' for stdin) — { attacker, defender, mode, baseDamage, skillBonus?, intent, gate?, seed } — and runs the deterministic seeded resolveAction. The roll is coordinator-only (shown=false): it is never written to pages and never shown to the player.

Deterministic: the same input always produces the same roll.

Default stdout: the resolution line. --json stdout: the roll payload.
