---
page-type-slug: cluster-check
id: b3b4fcb2-00c5-5f97-b9fb-2c0a4aab02bb
title: "Start script check"
runner-name: start-script
script: infra/cluster-checks/src/checks/check-start-script.ts
dispatch-node-types:
  - kind: ts-file
  - kind: package
slug: cluster-check-start-script
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Start script check** — A container declared to run bun run start belongs to a workspace holding a start script.
