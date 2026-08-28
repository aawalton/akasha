---
page-type-slug: finding
title: "A page type states its key twice and disagrees"
domain-slug: domain/page-types-system
---

# Claim

`idle-persona-card` states a two-part key in prose and a one-part key in the field that runs.

`pages/page-type/idle-persona-card.page-type.md:21` says, as a Design line, "A card belongs to one player, and several players hold a card for one persona." That names the pair — player and persona — as what identifies a card. Line 8 says `named-for: "{card-slug}"`, which is the persona alone. Line 9 already carries the missing half, `owner-slug: player-id`, so the page type holds every piece of the true key and addresses by half of it.

On disk that is 41 card slugs, three player folders, 41 cards in each, 123 pages, and all 41 slugs present in all three folders. Every one of the 41 addresses names three distinct pages. Which page a lookup by address returns, or whether it refuses, I did not measure.

Nothing refuses this. `pages-named-as-stated` sees it and reports it, in its own words — "one filled name is one page, so these are distinct pages sharing an address" — and exits 0, because over the whole corpus it is advisory. So the observation has been available in a check's output for as long as the check has run, and nothing was going to turn it into a decision.

The mechanism is the part worth keeping, because it is not about this page type. **A page type carries its key twice: once as prose in Design, once as a pattern in `named-for`. Only the second is machine-read, and nothing compares them.** Where they disagree the prose is the one that is right, because a person wrote it knowing the domain, and the pattern is the one that runs. A page type in that state documents its own defect and reads as complete — the Design line that contradicts the field looks like helpful context rather than a contradiction, and a reader who notices both has to hold them side by side to see it.

That is worth checking for mechanically rather than noticing. Where a page type names an owner and its `named-for` does not include it, the page type is claiming a key it does not address by.

# Evidence

Measured 2026-08-28 by seat astra, on `main` at a clean working tree.

`pages/page-type/idle-persona-card.page-type.md` read whole, 25 lines. Line 8 `named-for: "{card-slug}"`; line 9 `owner-slug: player-id`; line 21 "A card belongs to one player, and several players hold a card for one persona."

Three folders under `pages/idle-persona-card/`, named `4ee54543-cb30-4f47-a8d0-9269b4b7df76`, `9ba554f7-cb18-48bb-a709-ec935a895ca7` and `e62e5a30-9879-40dd-be89-27b17f89ddd5`. Each holds 41 files. Taking every file name across the three and grouping: 41 distinct names, each appearing exactly 3 times, no name appearing once or twice. 123 pages over 41 addresses.

`bun run tools/run-checks.ts pages-named-as-stated` exits 0 and reports `advisory`, with `23439 of 23442 covered page(s) carry the name their file does, across 109 convention(s), over 59024 page(s)`. Its per-item list shows 12 `idle-persona-card` entries and says "and 34 more"; every entry shown carries `is named ` + "`{card-slug}`". Whether the remaining 34 are all this page type I did not establish, because the output is truncated and I did not widen it.

Not measured: what a lookup by one of the 41 addresses actually returns, and whether any code reads a card by address rather than by path. Both would change how much this costs, and neither changes that the key is stated twice and disagrees with itself.
