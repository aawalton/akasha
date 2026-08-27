---
id: 1191510a-b646-5ac3-8832-438620b379a1
slug: value-axis-says-fun-and-learn
page-type-slug: finding
title: "Value axis says fun and learn"
domain-slug: domain/chess
---

# Claim

Chess sits under Fun in the instructions estate and under Learn everywhere else, and nothing adjudicates it. `domains/chess.md` declares `domain-parents: fun`, while Erin's persona row is linked to the Learn value, the note on her in Alan's own corpus calls her his coach "on the Learn axis", and her persona spec says the same. A reader asking which value chess serves gets two answers depending on which surface they reach first.

# Evidence

Measured 2026-08-07 while emptying `dirty/skills/chess/SKILL.md`, whose `# Scope`
section states "Chess is hers end to end within the Learn value" — a claim the
live instructions tree contradicts and three other live surfaces confirm.

Fun, one surface. `domains/chess.md` carries `domain-parents: fun` and
`persona-champion-slug: erin`. `domains/fun.md` is "the games, stories and arts Alan
plays, takes in and makes", under `alan-values`. Its siblings there are
`anime`, `game-design`, `litrpg-books`, `performance-arts`, `visual-arts` and
`folders/stories-repo`; `literature` and `mathematics` are the two that sit
under `learn` instead.

Learn, three surfaces. Erin's persona row links the value page
`019eb7d1-0072-7909-a9a7-6fa76806f067`, whose `valueProp` is `learnLevel` and
whose description is "Learn represents my progress towards understanding truth
in all domains of knowledge". `~/books/all-about-alan/personas/erin.md:11` — a
document written in Alan's own corpus — says "Erin is Alan's chess coach on the
Learn axis… She serves the **Learn** value."
`packages/alanwalton/personas/core/src/persona-specs/erin.persona.ts` is the
third.

The two keys are not the same claim, which is why neither instrument reports
this. `domain-parents:` is a read obligation — what a reader must read before
acting there — and `ops persona set-value --help` says its link "records which
value axis a persona serves (provenance for her reward images' value field); it
does NOT gate rewards". So both can stand without either being wrong, and
`checks/domain-edges.ts` reconciles `persona-champion-slug:` against `championed-domain:`
rather than either against a value. Nothing holds the pair at once.
