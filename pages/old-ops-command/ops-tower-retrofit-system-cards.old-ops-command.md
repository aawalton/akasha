---
id: f161296e-0b8a-56ff-b3ea-d60b752c7f0a
page-type-slug: old-ops-command
title: "Ops tower retrofit-system-cards"
slug: ops-tower-retrofit-system-cards
domain-parent-slug: domain/ops-tower
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/tower/retrofit-system-cards.ts
path: tower retrofit-system-cards
---

# Definition

- **Ops tower retrofit-system-cards** — archived Tower chapter pages' System cards, rewritten to the five-ding progression vocabulary.

# Help

Rewrite the System cards on archived Tower chapter pages to the five-ding progression vocabulary.

Reads + Zod-parses state.json, finds every archived chapter, and for each: reads the chapter page that `ops tower archive` landed in the stories repository, reduces every embedded System card to only its LEVEL UP / SKILL / AFFINITY / CLASS / TITLE dings (dropping XP, kills, attribute allocations, pools, item pickups, floor banners), drops cards left empty, and preserves the one opening Soul Appraisal verbatim. Narrative prose is never touched.

A chapter is matched to its page by story slug and `position`, which is what `ops tower archive` writes.

Idempotent: a re-run on already-reduced cards changes nothing. Writes the body and `ownLength` back through the stories repo's write gate only where the markdown actually changed, and nothing is written to the database.

--dry-run reports each chapter's card reduction (before-count → the resulting dings) without writing.
