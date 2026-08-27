---
id: bdf7fbd5-6877-500c-b80f-4f598294423c
page-type-slug: old-ops-command
title: "Ops wan score"
slug: ops-wan-score
domain-parent-slug: domain/ops-wan
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/wan/score.ts
path: wan score
---

# Definition

- **Ops wan score** — each frame's ArcFace cosine against a reference identity, with a same-identity floor.

# Help

ArcFace identity score for each harvested frame vs a reference identity image — insightface buffalo_l normed-embedding cosine, the same metric and 0.45 same-identity floor as ai-toolkit's dataset-select.py, so scores feed the dataset-selection pipeline directly. Runs the scorer inside a one-shot wan:local container (the immutable host carries no insightface stack; ArcFace runs fine on CPU, so no GPU device is attached) with the frames and reference dirs volume-mounted. TSV `frame\tcosine\tpass` on stdout, summary diagnostics on stderr.
