---
id: 0d706a1b-d25e-52cf-a62f-f715a484b4af
page-type-slug: finding
title: "Gm boot routes are all dead"
domain-slug: domain/narrative-engine
---

# Claim

Every markdown path the GM boot document routes a seat to is dead. Five distinct paths stand in the text `ops awen gm-load` serves at boot; none resolves in the code repository, and all five sit under quarantine, binding nobody and queued for their own emptying. The standing whole-repo findings on dangling pointers do not reach this: each scopes itself to a comment or a docblock, on the stated ground that nothing walks a cited path. Here the reader is an agent that was told to go there.

# Evidence

Measured 2026-08-08, first-hand, in `~/code` at the current HEAD.

`packages/alanwalton/awen/core/src/gm-boot-sections.ts` cites five distinct markdown paths: `docs/craft/author-editors.md`, `docs/loremaker.md`, `docs/loremaster.md`, `narrator.md`, and `packages/alanwalton/awen/docs/gm-fleet.md`.

Matching each by base name against `git ls-files` over the whole code repository — deliberately generous, since it ignores the directory the path names — returns zero tracked files for all five.

All five stand under `dirty/code/` in the instructions repo as flattened quarantine files, one apiece, and none has a live counterpart under `domains/`. Quarantine binds nobody, and each is queued for its own emptying, so following one today reaches text that is about to stop existing.

`gm-boot-sections.ts` is not dead text. `gm-boot-compile.ts` imports it and the sections are compiled into what `ops awen gm-load` serves a GM at boot.

Why the standing findings do not cover it. `pages/finding/code-repo/docs-pointer-perimeter-empty.finding.md` carries the whole-repo denominator at 519 files, and its siblings `quarantined-doc-references-dangle.md` and `docs-citations-dangle-in-link-form.md` carry the rest. Each rests on the pointer being a docblock or a comment that tells a reader a flow exists, and on nothing in the repository walking a cited path. That framing is right for those populations and excludes exactly the case with a reader.

`pages/finding/narrative-engine/gm-boot-spawns-dead-slash-prompts.finding.md` already draws this distinction in the same file, for four spawn calls whose prompt is an unresolvable slash command — those sit "inside an INSTRUCTION TO ACT, so following the text produces running seats rather than a dead link". Its Claim is bounded to the spawns and its Evidence bounds that population as complete. The document routes are the other half of the same surface, and no document holds them.

Not measured: whether any GM has followed one of the five. There is no record of a boot document being read, only of it being served.
