---
id: 47807f47-fbd9-5b8f-aff3-d8943bf35e7b
page-type-slug: finding
title: "Reading stop anticorrelated with estate quiet"
domain-slug: domain/litrpg-books
---

# Claim

The stop in Alan's LitRPG reading record does not coincide with the estate-wide quiet a standing
ruling attributes it to. Chapter completions ran straight through the estate's quietest days and
stopped on 2026-07-23, the day the estate came back — one chapter has completed in the fifteen days
since. Against the record the correlation is inverted: he read while the work was quiet and stopped
when it resumed, so a diagnosis resting on the two windows being one window rests on nothing.

# Evidence

Both series measured on 2026-08-07.

`story-chapter` completions per day, from `ops db psql` (read-only role), over
`public.pages` where `deleted_at is null`:

    2026-07-09  752   (a bulk import, not a day's reading)
    07-11  1   07-13  3   07-14  3   07-15  1   07-16  5   07-17  3
    07-19  2   07-20  3   07-21  2   07-23  2
    2026-08-06  1

Nothing on 07-10, 07-12, 07-18 or 07-22, so "daily" does not hold either. Nothing at all between
07-24 and 08-05.

Commits per day in the code repository over the same window, `git log --since=2026-07-15
--until=2026-08-02 --date=short --pretty=%ad | sort | uniq -c`:

    07-15 210   07-16 226   07-17 239   07-18 143
    07-19  41   07-20  18   07-21   5   07-22  19   07-23 (none)
    07-24 278   07-25 579   07-26 229   07-27 602   07-28 716

The estate's quiet is 07-19 to 07-23, deepest at 07-21 and total on 07-23. Chapter completions land
on 07-19, 07-20, 07-21 and 07-23 — inside it. The reading stops at 07-24, the day commits return to
278 and climb.

The source being emptied, `dirty/skills/litrpg-books/rulings.md`, contradicts itself on this: its
heading claims one window while its own evidence sentence says completions "run daily at two to five
a day through 07-23" and the seat "was last messaged 07-18". The 07-18 date matches the estate's dip;
the 07-23 date does not.

Both series are proxies and neither is Alan. `completed_at` is when a row was marked, which a sync
may write, and the commit count is agent activity rather than his hours. What is measured here is
that the two records do not move together in the direction the ruling needs, not what he was doing.
