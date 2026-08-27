---
id: 844b7abb-4de6-5e81-979d-a897cf02d51d
slug: google-coord-ban-contradicted
page-type-slug: finding
title: "Google coord ban contradicted"
domain-slug: domain/atlas-app
---

# Claim

The atlas Google import states a legal constraint that its own wiring breaks. Its comments say Google-derived coordinates are never persisted because Google's terms forbid it, and the resolution chain reads coordinates straight out of the Google Takeout export and writes them to the `location` row as its first choice. Whichever half is wrong, nothing refuses either, and the comment is what a reader extending the importer would obey.

# Evidence

Read 2026-08-08 in `~/code`, `~/instructions` and `~/memory`, while ingesting `dirty/code/packages-alanwalton-atlas-web-docs-google-maps-import.md`.

Two comments state the ban. `packages/alanwalton/atlas/web/scripts/src/geocode.ts:5-7` — "Google-derived coords are never persisted (their terms forbid it), which is why a miss cannot simply reuse the export's own Google coordinates". `import-google-takeout.script.ts:20` — "We never persist Google-derived coordinates (their terms forbid it)." The quarantined document says it a third time, as the reason Geoapify was chosen.

The wiring persists them, first choice. `parse-takeout.ts:189-192` resolves a pin's coordinates as `coordsFromGeometry(feature.geometry) ?? coordsFromNested(props.Location?.["Geo Coordinates"]) ?? extractCoordsFromUrl(url)` — three reads out of the Google export. Lines 195-209 put them on the pin; `import-google-maps-pins.script.ts:62-68` pushes them onto `resolved`; `seed-locations.ts:29-36` writes them to the row. Geocoding is reached only at line 210, when all three came back empty, so "a miss cannot reuse the export's own coordinates" is vacuous — a miss is defined by there being none.

The full-Takeout path does it deliberately. `unify-places.ts:41-46` names file-origin coordinates — labeled places, My Maps, reviews, all Google export files — as the ones that may be used, excluding only geocoded saved-list coords, and for idempotency rather than terms.

Nothing refuses either reading: once a coordinate is a `number` on `SeedableLocation` (`takeout-types.ts:37-51`) no type, constant or check tells its source. And the ban stands only in comments, which `domains/code-quality.md` already forbids as a place to put an instruction.

NOT MEASURED: what Google's terms permit. The reconciliation may be that the Maps Platform terms restrict API-served content while a Takeout export is Alan's own data — which would make the code right and the comments overstated.
