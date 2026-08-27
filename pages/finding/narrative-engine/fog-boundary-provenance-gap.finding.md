---
id: 90a8ac9b-a127-5c7d-b918-8ffb87046128
slug: fog-boundary-provenance-gap
page-type-slug: finding
title: "Fog boundary provenance gap"
domain-slug: domain/narrative-engine
---

# Claim

Claims and provenance in the Awen narrative engine cannot cross the fog (revealed-sheet) boundary today, so claimed-vs-asserted epistemic status and source citations are invisible or render raw on every player surface; the recurrence trigger for building a fix has already fired once (TWI goblin-cluster handles) and was ruled ingest-side rather than engine-side, so the trigger stays armed pending a second consumer or a non-chapter-keyed resolver fragment.

# Evidence

Project #14680 (domain: narrative-engine, status: someday_maybe, live-on: deploy). Carried no objective; this is its capture text, moved off the row's retired `notes` attribute on 2026-08-15.

Captured from #14659 / TWI spike findings (2026-07-05), parked pending recurrence evidence (Rule of Three — same trigger as spine promotion of the claim-bearing entry convention).

PROBLEM: claims and provenance cannot cross the fog boundary today. RevealedSheetSchema's `.strip()` allowlist (name/kind/level/class/attributes/skills/affinities/equipment/inventory/titles/derived) structurally drops identity + prov fields; claim-bearing entries {v, src, epi, by?} survive only inside array slots and render raw in the reader's sheet panel (caveat already sent to rhia). Claimed-vs-asserted epistemic status and source citations are invisible or ugly on every player surface.

SCOPE WHEN ACTIVATED (with spine-promotion): how claims/provenance cross the revealed boundary — allowlist extension vs a projection folding epi/src into display form; reader sheet-panel rendering; loop-dark audit (never leak gmOnly via prov fields).

ACTIVATION TRIGGER: recurrence evidence from the TWI bulk run (Phase 2 committer writing claim-bearing entries at scale) or a second game adopting the convention.

2026-07-09: recurrence trigger fired and resolved ingest-side (awen ruling to rhia). TWI goblin-cluster found two handles covering multiple referents (goblin-chieftain ch3-17 vs ch55; goblins = three distinct groups). Rhia's fix is chapter-scoped aliasing ({handle, chapterRange} → canonical id) in her committer-resolver. Ruled ingest-side: the scoping key (chapterRange) is corpus vocabulary the engine cannot express — an engine-side canonical-handle keyed on chapters would leak ingest vocabulary (Ubiquitous Naming). Trigger stays armed; refined promotion condition: a second consumer needing handle→id resolution, or a resolver fragment that is not chapter-keyed.

Not actively worked.
