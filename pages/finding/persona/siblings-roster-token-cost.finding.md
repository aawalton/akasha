---
id: 365df83f-3299-5dc4-97a1-bdad06e40a35
slug: siblings-roster-token-cost
page-type-slug: finding
title: "Siblings roster token cost"
domain-slug: page-type/persona
---

# Claim

The `## Siblings` roster rendered into every persona load (`renderSiblings` -> `renderBullet` in `packages/alanwalton/personas/core/src/siblings.ts`) carries each sibling's full, untruncated purpose text, and its token cost scales linearly with the number of personas rather than with any individual row's length.

# Evidence

Project #15908, domain `persona`, status `someday_maybe`, `live-on: commit`.

Surfaced by Natalie (2026-07-24) during the persona-purpose voice cleanup, with numbers; captured by sophia rather than acted on, because it is a design-direction question for Alan, not a checkably-right fix.

Measured (live, 41 personas with purpose set): whole roster = 16,974 chars ≈ 4,243 tokens carried in every persona load — roughly half of an ~8k compiled load. Median purpose 427 chars, max 907 (astra).

The cost is structural, not a few long rows. A per-row length norm capping everything over ~500 chars would save only ~260 tokens per load (~3%); astra's excess over median is ~120 tokens (~2.8% of the roster block). The term that grows is 41 rows × 427 median, linear in roster size — every persona added costs every other persona's load. A length norm optimizes the wrong term; trimming individual mandates was rejected as editorial preference rather than a correctness fix.

Real question raised: does every persona need every sibling's full purpose in-load, or would name + value + domain suffice, with the full purpose available on demand?

Tension recorded, both sides real: linear scaling argues for trimming (the roster block is already ~half the load and grows with every persona); against, the section's stated contract is that each persona knows a sibling "at a glance (name, value, and what she is for)" so a message "lands as a recognized sibling, not a stranger" — cutting to name+value+domain loses exactly the "what she is for" the 2026-07-24 cleanup was fixing, and the module states its design intent as key-vs-chunk, "concision protects the context budget."

Not urgent: nothing broken; a scaling question that sharpens as the roster grows. Wants Alan's design call, not a unilateral change.
