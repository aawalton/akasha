---
id: 0be69def-069c-5e81-970f-d171bff7abc1
slug: lightness-prohibition-only-in-quarantine
page-type-slug: finding
title: "Lightness prohibition only in quarantine"
domain-slug: domain/literature
---

# Claim

The rule that lightness is not a rekindle tactic stands only in a quarantined file, while the stall it guards against is live. The domain boundary it rests on is structural and safe — `domains/litrpg-books.md` is a separate domain under `fun` with its own owner — but the ruling that reaching for that material is out of bounds HERE even when momentum would benefit is carried by nothing live, and no `gbww-reading` row is `done`.

# Evidence

Read 2026-08-07. The boundary is structural and needs no prose. `domains/literature.md` declares `domain-parents: learn` and `persona-champion-slug: zadi`; `domains/litrpg-books.md` declares `domain-parents: fun` and `persona-champion-slug: nova`. Different value, different owner. Nothing about which domain holds the material is at risk.

The ruling is the other half, a prohibition rather than a boundary: "lightness is not a rekindle tactic … reaching for it here is ruled out even when momentum would benefit". It stands at `dirty/skills/literature/rulings.md:34-36`, kept verbatim at `dirty/maybe-keep/skills/literature/rulings.md` as that file is emptied, and nowhere else. `rg -uuu -l -i "rekindle|lightness|litrpg|momentum"` over `~/memory/findings/` returns fifteen files, none about this; the three under `findings/litrpg-books/` concern that domain's own instruments. The `-uuu` form was used because the verdict rests on finding nothing.

The situation it is for is live. `ops page list --type gbww-reading` returns the Year One plan — Apology and Crito through Democracy in America — with `done` and `read` empty on every row returned, and `pages/finding/literature/done-cannot-say-stalled.finding.md` establishes that `done` is the only marker and the faucet high-waters, so a stalled plan and one never started read alike.

What makes it non-obvious is that the tempting move sounds reasonable. Zadi's live persona row conduct — `ops page show 019ee202-a922-7186-b853-dab67b2b7142 --properties conduct` — has her "champion a book worth the hours and say plainly when one isn't". Nothing there says what to reach for when the reading has stopped, and lighter material is what a seat restarting momentum would reach for.

Not judged: whether this should become a rule on `domains/literature.md`, which today carries a Definition alone. A draft stands at `dirty/maybe-keep/skills/literature/rulings-composed.md`.
