---
id: d230f41a-f25f-582d-b83e-85b1cfde67c6
slug: loop-dark-carried-off-inverted
page-type-slug: finding
title: "Loop dark carried off inverted"
domain-slug: barred-meaning/jargon
---

# Claim

`loop-dark` is an undeclared word that has already been carried off in the inverted sense. The code
spends it across 66 tracked files in five packages with one meaning — content that must never reach a
player surface — and no domain declares it. A document outside the code glossed it as the leak it
names the guarantee against, and that reading stood until a seat measured the code. It is the Intent
on `domains/jargon.md` failing against a real reader rather than in principle.

# Evidence

Measured 2026-08-07 in the code repository, tracked files only, `dist/` and `build/` excluded:
`rg -l -i 'loop-dark|loopDark'` returns **66** files — 31 under `packages/alanwalton/awen`, 24 under
`packages/alanwalton/web`, 7 under `packages/alanwalton/tower`, 3 under
`packages/shared/browser-test-harness`, 1 under `packages/agents/shared`.

One sense throughout, and the comments state it. `tower/src/tower/snapshot.ts:5` — "LOOP-DARK: the
emitted state carries only the revealed projection". `awen/src/awen/roll.ts:39` — "the GM surface —
loop-dark, never a client payload". `awen/src/awen/litrpg-adapter.ts:92` — "the loop-dark guarantee
at the read boundary". Hidden from the player, by construction.

The inverted reading is on record. `dirty/maybe-keep/skills/game-design/SKILL.md:20` carries the
glossed line — "`loop-dark` — a surface that leaks state the player was not given" — which is the
failure the code names the guarantee against; the same seat's `SKILL-composed.md:127` records the
correction. A second document, `dirty/skills/litrpg-games/rulings.md`, built a whole entry on the two
usages being an unexplained seam between domains.

Nothing declares it: `rg -uuu -n -i 'loop-dark|loopDark'` over the instructions repo returns hits only
under `dirty/`, there is no `domains/loop-dark.md`, and no glossary names it. `domains/jargon.md` — now
`pages/barred-meaning/jargon.barred-meaning.md`, which defers the judgment to Plain Or Declared on
`pages/domain/global.domain.md` — puts
this in scope at line 17 and its line 21 Intent is what failed — a reader "either takes its plain
sense and is right, or finds it declared as a domain."

`pages/finding/jargon/undeclared-senses-on-the-perimeter.finding.md` measured the 202 files declaring
`domain-slug:` and says outright that `dirty/` was excluded and the code repository was not its
population. This adds what that finding calls unsearchable: a sense actually carried off, twice.

Re-measured 2026-08-27 across akasha, which absorbed the code repository. Still declared by nothing:
`loop-dark` matches no line in any of the 1162 tracked `*.domain.md`, `*.page-type.md`, `*.command.md`
and `*.role.md` pages. The 66 is now 16 tracked files, of which five carry code — `alanwalton/awen-core/src/awen-core.unit.test.ts:157`
("loop-dark — fog-of-war projection") and `alanwalton/tower-core/src/floor-schema.unit.test.ts:62`
("does NOT expose designerNotes on the typed surface (loop-dark)") among them, so the one sense holds —
and five are game attachments under `pages/game/personas/`. Both documents carrying the inverted gloss
are gone, so the correction on record is gone with them.

NOT measured: whether the word should be declared or replaced. Line 15 there says width says nothing
about jargon, so the 66 is entrenchment, not a verdict. That call is a lead's.
