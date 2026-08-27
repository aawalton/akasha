---
id: 6ca45a46-5a87-503a-9dbe-c2bc2fa202d7
page-type-slug: ops-command
title: "Ops exercise select"
slug: ops-exercise-select
domain-parent-slug: domain/ops-exercise
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/exercise/select.ts
path: exercise select
---

# Definition

- **Ops exercise select** — planning one ordered session for a focus, and printing why each movement was picked.

# Help

Select an ordered session plan for a focus and print it with its decision envelope — the why-did-it-pick-X. Reads today's focus (or --focus), the week-to-date movement-pattern coverage, the selection policy, the scored in-kit candidate pool, and per-movement history; emits the ordered slots (role, rep range, target RIR, sets, double-progression) plus, per pick, the per-goal scores, features used, rules fired, anchor state, rationale, and the rejected candidates. Pure decision over inspectable inputs — the same day yields the same plan.
