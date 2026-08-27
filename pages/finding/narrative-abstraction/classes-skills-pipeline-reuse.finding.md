---
id: 37080aa5-ebd8-5109-a5ca-7e01ae59a0b3
page-type-slug: finding
title: "Classes skills pipeline reuse"
domain-slug: domain/global
---

# Claim

Extracting Classes and Skills as narrative entities (a catalog, a relational layer, and capability descriptions) is architecturally planned to reuse the chronology-extraction pipeline wholesale, with spell classification needed only to disambiguate other bracketed terms and spell entities themselves explicitly left out of scope.

# Evidence

Alan (2026-07-15): extract Classes and Skills as entities similar to Characters — both the catalog and the relational layer, plus what each skill can do.

Scope (settled via ask-alan 019f6951, answered in persona chat):
1. CATALOG — each class/skill as a page with first-appearance evidence and asserted/claimed provenance.
2. RELATIONAL LAYER — character↔class with level progression (level-up events with src), skill-acquisition events per character.
3. CAPABILITY DESCRIPTIONS — what each skill does, built from prose evidence: narration SHOWING an effect = asserted; a character EXPLAINING a skill = claimed (by named). Canon builds only on the asserted column.

Architecture (inherits the chronology pipeline shape; all landed platform reused):
- Detection is near-deterministic: TWI bracket syntax ([Innkeeper], [Basic Cooking]) matched over the prose cache (~/.cache/awen-ingest/<story>/_prose) gives near-perfect candidate recall. Model passes are reserved for kind disambiguation (class vs skill vs spell vs other bracketed), attribution (who gained/leveled), and capability-evidence capture.
- Per-chapter sidecars in cache (extraction working area) drain to pages (authoritative), schema'd properties via the #15485-87 schema-on-property-definition platform.
- Lexeme-grounding fabrication defense: every occurrence carries a verbatim substring recomputable against prose; zero-match = quarantine.
- Class consolidation/evolution and skill renames are the alias problem — the same chapterRange-scoped alias mechanism as the named-event registry (project #15479).
- Spells: the classifier must recognize them to disambiguate, but spell ENTITIES are out of scope (Alan asked for Classes and Skills only).
- Model tier: Haiku for bulk extraction per the settled cost lever; judgment/rulings stay with rhia.

Project #15563, domain narrative-abstraction, someday_maybe. Carried no objective; captured, never defined. Moved off the retired notes attribute 2026-08-15.
