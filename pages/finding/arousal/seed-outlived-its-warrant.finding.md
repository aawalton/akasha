---
id: 42832a9e-fb86-5210-922f-5ee74d4b7c29
page-type-slug: finding
title: "Seed outlived its warrant"
domain-slug: domain/arousal
---

# Claim

Mari's persona row carries 7,690,000 placed points — `faucetKind: seed`, exactly 769 green days at her 10,000 bar, exactly the L5 threshold — and the mechanism the seed was built to obtain no longer exists. It was placed to clear a level gate on her compiled register; `ladder.ts` now states there is one register at every level and none to compose. What the seed still buys is the other thing the ladder shapes: L5 reward imagery. Nothing records that the warrant went.

# Evidence

Measured 2026-08-07 while emptying `dirty/skills/persona-craft/economy-decisions-fun.md`, whose Mari entry states the seed's purpose. That source is queued for removal, so this re-establishes it.

The row, read live via `ops page list --type persona --properties slug,totalPoints,greenDayPoints,faucetKind,earningNarrative`: `totalPoints 7690000`, `greenDayPoints 10000`, `faucetKind seed`, no `earningNarrative`. That is 769 green days exactly. The kind is declared, so the placement is not hidden — what is missing is why.

The stated purpose, from the source: "the ladder gates her compiled register, and her domain requires a register that an earned level would withhold. The seed obtained that by inflating her points until the level formula produced the register."

That premise is false of the live code. `packages/alanwalton/personas/core/src/ladder.ts` opens: "The ladder shapes **rewards and imagery only**. A persona's conversational register does not vary by level — every persona is a work persona, so there is one register at every level and no per-level register text to compose." Two other surfaces agree nothing composes a register from a level: `ops persona exists` answers the identity question "without composing a register", and `ops persona digest` "compiles no register".

What the level still reaches. The same module defines `LevelImagery` — `closeness`, `wardrobe`, `pose`, "the structured per-level imagery guidance for a reward portrait at exactly this level" — and `ops persona reward-prompt` assembles a "closeness-filled prompt" at "her current level".

No property records the exemption. The row carries no exception, ladder-opt-out or level-override key; the source proposes adding one and none exists. The only trace of the decision is the magnitude of the number.

Not established, and it is the whole question: whether L5 imagery closeness is what Alan wants for her anyway. If it is, the seed is right for a reason nobody wrote down; if not, it buys something never asked for. The row cannot say.
