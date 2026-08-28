---
id: ffdfe3ec-f0dd-534b-9bf0-111a69878027
slug: reopen-path-rule-uncarried
page-type-slug: finding
title: "Reopen path rule uncarried"
domain-slug: domain/temper
---

# Claim

Temper's compensating rule for unverified closes is carried in no live document and enforced by nothing.

Alan has ruled that work here does not stall waiting for his play passes, which makes an unverified close legitimate — a departure from Verification on `domains/role.md`. What makes the departure safe is that every such close records its reopen path on its row. That rule stands only in a quarantined document, no verb records a reopen path, and his words are in no other file.

# Evidence

The passage, at `dirty/skills/temper/SKILL.md` lines 103-108, under the heading "When the terminal instrument is unavailable, the close records its reopen path":

"Alan has ruled that work does not stall waiting for his passes — *"assume success on all play verification steps … I'd like to keep moving anyways"* — and the lead's compensating rule is what makes that safe: **every assume-success close records the reopen path on its row.** An unverified close is legitimate; one that cannot be found again is not."

Nothing enforces it. `rg -uuu` for `reopenPath`, `reopen path` and `reopen-path` across `packages/agents` and `packages/shared` returns nothing — ignore rules off because the claim is an absence, scoped to those trees rather than the whole repository. `ops project --help` lists every verb on a project row; none records a reopen path or gates a close on having one.

Nothing states it either. `domains/folders/temper.md` carries `persona-champion-slug: ember`, `code-path: packages/temper/**` and a Definition alone — no Principles, Rules or Tasks. The nearest live rule points the other way: Verification on `domains/role.md` reads "Report only what you verified; where you could not, say so rather than reporting success."

Alan's words appear in no other document. A grep for "assume success" across the instructions tree returns those two lines and one quarantined code document, `dirty/code/packages-temper-game-items-addon-src-claude.md`, which relies on "the in-game assume-success window" as an established constraint without stating the ruling behind it.

The condition is structural rather than spent. `dirty/skills/temper/rulings.md` describes a two-week suspension as one episode of it, and its reconciliation project 14987 now reads `done`; the same source's Scope gives the standing reason — "there is no live agent access to the game client".

Not measured: whether any close has in fact recorded a reopen path, which needs the rows rather than the repository. Which repair is right was not considered.
