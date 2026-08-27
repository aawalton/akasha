---
id: 0cbdf8fe-2f45-5197-a8ec-a843bcd80085
slug: tower-boot-states-brackets-both-ways
page-type-slug: finding
title: "Tower boot states brackets both ways"
domain-slug: domain/narrative-engine
---

# Claim

The-tower's GM boot document tells the GM both that square brackets are the out-of-character marker and that the bracket convention was superseded. `ops awen gm-load --game the-tower` emits `doctrine:ooc-feedback` — "A whole player message wrapped in square brackets (trimmed) is out-of-character feedback addressed to you" — and 63 lines later the game's locked spec: "No brackets … (Superseded: the old `[brackets]` = step-out convention.)" Both sit in one document, and nothing says which is current.

# Evidence

Read from the LIVE ROWS on 2026-08-08, not from the repo: `ops awen gm-load --game the-tower`, exit 0, 313,294 bytes. A code search would have found the seed instead — `packages/alanwalton/awen/src/awen/doctrine-pack-seed.ts:246` — and a seed is not the live value of something the estate tunes as data.

Line 37, the doctrine pack: "[doctrine:ooc-feedback] … A whole player message wrapped in square brackets (trimmed) is out-of-character feedback addressed to you, the GM — meta, not an in-world action., Adjust or answer bracketed feedback OUT OF BAND: never narrate it as an in-world action, never voice it as the PC, never let it enter a turn package as the player's action."

Line 100, same document, under "Locked spec (from Alan, 2026-06-24)": "**Immersion / operating model (revised 2026-06-24):** … **THIS chat session is the BACKCHANNEL** … No brackets: everything in the backchannel is meta, everything via messages is in-story. … (Superseded: the old `[brackets]` = step-out convention.)"

The code sides with the doctrine, so the locked-spec parenthesis is the stale half. `classifyActionBarMessage` (`packages/alanwalton/awen/core/src/action-bar-message.ts:36`) is applied at `packages/alanwalton/web/app/awen/lib/session-envelope.ts:190` and `components/action-box.tsx:120`, tagging a whole-bracketed message `kind: "feedback"` on the served envelope and the optimistic echo. That path postdates the spec: the doctrine names #14583, the spec is dated 2026-06-24.

The boot document carries no date ordering and no precedence rule between a doctrine band and a game's locked spec.

Nothing reports it: `ops enforcement list` (232 mechanisms) names nothing comparing a doctrine band against a game's gmContext. No standing finding covers it — `rg -l -i "bracket|ooc|out-of-character"` over `~/memory/findings/` returns two files, neither about this.

Not established: whether other games' locked specs carry the same line. I read only the-tower.
