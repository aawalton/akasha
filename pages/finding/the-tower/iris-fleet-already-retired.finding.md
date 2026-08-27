---
id: c37eb02f-e12d-5412-81f3-9ad1d59ea9d1
slug: iris-fleet-already-retired
page-type-slug: finding
title: "Iris fleet already retired"
domain-slug: domain/global
---

# Claim

The Tower's `iris` helper fleet (iris-prep, iris-code, iris-art) that this row was cut to find new names for was already retired in plan on 2026-07-10 by #15155, which reseated The Tower onto `awen-gm--the-tower`. The live game row and the fleet's own handoff notes confirm zero live `iris` routing, so a renaming definition pass would be answering a question the estate has already moved past.

# Evidence

Project #17564, domain `the-tower`. Cut from #17330's definition hand-back, 2026-08-03, as the successor #17330 criterion 7 requires: #17330 cannot set `persona-campaign`'s `retiredBy` to anything until this row exists. Never defined. Moved here from the row's retired `notes` attribute on 2026-08-15.

#17330 contracts the `persona-campaign` name family. Three live Tower surfaces prescribe names the grammar then refuses: `iris-prep` and `iris-code` (the two campaign tokens #17330 records as still booted), plus `iris-art`, found during #17330's own definition pass in `tower/docs/session-startup.md`, which names the helper fleet "(`iris-code`, `iris-art`)" though `art` is not a declared campaign token. `parseAgentName` (`packages/agents/shared/agent-name-grammar.ts`), run live: `iris-prep` and `iris-code` parse under `persona-campaign`; `iris-art` and bare `iris` return null (refused today).

The framing is falsified: `#15155` — "Reseat the-tower onto game-scoped author seats (awen-gm--the-tower)", done 2026-07-10 under umbrella `#15026` — moved The Tower off `iris` entirely. Verified live: game row `019f10a9-70e7-73fc-b5ea-6f0d29644e7b` carries `coordinatorAgent = awen-gm--the-tower`; `~/agents/iris/litrpg/display/serve.ts:79` routes player actions to `ops seat send awen-gm--the-tower` with zero `iris` recipient strings; `~/agents/iris/litrpg/FLEET-NOTES.md` (iris-manager's own handoff, last flushed 2026-07-10) records FLUSH-THEN-RETIRE: flush complete, retire gated on iris's explicit later signal, not yet given.

Sequencing: #17330 is at `awaiting_worker_claim` and is the reason this row exists; that is not a claim this row's remedy is settled. A definition pass must still settle whether these seats are renamed, retired, or left, and this row prescribes none of those.
