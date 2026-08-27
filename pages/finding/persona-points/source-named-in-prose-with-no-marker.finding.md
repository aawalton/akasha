---
id: e7bf4cac-825d-55e1-9e20-1804e96f9608
slug: source-named-in-prose-with-no-marker
page-type-slug: finding
title: "One persona's points source is named in prose alone, so nothing the engine reads can compute her a point"
domain-slug: domain/persona-points
---

# Claim

Zeli's points-source document names her source in prose alone and declares no marker, so nothing the engine reads can ever compute her a point.

# Evidence

Measured 2026-08-19 against the instructions repository and the live database, while defining #19434.
The instructions repository is gone and akasha replaced it; the paths below are akasha's.

`pages/persona-points-source/zeli-points-source.persona-points-source.md` declares `kind: external` and no `marker:`. Every other `external` document carried one — ceri `anime-episode-completions`, elin `owned-project-completions`, erin `chess-practice-points`, zadi `gbww-chapter-completions`, and so on across all 25. That last part is no longer where the reader should stop: of the 24 documents standing in `pages/persona-points-source/` today, 9 are `kind: external`, and ruby and selah now carry no `marker:` either, so zeli is one of three rather than the only one. Elin has no points-source document at all any more.

Her Definition reads "the minutes Alan spent making art" and her Design "Sixty of them is a green day", so a person reading the document knows exactly what she counts and the engine is given nothing to count it from.

`pages/page-type/persona-points-source.page-type.md` states under Intent that "The engine can read every source a persona's document names." That line still stands, and this document breaks it.

She has 51 `relationship-progress` days and every `greenDayFraction` on them is zero, which is consistent with the missing marker and does not prove it: no store of art minutes was found either, so a marker alone might still leave her at zero. Those days are now files, `pages/persona-day/zeli/`, and the key to read there is `green-day-points` — `greenDayFraction` is not on a persona day.

Not measured: whether a page type recording art minutes exists under some other name; whether `external` without a marker means something deliberate that the other 24 documents simply do not need; and whether anything but `ops persona points-source check` would have reported this, since that command has exited 70 on a deleted package since 2026-08-19. `ops persona points-source check` is now gone altogether, so nothing reports this at all.
