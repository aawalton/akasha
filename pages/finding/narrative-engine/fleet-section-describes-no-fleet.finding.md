---
id: 9b6a6cf0-b1c9-52f4-aa3e-79cc660a1caf
slug: fleet-section-describes-no-fleet
page-type-slug: finding
title: "Fleet section describes no fleet"
domain-slug: domain/narrative-engine
---

# Claim

The Fleet section a game master is served describes an invocation layer that does not exist: loop-dark seats invoked as slash commands, per-game editor seats, a resident loremaster and loremaker. Every `ops` command behind them still works, so the capability is live under a dead way of reaching it. The gating route it documents for partners-ii, the one live game requiring a per-turn gate, is among what was removed.

# Evidence

Measured 2026-08-16 by project #19286 and verified independently by #19282's manager.

The Fleet section is the largest prose block in `gm-boot-sections.ts`. It describes three loop-dark seats invoked as slash commands, six editor seats spawned per game, a resident loremaster and a resident loremaker. There is no skills directory in the instructions repository at all. `awen-resolver`, `awen-loremaker`, `awen-turn-gate`, `awen-editor` and `awen-loremaster` exist nowhere as commands. The document paths the section cites resolve nowhere.

What does still exist is every `ops` command behind them — resolve, roll, gate-turn, request-reviews, lore, design and the rest. Nothing reports unhealthy, because nothing is broken; only the documented route to it is gone.

Gated Publish carries the same dead prose plus a live edge. `gate-turn` stamps the gating seat's ambient identity as the verdict author and refuses the record where it equals `draftAuthor`, so a distinct identity is required by design. The seat the section names as supplying it, `awen-turn-gate--partners-ii`, does not exist, and neither does the command that produced it. Checked row by row, partners-ii is the only one of the five live games carrying `requiresPerTurnGate`.

Two limits on that, stated by the seat that measured it. `gate-turn` was not run: it writes against a live game, so what it lands on was read rather than tried. And the refusal keys on the gating seat's identity rather than on the route, so any distinct identity could still gate. The accurate claim is that the described flow is unrunnable as described, not that the game cannot be gated at all.

partners-ii was last touched 2026-07-15 and stands at two turns in session 1, so nobody is blocked today.

Of the roles the section names, only `loremaster` carries a document in the instructions repository, at a single Definition line.
