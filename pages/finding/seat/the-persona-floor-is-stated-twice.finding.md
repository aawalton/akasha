---
id: 5887e3cb-a2ed-5f84-8504-a0fa64b36369
slug: the-persona-floor-is-stated-twice
page-type-slug: finding
title: "The persona floor is stated twice"
domain-slug: page-type/seat
---

# Claim

Which persona a seat holds when nothing described it is decided in two places — once in the corpus by a default key, once as a hardcoded constant — and a comment asserts the constant was removed.

# Evidence

`domains/personas/claude.md` carries `default: true`, resolved by `tools/lib/seat-resolve.ts:150-166` and applied at `tools/seat.ts:185-189`. That resolver returns nothing where zero or two surfaces claim the default.

`packages/agents/shared/agent-identity.ts:65` sets `PERSONA_FLOOR = "claude"`, written unconditionally at mint by `shared/db-agent-create.ts:86`.

`packages/agents/supervisor/src/supervisor-pin-defaults.ts:18-22` asserts the constants were removed in favour of the corpus. One survives.
