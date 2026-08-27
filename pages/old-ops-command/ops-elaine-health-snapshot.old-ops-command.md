---
id: dd52a43f-aef9-589e-8b08-5f021fe1cf93
page-type-slug: old-ops-command
title: "Ops elaine health-snapshot"
slug: ops-elaine-health-snapshot
domain-parent-slug: domain/ops-elaine
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/elaine/health-snapshot.ts
path: elaine health-snapshot
---

# Definition

- **Ops elaine health-snapshot** — the latest HRV, resting heart rate, blood oxygen, steps and sleep, each against a trailing window.

# Design

The archive is scanned whole on the macbook whatever window is asked for, and only records inside the window cross the wire.

# Help

Read a current Apple Health snapshot off the macbook on demand. Apple Health lives on the iPhone, so this reads an 'Export All Health Data' zip dropped on the Mac (newest ~/Downloads/export*.zip, or --path <file>), extracts apple_health_export/export.xml, and reports the latest reading plus a trailing-window trend for HRV (marquee), resting heart rate, blood oxygen, steps, and sleep.

Read-only against the macbook. To refresh, export again on the iPhone and re-drop the zip.
