---
id: 24cfeb2e-9e62-568f-8ff8-80f78fcfa161
page-type-slug: old-ops-command
title: "Ops inference plan"
slug: ops-inference-plan
domain-parent-slug: domain/ops-inference
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/inference/plan.ts
path: inference plan
---

# Definition

- **Ops inference plan** — what a reconcile would apply, skip and tear down on each host, with nothing written.

# Help

Print the inference reconcile plan (apply / skip / prune) for every declared service without executing anything. Queries actual host state and computes the plan, but performs no apply or teardown.
