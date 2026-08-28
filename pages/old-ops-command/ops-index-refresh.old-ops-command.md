---
id: 58d7cfaa-1653-4768-b1b8-bc064b167856
page-type-slug: old-ops-command
title: "Ops index refresh"
slug: ops-index-refresh
domain-parent-slug: domain/ops-index
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/index/refresh.ts
path: index refresh
irreversible: false
---

# Definition

- **Ops index refresh** — the page index written again from every page there is.

# Design

A refresh takes nothing from the index it replaces into what it writes.

A refresh covers every repository at once; nothing refreshes one of them.

# Help

The write path keeps the index current: every landing rewrites the entries for the pages it touched. This is for when that record cannot be relied on — an index that was never written, one whose files have been removed or damaged, or one left standing across a change to what the index holds.

Every page in every repository is opened and the index is written from what they hold. The old index is read to work out which files differ and which are no longer wanted, but nothing in it reaches the new one, so a wrong entry cannot survive a refresh. That is what separates this from what a landing does: a landing touches only the pages it knows changed, and an entry that went wrong while nothing changed after it stays wrong for good.

What the refresh came to is printed — how many pages, how many identity handles over how many buckets, how many relation entries over how many files — so the reading says what it looked at rather than only that it finished.
