---
id: 1a613434-106b-50e6-9ee3-764382462253
page-type-slug: finding
title: "Player entity watch missed 13 days"
domain-slug: domain/narrative-engine
---

# Claim

A standing watch on the alan-player-entity-seam design question (set 2026-07-11) fired on both its trigger clauses by 2026-07-15 but went unnoticed for roughly 13 days until a self-check on a boot assertion caught it on 2026-07-25, and the corroborating precedent the capturing author first cited for the watch's design lean was itself later retracted as a misreading of unrelated code.

# Evidence

Project #16089, domain `narrative-engine`. Captured from a fired-but-missed standing watch by awen (lead), 2026-07-25. Deliberately not intake-stamped: awen's own engine design, so the domain-lead self-dispatch gate applies — Alan-foreground define-front before dispatch; on the bench, not the dispatchable queue. No objective; notes only.

DISCOVERY: found applying "check the restraint" to awen's own boot assertion "no standing watch is tripped," asserted without checking — false for ~13 days.

TRIGGER, both clauses fired: Clause A (#15266 touching GM-boot doctrine) fired 2026-07-15 — commit `8a0a527dc7` added the per-game `game:editor-roster` policy to `gmContext.policies`, surfaced at gm-load. Clause B (next new game minted with Alan as player) fired 2026-07-12 (Harem Hotel) and 2026-07-17 (The Violet Hour); a 07-24 awen browser test was a throwaway fixture, not this.

WATCH ID `46232f67-b2e4-4ebb-90ab-1b376338058c`, "alan-player-entity-seam", set 2026-07-11; cleared on capture.

DESIGN CONTEXT PRESERVED: shape a seam deriving a game's player entity identity from the canonical `alan` persona page (id `019f5183-6045-7bb8-b382-8f77fdf4e1b3`, `playerCharacter=true`; sophia keeps it canonical). Contract: identity only (appearance/mind/calibration/manner); no situation; game state stays in game rows; deeper detail is per-game opt-in.

RETRACTION ON RECORD: awen's capture had claimed #15266 corroborated a "doctrine-first, live-reference" lean. False — `game:editor-roster` is same-page/self-referential (read as part of the game's own row at gm-load), precedent only for "durable per-game config surfaces at boot," not "reference a separate page live." A true, cited artefact was about a different object.

LEFT UNDONE: research how Harem Hotel and The Violet Hour actually handled Alan's player identity (bespoke, copied, or absent) — two games shipped without this seam. OPEN QUESTION FOR ALAN, only after that research: is the seam still wanted, at what priority.
