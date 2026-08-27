---
id: 7017078d-23ba-5486-883b-facf6b2d6302
page-type-slug: finding
title: "Neither decay nor use observable"
domain-slug: domain/atlas-app
---

# Claim

The atlas domain has no signal in either direction. Nothing records whether a kept location is still true of the world, and nothing records whether anything kept is ever looked at, so quiet is the only reading it has ever been able to return.

# Evidence

Measured 2026-08-07 against the live database and `ops app list`.

Neither half is a check that is blind; both are instruments that do not exist, which is why a green reading is not what makes them invisible — there is no reading at all.

Nothing ages a row. The `location` page type, `019f149b-8573-787f-867f-fa10e855c4c9`, carries 19 property definitions: Address, Category, Collection, Cuisine Or Type, Deals, Latitude, Longitude, Notes, Rating, Review Date, Review Flag, Review Rating, Review Text, Scheduled End, Scheduled Start, Source, Source Place Id, Source Url, Visited. Not one records when the row was last confirmed against the world. `Review Date` dates a review Alan wrote and `Visited` is a boolean that never goes back. There are 1,210 undeleted location rows. So when a place closes, moves or is rebuilt, the row does not error, does not age and does not become less confident.

Nothing observes use. `public.metrics` holds 36,763,302 rows and zero of any metric name labelled `app=atlas` — the count is 0, not a small number. The `page_view` metric covers exactly one app, `alanwalton`, at 7,928 rows spanning 2026-07-18 to 2026-08-07, against the 18 apps `ops app list` returns, one of which is `atlas` at `atlas.alanwalton.com`. So *never opened* and *opened and abandoned* return the same nothing here.

The two compound: a domain built to hold things, whose held things go wrong invisibly, and which cannot see its own use, cannot tell health from disuse in either direction.

Found while ingesting `dirty/skills/atlas-app/SKILL.md`, which records both halves and is queued for removal, so the record goes with the sweep unless it is filed here. Its own figures have moved and are restated above as measured: it says eleven apps where `ops app list` now returns 18.

NOT MEASURED: whether any location row is in fact stale — that is the reading no instrument here can take, and it is the point.
