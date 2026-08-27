---
id: 97a0d380-b764-56e7-96ac-c6d525114093
page-type-slug: old-ops-command
title: "Ops mobile testflight-status"
slug: ops-mobile-testflight-status
domain-parent-slug: domain/ops-mobile
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/mobile/testflight-status.ts
path: mobile testflight-status
---

# Definition

- **Ops mobile testflight-status** — App Store Connect's processing state for an app's newest uploaded build.

# Help

Report the App Store Connect / TestFlight processing state of the latest uploaded build for a named app by polling the ASC API directly (mints the ES256 JWT from the local .p8 — no ssh, no rebuild). One-shot by default: prints the current state and exits. With --wait it blocks (polling every 30s, up to 30 minutes) until the build reaches a terminal state. Exits 0 on VALID (and, one-shot only, on PROCESSING — a reported fact, not an error); fails loud on FAILED/INVALID with a typed final-line JSON marker. The read-only fact surface for device-check automation that must dispatch on a real processing state rather than a guess.
