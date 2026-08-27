---
id: c8b1a3ec-eec8-5c7a-88d2-46454820b699
page-type-slug: ops-command
title: "Ops mobile sim teardown"
slug: ops-mobile-sim-teardown
domain-parent-slug: domain/ops-mobile-sim
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/mobile/sim/teardown.ts
path: mobile sim teardown
irreversible: true
---

# Definition

- **Ops mobile sim teardown** — the sim session deleted and its recorded state removed, the Appium server too on request.

# Help

End the sim-driving session: delete the WebDriver session (best-effort) and remove the local session-state file. With --stop-appium, also stop the on-demand macbook Appium server (Consume on Demand — nothing lingers). Idempotent: a no-op when no session is recorded.
