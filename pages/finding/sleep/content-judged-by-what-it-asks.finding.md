---
id: 781ac324-e2cb-550c-bea8-90ae9b079bca
slug: content-judged-by-what-it-asks
page-type-slug: finding
title: "Content judged by what it asks"
domain-slug: domain/sleep
---

# Claim

Content authored for Alan at the edge of sleep is judged by what it asks of him, never by what it offers him. Four rulings converge on it, and each rejected thing was rejected for WORKING as content: direct address (a reassurance is an instruction, and an instruction is a demand), progress salience, switch density, and ornamented prose (a line good enough to quote is a wake-up). Nothing in the instructions tree, in `~/books/all-about-alan` or in this corpus states the criterion.

# Evidence

The judgment, in the lead's own words. `dirty/skills/sleep/SKILL.md`, emptied 2026-08-07: "Four separate rulings — direct address, progress salience, switch density, ornamented prose — converge on one criterion, and each rejected thing was rejected for *working* as content. What a piece gives him is not the question. What it asks of him is." Alan's verbatim on the piece that broke the first: content about him "is too much stress." His phrase for the passing state is "window-pane prose": the words disappear and leave only the content.

What the corpus carries. `rg -uuu -n -i "asks of him|second.person|reassur|window.pane|ornament|admire"` over `pages/domain/` returns one line, `pages/task/author-persona-scene.task.md:33` — "The tense is load-bearing rather than stylistic: it never asks the reader to recall or picture anything." That is the same idiom for a different product and a different constraint, grounded in aphantasia rather than in wakefulness. `domains/sleep.md` carries one Definition line. The same search over `~/memory/findings/` returns three files, none about this.

The nearest live carrier is in the code repo, which filter 2 does not count and which is narrower anyway. `packages/alanwalton/personas/core/src/persona-specs/ione.persona.ts:38` sets her conduct: "The failure mode is content that wakes him up: anything suspenseful, demanding, or escalating works against the one job." Reassurance is none of those three, and neither is a polished image — so the two rejections that are hardest to predict are the two it does not reach.

Why it needs stating. The default a model reaches for when asked to write someone to sleep is reassurance, address by name and a lovely closing image. Each is good content and each is a wake-up, so the mistake arrives looking like care. The product is live: `alan/persona/ione.persona.md:16` declares `championed-domain-slug: sleep`.

`-uuu` throughout; bare `rg` reaches only tracked, non-hidden files.
