---
id: a066b757-2a81-5c37-b3d4-2777219534f4
page-type-slug: finding
title: "Pages block work swings and returns"
domain-slug: domain/query-performance
---

# Claim

Block work per call on `public.pages` fingerprints swings by two to three times over hours and returns on its own. One fingerprint rose from about 110 blocks per call to 307 over thirty hours and was back at 152 within the hour after its alert cleared, with nothing done to it. A reading taken inside such a swing is indistinguishable from a standing regression, and several hours of history are not enough to tell them apart.

# Evidence

Watched across 2026-08-15 evening into 2026-08-16 01:50 UTC, from `public.db_query_stats`.

queryid 2146836888519074621 selects from `public.pages` where `page_type_slug` and `status` match, keeping only rows for which a newer row of another type shares an attribute value — `inner_p.attributes->>$6 = outer_p.attributes->>$7 AND inner_p.seq > outer_p.seq`. Its cost therefore rises with how many rows carry that status at the time.

Shared blocks per call by day, 08-08 to 08-14: 105 / 107 / 109 / 117 / 110 / 115 / 138. By hour on 08-14 it holds 139 to 144 from 14:00 to 19:00, reads 155 at 20:00 and 231 at 21:00. Through 08-15 it climbs 223 at 11:00, 267 at 13:00, 283 at 14:00, 313 at 15:00, 318 at 16:00, and holds 306 to 313 to the end of the day. `query-plan-drift-regression` fired for it at 23:43 on 08-15 and cleared at 01:38 on 08-16. Measured over the thirty minutes to 01:50, it reads 152 blocks per call and 0.47 ms per call against a trailing-7-day median of 0.42 ms, a ratio of 1.12 over 29 qualifying buckets. Nothing was done to the query or the table between the fire and the recovery.

Two other fingerprints alerting in the same window read, over the same thirty minutes: queryid -9103971312347135299 at 582 blocks per call against a baseline band of 442 to 620, and queryid 6396909959997071872 at 1,035 against a baseline band of 510 to 614. The second remains open, having fired at 22:30 on 08-15.

An earlier reading of the same fingerprints taken over four hours showed one of them flat and was used to call the alert false; a reading over eight days showed a rise and was used to call it a standing trend. Both were drawn from inside the swing.
