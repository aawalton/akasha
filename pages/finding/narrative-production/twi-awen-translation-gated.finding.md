---
id: 1f768761-65c6-539b-8d8d-955d282178b0
slug: twi-awen-translation-gated
page-type-slug: finding
title: "Twi awen translation gated"
domain-slug: domain/narrative-production
---

# Claim

Translating The Wandering Inn into the Awen narrative-game format was Go-gated by Alan for a Europe vacation-quota token-heavy bulk run, with its machinery complete and only the drain launch (#14705) and Phase-2 production (#14671) left as go-targets, and the last recorded stream state on the row is the awen boundary-settlement discussion still in flight.

# Evidence

Project #14666 (domain: narrative-production, status: someday_maybe, live-on: deploy). Owner: rhia; collaborator: awen. Carried no objective; capture text moved off the retired `notes` attribute on 2026-08-15. Capture was cut at a paragraph boundary; below is its head.

GOAL: translate The Wandering Inn (823 live chapters, 16.8M words) into the Awen narrative-game format, producing whole-cast chapter-level over-time character representation. Alan's goals: character representation for free; learn story structure; forkable LitRPG in favorite worlds.

SPIKE COMPLETE (2026-07-05): format blessed by Awen; VERDICT: run bulk on Haiku (sufficient on hard multi-POV chapters, ~10-15x cheaper than Opus, no canon failures).

ARCHITECTURE: Phase 1 (extract, expensive, Europe-queued unattended run) — all 823 chapters through Haiku, cached per-chapter JSONs, checkpoint/resume. Phase 2 (commit/accumulate, cheap/deterministic) — replay JSONs → game-turns + accumulated entity sheets + sparse chapter-level entity-snapshot wiki rows (new page-type, separate from Awen's canonical-latest entity).

PROVENANCE (Awen-blessed): citation atom src={vol?,ch,beat?}; claim entry {v,src,epi:asserted|claimed,by?}; canon builds only on asserted. Spike game twi-spike-throwaway to be soft-deleted when wrapped. DEPENDENCIES: Awen #14659 (game-turn.src property, held until landed); Awen spine-promotion awaits reader-render capture (outage #14656, resolved).

PARKED someday_maybe 2026-07-05 (Alan): whole stream Go-gated for the Europe window; idle vacation quota is the intended fuel.

STREAM STATE at park: machinery complete (#14668 harness done; #14669 entity-snapshot page-type done, live; #14670 committer+accumulator landing). Go targets: #14705 = full 823 drain (paused 111/823, resumable); #14671 = Phase-2 production (see separate finding).

GO PROTOCOL: activate #14705, relaunch `twi-drain`, arm health-sweep; then rhia's craft audit and #14671 prerequisites.

Not actively worked.
