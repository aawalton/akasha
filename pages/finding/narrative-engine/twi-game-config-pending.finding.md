---
id: f2ffa0c0-6f4e-5be4-a714-62800922ba6b
slug: twi-game-config-pending
page-type-slug: finding
title: "Twi game config pending"
domain-slug: domain/narrative-engine
---

# Claim

Creating the canonical TWI game page in Awen (Phase-2 production, replacing the throwaway spike game) is Go-gated by Alan for the Europe window and, as of its last update, was waiting on game-config settlement directly with awen over template pinning, consolidation semantics, and coordinator seat, while the goblin-cluster canon-resolution prerequisite has already been resolved and landed.

# Evidence

Project #14671 (domain: narrative-engine, status: someday_maybe, live-on: deploy). See parent #14666. Carried no objective; capture text moved off retired `notes` on 2026-08-15. Capture cut at a paragraph boundary; below is its head.

SCOPE: create the canonical TWI game page via `bun ops awen create-game` with a proper config (display-config, resolution, mechanics-weight, controlled-entity-kind, coordinator, gm fields), settled with Awen. All 823 chapters commit turns+entities under this one game. Replaces the throwaway spike game.

PARKED someday_maybe 2026-07-05 (Alan): Go-gated, Europe window. Phase-2 production (real game + full-drain replay); not to start until Go is called.

READINESS PREREQUISITES: full 823 drain complete (#14705); goblin-cluster close-reading (rhia's canon call, 9 handles, mob vs individuals); game config settled with Awen.

History:
- 2026-07-09: GOBLIN-CLUSTER PREREQ RESOLVED (rhia ruling over the 111-chapter cache; full ruling in rhia archival memory goblin-cluster-ruling-2026-07-09.md). Merges of several handles into canonical ones (e.g. small-goblin-leader(55) → rags); splits required for goblin-chieftain and goblins (distinct individuals/groups by chapter), via chapter-scoped aliasing. Some links held open pending more drained text. Ruled: chapter-scoped resolution is corpus vocabulary — taken to Awen before implementation.
- 2026-07-10: goblin ruling landed (#14989); proposals mechanism landed-pending-deploy (#14991). Remaining: full drain, Phase B pass, rhia craft-audit, game config with Awen.
- 2026-07-11: prereq cleared — #15152 landed 823/823 valid under full validator suite. Status someday_maybe → exploration (Alan's explicit Go; someday_maybe misstated in-flight work).
- 2026-07-11 (later): hold re-named — #15026/#15155 did not settle config. Settlement in flight with awen: template pinning locus, consolidation semantics, coordinator seat (#15026 reseat doctrine).

Not actively worked; see finding for parent #14666.
