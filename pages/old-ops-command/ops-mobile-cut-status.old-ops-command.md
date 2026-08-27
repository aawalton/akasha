---
id: c878a223-da40-582d-9795-7bc15a731b5c
page-type-slug: old-ops-command
title: "Ops mobile cut-status"
slug: ops-mobile-cut-status
domain-parent-slug: domain/ops-mobile
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/mobile/cut-status.ts
path: mobile cut-status
---

# Definition

- **Ops mobile cut-status** — whether origin/main has moved past the last cut this app shipped, so a fresh one is owed.

# Help

Report whether an intentional TestFlight cut is OWED — i.e. origin/main is ahead of the last shipped cut's fingerprint — or whether devices are CURRENT. On-demand, read-only, and NEVER-BLOCKING: it ALWAYS exits 0 because an owed cut is a normal expected state (auto-deploys are off), not a failure. This is a signal you QUERY, never a red CI gate: the in-shell app snapshots the whole web SPA, so any web/app change makes a cut owed, and a blocking check would false-fail nearly every merge. Reads the latest recorded cut fingerprint from its page and compares it against a hash freshly computed over origin/main in both trees a build reads: akasha's build-input closure, and the app's native shell in the repository its own page names.
