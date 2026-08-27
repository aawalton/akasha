---
id: e4f174a6-f23b-5619-852f-9e3ff3a0a42f
page-type-slug: ops-command
title: "Ops inference apply"
slug: ops-inference-apply
domain-parent-slug: domain/ops-inference
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/inference/apply.ts
path: inference apply
irreversible: true
---

# Definition

- **Ops inference apply** — the declared services reconciled onto their host, with anything no longer declared torn down.

# Help

Reconcile the declared inference services (src/registry.ts) onto their non-cluster host over SSH.

Full-fleet and declarative: applies every service whose content hash is absent/stale, skips up-to-date ones, and FULLY tears down any managed resource on the host that is no longer in the registry (launchd job + plist + code/weights dir + conda env). Runs workstation-side (the only tailnet-reachable place). Idempotent — an unchanged fleet is a no-op.
