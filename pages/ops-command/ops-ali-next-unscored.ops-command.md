---
id: ca174fc2-5f73-5e05-ac45-eda2c4d90ee0
page-type-slug: ops-command
title: "Ops ali next-unscored"
slug: ops-ali-next-unscored
domain-parent-slug: domain/ops-ali
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/ali/next-unscored.ts
path: ali next-unscored
---

# Definition

- **Ops ali next-unscored** — the next never-opened leaf of the Book of Everything, in tree order or drawn at random.

# Help

Hand back one leaf node that has never been opened for interview (status == "unopened") — the audit-sweep picker. Draws from the UNOPENED set ONLY, the exact complement of the rotation queue (which resurfaces already-opened live/resting nodes); the two are disjoint by construction. Default: the first unopened leaf in deterministic tree order (a resumable sweep cursor). --random: a uniformly-random unopened leaf (unbiased sampling). --under: scope to a book-root-relative subtree. Output is a single tab-separated line: path<TAB>label<TAB>status.
