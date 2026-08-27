---
page-type-slug: cluster-check
id: ac205d3e-dc57-522e-bbab-3db9d1a72f14
title: "Prometheus rules check"
runner-name: prometheus-rules
script: infra/cluster-checks/src/checks/check-prometheus-rules.ts
image: "debian:bookworm-slim"
closure-policy: import-graph
slug: cluster-check-prometheus-rules
domain-parent-slug: page-type/cluster-check
---

# Definition

- **Prometheus rules check** — Every alerting rule parses under promtool and passes its unit-test fixtures.
