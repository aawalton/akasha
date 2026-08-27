---
id: b4c23e12-b185-5e98-aa76-fa8a337556f7
page-type-slug: old-ops-command
title: "Ops ali random-leaf"
slug: ops-ali-random-leaf
domain-parent-slug: domain/ops-ali
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/ali/random-leaf.ts
path: ali random-leaf
---

# Definition

- **Ops ali random-leaf** — a uniformly-random sample of Book of Everything leaves, by status, drawn without replacement.

# Help

Draw uniformly-random leaf node(s) from the Book of Everything tree using real OS entropy (an unbiased randomInt), without replacement. A leaf is a node directory — one carrying a profile.md — with no child node directories. Default draws one unopened leaf, so already-scored leaves drop out for free. Output is one tab-separated line per leaf: path<TAB>label<TAB>status. Unlike `ops ali next-unscored`, which hands back a deterministic sweep cursor, every draw here is a fresh sample.
