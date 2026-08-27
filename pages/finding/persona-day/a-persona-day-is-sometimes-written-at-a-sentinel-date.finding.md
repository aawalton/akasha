---
id: f8a92496-fac3-5229-9827-83e8bd8041cf
page-type-slug: finding
title: "A persona day is sometimes written at a sentinel date"
domain-slug: page-type/persona-day
---

# Claim

Something computing a date over an empty set writes a persona day named for `1899-12-31` or `2999-12-31`, and one of those files carried real earned points. The file is landed, committed and pushed before anything notices, and the only correction is a later removal, so the churn is visible as commit pairs rather than as an error.

# Evidence

Measured 2026-08-20 against the memory repo's history and its working tree.

Three such files were created and removed within 75 minutes. `persona-days/ione/1899-12-31.md` landed twice, at `0d655cd8a` written for `daily-tracking-worker` and at `28aec8fc1` written for `daily-tracking`, and was removed each time at `c80879feb` and `e8fd04247`. `persona-days/nova/2999-12-31.md` landed at `156a75483` written for `daily-tracking` and was removed at `b1589a2a0` written for `nova-words-read`. No such file stands now.

The 1899 file was not empty. As it stood at `28aec8fc1` it carried `sleep-points: 210` against `green-day-points: 400` for persona `ione` — points that were earned on some real day and booked to a date that is not one. The 2999 file carried `source-points: 0` for persona `nova`. Neither stated an `id:`, so each derived one from its path.

Neither sentinel date exists among the page rows: selecting `relationship-progress` rows whose date falls outside 2026 returned nothing while those rows still stood. So the sentinel is produced on the file-writing path rather than carried over from the database.

Both spellings are the shape of a bound taken over nothing: `1899-12-31` is the day before a spreadsheet epoch, and `2999-12-31` is a far-future maximum.

The computation was not located. `totals-cumulative.ts` builds a day list from `new Date(Math.min(...instants))`, which is the right shape, but it is guarded by `if (instants.length === 0) return []` and so is not the source. `Math.min()` over an empty spread was confirmed to give `Infinity`, and `new Date(Infinity).toISOString()` throws rather than yielding either sentinel, so whatever produces these dates is not that expression alone.
