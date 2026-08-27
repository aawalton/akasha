---
id: 0844a1b8-3045-598a-9fd0-2ac17240e298
slug: day-carries-more-than-earnings
page-type-slug: finding
title: "A persona day file carries ten keys beyond what its persona earned"
domain-slug: page-type/persona-day
---

# Claim

A persona day file carries ten keys beyond what its persona earned. All 1,942 files under `memory:persona-days/` hold `value-slug` and `green-day-points`, and a minority carry Alan's own body readings. Only `persona-slug`, `date`, `source-points` and `source-total-snapshot` answer to the standing intent that a persona day holds only what that persona earned. `value-slug` records what she served on that day rather than what she carries now, so nothing recomputes it once it goes.

# Evidence

Measured on 2026-08-21 against `~/repos/memory/persona-days`, by reading the frontmatter of every one of the 1,942 files and counting each key across all of them. This is that census whole rather than a sample.

`value-slug` on 1,942, `source-points` on 1,942, `persona-slug` on 1,942, `page-type-slug` on 1,942, `green-day-points` on 1,942, `date` on 1,942, `id` on 1,938, `green-day-fraction` on 1,938, `source-total-snapshot` on 377, `task-points` on 73, `strength-volume` on 63, `sleep-points` on 63, `nutrition-points` on 61, `breathing-points` on 60, `byte-points` on 20, `active-calories` on 17. Four files carry neither `id` nor `green-day-fraction`.

The drift was measured by comparing the `value-slug` on each persona's document under `instructions:domains/personas/` against the distinct values standing across her own day files. Forty persona directories were compared and four differed: amy's days hold health and love against health now, ember's fun and wealth against wealth, eppie's faith, fun and learn against learn, and zadi's faith and learn against learn.

Not measured: whether anything still writes these keys. No writer was read, no pod inspected and the database not queried, so this says what the files hold and nothing about what puts it there, nor whether a next run would restore a key removed by hand. Whether `green-day-points` and `green-day-fraction` recompute from the persona was not tested either; only `value-slug` was checked for drift.

Found while closing projects #19433 and #19434, whose documents were deleted the same day. Their notes held that these four keys were the intended end state and that ten writers had still to be stopped. That was their claim and is not verified here.
