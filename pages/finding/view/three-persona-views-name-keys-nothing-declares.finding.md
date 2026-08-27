---
id: ce0ca30d-a108-51d4-8f8e-05367ff9e210
page-type-slug: finding
title: "Three persona views name keys nothing declares"
domain-slug: page-type/view
---

# Claim

`views/personas-notes.md`, `views/personas-covers.md` and `views/personas-not-empty.md` name `session-id`, `domain` and `role` among their properties, and no property declares any of the three and no persona carries one — on the file side or on the row side. These columns have never had values; the file migration did not break them. The repair is a rename in each view: `value` to `value-slug`, `domain` to `championed-domain-slug`, and `group-sort-by: role` to `role-slug`.

# Evidence

Measured on 2026-08-20 against the live page query service on port 8787 and the live database, with a negative control proven first: a deliberately bogus key in a `where` returns 400 with `absent`, so a zero here distinguishes a missing key from an unmatched one.

Probed by explicit key against the 41 persona files, `session-id`, `domain` and `role` each return absent — no property declares them and no page carries them. `value` is absent too; the file spelling is `value-slug`, which reads 40 of 41.

The row side has never been better. Of the 40 live persona rows, zero carry `role`, zero carry `domain` and zero carry `sessionId`. The materialized `propertyDefinitions` blob on the `persona` page-type row declares `role` as text but never `sessionId` and never `domain`, so two of the three were undeclared in both worlds and the third was declared and never filled. `group-sort-by: role` has therefore grouped by nothing for as long as the views have existed.

The repair targets, all measured through the read path: `value-slug` 40 of 41, `championed-domain-slug` 38 of 41, `role-slug` 40 of 41. `last-messaged-at` at 38 of 41 and `title` already render correctly and need no change.

The view ids are `personas-notes` `14ad3ff9-8a77-4de7-b943-a02a3efffa57`, `personas-covers` `748797be-0c5b-45fe-a508-b3c1965e1cac`, and `personas-not-empty` `019db533-f3b3-791b-9004-8fd818e69fa3`. All three also set `gallery-cover-source: cover`.

NOT the same case, and deliberately excluded from this finding: `level`, `percent-progress` and `total-points`, which the same views also name. Those did work in the row world — `level` and `percentProgress` are `formula` definitions on the blob over `totalPoints` and `greenDayPoints` — and they read 0 of 41 on files because nothing computes them there. They are genuine migration breakage rather than columns that were always empty, and they are being repaired separately.
