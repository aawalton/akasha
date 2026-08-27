---
id: c90c7f5a-fcda-52bb-93e8-19b26d042b36
page-type-slug: finding
title: "Upsert blocks outrun row growth"
domain-slug: domain/pages-system
---

# Claim

Every page upsert reads about 43,000 buffers, and that figure is climbing far faster than the table it writes to.

`public.pages_upsert` cost 294.9ms and 43,469 shared blocks a call today, against 239.4ms and 32,589 on 2026-08-07 — a third more work per call in three days, while `pages` itself grew 2.9%. It ran 5,638 times over seven days at a flat 282.6ms median across 130 qualifying buckets, so this is the steady cost of the write path rather than a spike.

# Evidence

Measured 2026-08-09 22:05 UTC, read-only, from `db_query_stats` and `public.pages`.

`QuerySustainedMeanBudgetExceeded` for fingerprint -2841954187712285930 arrived resolved at 22:00:45. That resolve is its window emptying rather than any repair — last execution 21:04:01, no calls in the thirty minutes to the resolve, and cost per call unchanged where calls did land. Triage gives 90 calls at 279.0ms over two hours, 1,198 at 294.1 mean and 296.7 median over a day, and 5,638 at 237.0 mean and 282.6 median over seven days on 130 qualifying buckets. A median that flat across 130 buckets is a steady state, not a tail.

The query text is `select coalesce(jsonb_agg(r), $1::jsonb) from public.pages_upsert($2, $3::jsonb, array(select jsonb_array_elements_text($4::jsonb)))`. The role is `service_role` and not `agent_adhoc`, and `ops db psql` is the only thing connecting as the latter, so this is not ad-hoc traffic from a prompt.

Per day, calls then ms per call then blocks per call:

    2026-07-24        2     16.9     3,834
    2026-08-07    1,699    239.4    32,589
    2026-08-08    2,831    212.9    30,083
    2026-08-09    1,108    294.9    43,469

`pages` holds 1,244,377 rows, 1,240,460 of them live. 35,212 were created on or after 2026-08-07 and 8,017 today, so the table grew 2.9% across the three days in which blocks per call rose 33%. Growth does not account for the rise. At 8KB a block, 43,469 is about 340MB touched per call.

Not established: what `pages_upsert` does, which caller drives it, and when the step away from the 2026-07-24 shape happened. That row is two calls and is not a baseline, and no bucket for this fingerprint exists between 2026-07-25 and 2026-08-06, so it may be a new caller rather than an old one regressed.
