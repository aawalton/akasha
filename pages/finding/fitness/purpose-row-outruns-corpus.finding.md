---
id: a1922517-00dc-563d-be5e-33be8e131471
slug: purpose-row-outruns-corpus
page-type-slug: finding
title: "Purpose row outruns corpus"
domain-slug: domain/fitness
---

# Claim

Aelwyn's persona row states a subject the corpus does not: her `purpose`, printed by `ops persona roster`, reads "Fitness coach — training and weight, planned and actually kept", while both instruction documents name training alone — `domains/fitness.md` defines fitness as "the training Alan actually keeps" and `domains/personas/aelwyn.md` defines her as one "who coaches Alan's training". Weight is named as half her subject only by the row.

# Evidence

Measured 2026-08-07 while ingesting `dirty/skills/fitness/rulings.md`, whose weight entry opens "The domain names itself 'training and weight'". That clause is true of the row and false of both documents.

The three statements, read today:

- `ops persona roster` prints `Aelwyn · aelwyn · Fitness coach — training and weight, planned and actually kept.` Its help says the roster is "derived from the persona rows", and names `purpose` among the three founding fields (portrait, purpose, voice). The sentence is row data.
- `domains/fitness.md:10` — "**Fitness** — the training Alan actually keeps."
- `domains/personas/aelwyn.md:11` — "**Aelwyn** — an elven princess crossed into this world, who coaches Alan's training."

Row-borne rather than sourced: `rg -uuu -n "Fitness coach"` across `~/code` outside `dist` and `node_modules` exits 1, so a code search for the value returns nothing while the value is live.

`packages/agents/shared/persona-facts.ts` draws the boundary this sits across: "The corpus answers who she is and where she works; the table answers the rest." It names what stays row-borne — "`playerCharacter` and `role` are what remains row-borne, and neither has any representation in the corpus at all" — and records the incident behind the rule: "The domain used to be row-borne too, and the drift that cost was the reason it moved." A one-line purpose naming her subject is a who-she-is fact by that boundary. `checks/domain-edges.ts` holds `championed-domain:` and `persona-champion-slug:` bijective; nothing compares `purpose` against either document.

Where the row line is already load-bearing: `pages/finding/fitness/weight-has-no-series.finding.md` opens "Weight is half of the fitness domain's own stated subject", citing the roster line for that half.

Not established: which side is right. This compares three current states and holds no history, so whether the row outran the documents or they narrowed deliberately is not readable from here.
