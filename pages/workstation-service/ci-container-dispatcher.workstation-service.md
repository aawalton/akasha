---
id: 0ecbfe46-61de-51f9-9d83-c6be0da02df5
page-type-slug: workstation-service
title: "CI container dispatcher"
slug: ci-container-dispatcher
domain-parent-slug: page-type/pipeline
required-reading-slugs:
  - page-type/workstation-service
runs:
  - env CI_STICKY_PINNING_ENABLED=1 bun services/ci-container-dispatcher.ts
enabled: true
restart-delay-seconds: 10
---

# Definition

- **CI container dispatcher** — the service that places a step waiting to be dispatched into a container on the cluster.

# Design

A step's `definition` is a mapping, which a query does not return, so it is read from the sidecar.

A `definition`'s inner keys are spelled as page keys are.

Nothing here takes a step past `launching`.

A capacity read that fails admits nothing that tick.

A container this created is charged against its node's room until the cluster reports it or five minutes pass.

A step reads its workspace off the node's own disk, so every step of one pipeline is bound to the node its preparation ran on.

# Intent

Something carries a step from `launching` to its verdict.

Every service a pipeline takes runs from the workstation, at which point this is enabled and CI runs again.
