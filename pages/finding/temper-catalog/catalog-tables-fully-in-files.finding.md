---
id: 10193249-ecb2-5a5f-b96e-41ceee11f2ef
page-type-slug: finding
title: "Every catalog table is backed by files across all 45 page types, so that Intent entry should leave outright"
domain-slug: domain/temper-catalog
---

# Claim

"Every catalog table is backed by files" is now true and should leave Intent outright. All 45 page types standing under this domain hold zero live rows, and no live page-type row remains for any of them. Forty-two declare a `files:` glob into `instructions:temper/<table>/*.md`; the other three declare `files: none`, which is how a table held in a parent's `data: jsonl` sidecar is spelled rather than an absence of backing.

# Evidence

Measured 2026-08-20T14:47-14:58Z, RUN with psql and against the file tree.

The 45 page type files naming `temper-catalog` among their domain parents each returned 0 from `select count(*) from public.pages where page_type_slug = <slug> and deleted_at is null`. They are temper-activity-category, temper-affix-script, temper-alliance, temper-armor-enchant, temper-armor-slot, temper-armor-trait, temper-armor-type, temper-armor-weight, temper-buff-major, temper-buff-minor, temper-buff-other, temper-catalog-domain, temper-character-role, temper-class, temper-companion, temper-companion-activation-buff, temper-companion-armor-slot, temper-companion-base-role, temper-companion-equipment-quality, temper-companion-jewelry-slot, temper-companion-passive-metric, temper-companion-role, temper-companion-skill-line, temper-companion-skill-slot, temper-companion-trait, temper-companion-weapon-role, temper-companion-weapon-slot, temper-companion-weapon-type, temper-comparison-op, temper-completion-category, temper-curse, temper-debuff-major, temper-debuff-minor, temper-debuff-other, temper-dungeon, temper-eso-companion-equipment-constant, temper-eso-player-equipment-constant, temper-eso-trait-map, temper-focus-script, temper-grimoire, temper-grimoire-script, temper-inventory-currency, temper-item-category-tree, temper-metric-effect, temper-quality-value.

Forty-two declare `files: instructions:temper/<table>/*.md`. The three declaring `files: none` are temper-grimoire-script, temper-metric-effect and temper-quality-value.

At 14:58:45Z the whole `pages` table held 41 live rows across two page types — property-definition 39 and page-type 2 — so no catalog table has a row of any kind left, and no live `page-type` row names one. That count was 11 page types at 14:41Z and 6 at 14:45Z, so it is a reading at one moment.

I did not exercise Temper against these tables, so I am reporting where the catalog stands rather than that the simulator reads it correctly from there.
