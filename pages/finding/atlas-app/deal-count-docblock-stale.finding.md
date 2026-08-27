---
id: f18de870-6fa0-5cdc-9457-7cf7f1cee602
page-type-slug: finding
title: "Deal count docblock stale"
domain-slug: domain/atlas-app
---

# Claim

The Starving Student Card importer's docblock states a deal count that running the importer disproves. `import-ssc-card.script.ts:8` says the raw files load to 418 keyed deals; the script prints 417. The number that was right stood only in a quarantined document now swept, so the comment is what a reader reaching for the figure will find.

# Evidence

Measured 2026-08-08 in `~/code`, while ingesting `dirty/code/packages-alanwalton-atlas-web-docs-ssc-card-import.md`.

The docblock. `packages/alanwalton/atlas/web/scripts/src/ssc/import-ssc-card.script.ts:8` reads "1. Load + Zod-parse the transcribed raw deals (`raw/*.json`) → 418 keyed deals."

The run. `bun packages/alanwalton/atlas/web/scripts/src/ssc/import-ssc-card.script.ts --dry-run --no-geocode` exits 0 and prints `[ssc] parsed 417 deals → 243 branches`. It writes nothing: line 248 returns before `createServiceRoleClient()`, and `saveGeocodeCache` is guarded on `!args.noGeocode` at line 245. No network either, `--no-geocode` substituting the county centroid for every branch.

Corroborated against the live database by a standing measurement rather than only by my own run: `pages/finding/atlas-app/record-half-holds-no-rows.finding.md:15`, measured 2026-08-07 with `ops db psql`, reports "All 417 undeleted `location-deal` rows" and the card at "243 locations". Three independent readings agree on 417 and none supports 418.

The direction is what makes this worth filing. The quarantined document said 417 and 243 and was RIGHT; the comment above the code said 418 and was WRONG. A seat weighing that document against the live repository, and treating the docblock as the better carrier because it sits with the code, would have cut a true claim on a false one. Nothing marks the comment as older than the data it describes.

Nothing refuses it. The count is derived at runtime by `loadRawDeals` over `raw/*.json`; no constant, type or check anywhere under `packages/alanwalton/atlas/**` asserts a total, so editing a raw transcription file moves the real number and leaves every prose copy where it was. `domains/code-quality.md` already carries the general form of this — its Intent is that no code comment carries an instruction.

NOT MEASURED: when the count changed, or whether 418 was ever right. Either way the comment is wrong today.
