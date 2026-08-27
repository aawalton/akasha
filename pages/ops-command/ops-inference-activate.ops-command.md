---
id: a8b078cb-323a-5842-8aba-bcafd93eb222
page-type-slug: ops-command
title: "Ops inference activate"
slug: ops-inference-activate
domain-parent-slug: domain/ops-inference
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/inference/activate.ts
path: inference activate
---

# Definition

- **Ops inference activate** — one named service loaded on the host, evicting whatever cannot stay loaded beside it.

# Help

Make <name> resident: the traffic cop cold-loads the target and evicts whatever the warm-set rule requires (a warm member keeps its warm siblings co-resident; a non-warm member evicts everything else). The cold load can take up to ~3 minutes for the larger models. Use `ops inference active` to see the resident set.
