---
id: 5d079e4b-4e62-5f98-97d5-b53e8faec2e0
slug: seat-is-spelled-agent-in-code
page-type-slug: finding
title: "Seat is spelled agent in code"
domain-slug: page-type/seat
---

# Claim

The concept this estate calls a seat is spelled agent in the CLI verb, the page-type slug and every table read, and helper, resident, worker or child elsewhere in the same packages.

# Evidence

`packages/agents/cli/src/agent/*` is the whole verb surface, and `shared/db-agent-create.ts:19` sets `const AGENT_SLUG = "agent"` as the page type.

`cli/src/agent/helper-lifecycle.ts` calls one a helper, through `acquireHelper`. `shared/db-agent-list.ts:19` and the `spawn` help call one a resident, a worker or a child.

The traffic runs the other way too: `shared/agent-mode.ts:38` comments "A seat somebody is watching" on a constant named `AGENT_MODE_*`.
