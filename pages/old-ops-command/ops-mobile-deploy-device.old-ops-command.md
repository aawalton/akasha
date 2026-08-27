---
id: 6cd71476-65f4-54eb-a223-874cffe17da3
page-type-slug: old-ops-command
title: "Ops mobile deploy-device"
slug: ops-mobile-deploy-device
domain-parent-slug: domain/ops-mobile
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/mobile/deploy-device.ts
path: mobile deploy-device
irreversible: true
---

# Definition

- **Ops mobile deploy-device** — a Debug build of an app's iOS shell, made on the macbook and installed to a named iPhone.

# Help

Build a Debug dev build of a named app's Capacitor iOS shell on the macbook and install it to the connected iPhone (Path A, proven 2026-06-29). Drives `ssh macbook` end-to-end: unlock the codesigning keychain, regenerate the native project (unless --no-sync), xcodebuild, verify signing, and `devicectl` install. Reuses the shared `ops mobile` foundation.
