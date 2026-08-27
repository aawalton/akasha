---
id: ddd76b2c-13d2-5343-a13f-e778826ec172
page-type-slug: finding
title: "Record half holds no rows"
domain-slug: domain/atlas-app
---

# Claim

The atlas domain holds almost none of the record it exists to be. Of 1,210 undeleted `location` rows, 1,203 belong to a second user and 6 to Alan, and every one of the 69 rows marked visited is hers, so the record of where Alan has been is empty while the domain reads as full.

# Evidence

Measured 2026-08-07 against the live database with `ops db psql`, read-only.

Grouping `public.pages` where `page_type_slug = 'location'` and `deleted_at is null` by `user_id` and by `attributes->>'visited'` returns five rows: `9bc63b11-d301-4a51-8839-7371336262c7` with 1,134 carrying no visited value and 69 carrying `true`; `9ba554f7-cb18-48bb-a709-ec935a895ca7` with 5 carrying none and 1 carrying `false`; and one row belonging to the browser-test account. `auth.users` gives `9bc63b11` as `smilingjenny@gmail.com` and `9ba554f7` as `aawalton@gmail.com`. So Alan owns six locations and none of them is marked visited.

The same skew runs through the whole domain. All 417 undeleted `location-deal` rows are `9bc63b11`'s. Of the three `location-collection` rows, Alan owns "My Places" and "Europe Trip 2026" and she owns "Starving Student Card", the coupon punch-card that is the largest single load at 243 locations. Her account holds 1,621 undeleted rows in total and every one of them is a `location`, a `location-deal` or a `location-collection` — the atlas types are her whole footprint.

This bears on the ruling kept at `dirty/maybe-keep/skills/atlas-app/SKILL.md`, that the record of where Alan has been is primary over the planning use. That keep reads the 69 visited rows as the record half of the domain and the coupon card as the planning lean. Both figures are right and the attribution is not: the 69 are hers. The ruling's subordinated half is not merely larger than its primary half — the primary half has no rows at all.

Found while ingesting `dirty/skills/atlas-app/rulings.md`. Its `location-deal` entry states the type is wholly owned by the second user, which is true and measured above; the entry is cut because the doctrine it asks that ownership be reconciled against does not exist, so the measurement would have gone with the sweep.

NOT MEASURED: whether Alan's six rows are recent or abandoned, and whether the second user's data was loaded for her or by him on her behalf. Neither changes the count.
