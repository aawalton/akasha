---
id: 3e061d6b-0d4f-58ff-b346-5c1132c445ce
page-type-slug: old-ops-command
title: "Ops ali pending"
slug: ops-ali-pending
domain-parent-slug: domain/ops-ali
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/ali/pending.ts
path: ali pending
---

# Definition

- **Ops ali pending** — the Learn points the books repo's unlanded commits would earn, against today's thresholds.

# Help

Preview the pending Learn points — the net new markdown bytes the committed-but-unmerged commits would earn once they land, scanned per commit via `git log -p origin/main..HEAD` over book-of-everything/**/*.md in the books repo and floored per commit (each `max(0, added − removed)`, then summed — so a compression commit contributes zero and never cancels a scoring commit). Answers 'keep going or switch' mid-cycle, before a deploy is the first time the points register. Reports it threshold-relative: pending points, which Learn daily stoplight tier they'd reach today (4-tier ladder: >=100 red, >=1,000 yellow, >=10,000 green, >=100,000 blue) and how far to the next tier, plus current -> projected progress toward the next wallpaper and relationship level.
