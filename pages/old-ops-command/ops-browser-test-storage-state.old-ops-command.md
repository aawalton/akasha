---
id: 8e56ebc6-2a6e-5911-bf16-851480536712
page-type-slug: old-ops-command
title: "Ops browser-test storage-state"
slug: ops-browser-test-storage-state
domain-parent-slug: domain/ops-browser-test
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/playwright-storage-state.ts
path: browser-test storage-state
---

# Definition

- **Ops browser-test storage-state** — the signed-in browser state the Playwright MCP is seeded with.

# Design

It signs in through the page rather than writing a session it composed itself.

Where the throwaway user's stored password is the one that fails, it resets that password to the environment's value and signs in once more.

The state it writes is readable by its owner alone.
