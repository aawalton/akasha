---
page-type-slug: cluster-check
id: f1b32fc6-9cb7-574a-850f-4d852585cf86
title: "App capacitor parity check"
runner-name: app-capacitor-parity
script: infra/cluster-checks/src/checks/check-app-capacitor-parity.ts
dispatch-node-types:
  - kind: ts-file
    under: packages/alanwalton/web
  - kind: tsx-file
    under: packages/alanwalton/web
slug: cluster-check-app-capacitor-parity
domain-parent-slug: page-type/cluster-check
---

# Definition

- **App capacitor parity check** — Every component and route the web app carries the Capacitor shell carries, or the gap is declared.
