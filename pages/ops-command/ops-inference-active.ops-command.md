---
id: b6ec4b56-1e07-5418-91fd-99bb7266564e
page-type-slug: ops-command
title: "Ops inference active"
slug: ops-inference-active
domain-parent-slug: domain/ops-inference
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/inference/active.ts
path: inference active
---

# Definition

- **Ops inference active** — the model services loaded on the host right now.

# Help

Print the inference pool's currently resident services — the models loaded on the host right now (the warm set may co-reside, e.g. moss-tts + image-gen) — by querying the traffic cop's admin API over SSH. Read-only.
