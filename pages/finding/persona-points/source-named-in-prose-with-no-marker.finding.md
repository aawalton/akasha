---
id: e7bf4cac-825d-55e1-9e20-1804e96f9608
page-type-slug: finding
title: "One persona's points source is named in prose alone, so nothing the engine reads can compute her a point"
domain-slug: domain/persona-points
---

# Claim

Zeli's points-source document names her source in prose alone and declares no marker, so nothing the engine reads can ever compute her a point.

# Evidence

Measured 2026-08-19 against the instructions repository and the live database, while defining #19434.

`domains/persona-points-sources/zeli-points-source.md` declares `kind: external` and no `marker:`. Every other `external` document carries one — ceri `anime-episode-completions`, elin `owned-project-completions`, erin `chess-practice-points`, zadi `gbww-chapter-completions`, and so on across all 25.

Her Definition reads "the minutes Alan spent making art" and her Design "Sixty of them is a green day", so a person reading the document knows exactly what she counts and the engine is given nothing to count it from.

`page-types/persona-points-source.md` states under Intent that "The engine can read every source a persona's document names." This is the one document that breaks it.

She has 51 `relationship-progress` days and every `greenDayFraction` on them is zero, which is consistent with the missing marker and does not prove it: no store of art minutes was found either, so a marker alone might still leave her at zero.

Not measured: whether a page type recording art minutes exists under some other name; whether `external` without a marker means something deliberate that the other 24 documents simply do not need; and whether anything but `ops persona points-source check` would have reported this, since that command has exited 70 on a deleted package since 2026-08-19.
