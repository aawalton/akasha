---
id: 30d8e6ba-ab50-4c2e-84ea-986514064fc1
slug: a-card-name-rule-cannot-be-unique-across-players
page-type-slug: finding
title: "A card name rule cannot be unique across players"
domain-slug: domain/pages-system
---

# Claim

`idle-persona-card` declares `named-for: "{card-slug}"`, and its own Design says several players hold a card for one persona. The rule therefore cannot produce a unique name: 123 pages over 41 card slugs collide today. `player-id` is declared, required, and carried by all 123.

# Evidence

Measured 2026-08-28 at commit `48aa105e06`, by running the check's own code over `pagesIn` of the working tree and separately by `ops checks audit page-name-unique`, which reported the same population.

`pages/page-type/idle-persona-card.page-type.md:8` states `named-for: "{card-slug}"`. Line 21 of the same file, under Design, states "A card belongs to one player, and several players hold a card for one persona." The rule fills from one key, and that key is by the type's own words not unique.

`card-slug` is declared at `pages/page-property-definition/idle-persona-card-card-slug.page-property-definition.md:6`, so the rule names no undeclared key. The defect is not a missing declaration; the declared key is the wrong grain.

41 groups of `idle-persona-card` pages share a file stem, covering 123 pages. In all 41, `player-id` takes a different value on every page in the group, so it separates every collision with nothing left over. `player-id` is declared at `pages/page-property-definition/idle-persona-card-player-id.page-property-definition.md:6` with `required: true`, and was read from the frontmatter of all 123 colliding pages, none empty.

Pages already sit one folder per player, for example `pages/idle-persona-card/4ee54543-cb30-4f47-a8d0-9269b4b7df76/abby.idle-persona-card.md`, so the distinguishing value stands in the path and not in the name.

Nothing refuses these today: `page-name-unique.check.md:7` carries `check-on-patch: false`.
