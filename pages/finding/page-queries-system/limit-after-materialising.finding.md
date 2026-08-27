---
page-type-slug: finding
id: c00f0de6-df3f-5852-a3c4-10b0581a8dee
slug: limit-after-materialising
title: "A query costs its whole page type whatever limit it asks for"
domain-slug: domain/page-queries-system
---

# Claim

A page query materialises every page of its type before `limit` narrows the result, so one answer costs the whole type however few rows it asks for: `collection` costs 1425 MB for one row and for all of them alike. Resident size climbs far above retained heap and comes back only later, so heavy answers close together carry it past the 8 GB ceiling a reaper enforces. This is not a leak: retained heap across three rounds stands at 2166, 2431 and 2376 MB.

# Evidence

Measured against the live roots, calling the answering path directly rather than through the socket; retention as `heapUsed` after a forced collection, resident as `rss`.

    collection                 +1390 MB  4326 ms
    collection at limit 1      +1425 MB  4113 ms
    story-chapter-royal-road   + 699 MB  5127 ms, 303 MB body

Both kills were `memory-reaper` at a per-process ceiling: `VmRSS 10.1 GB exceeds 8.0 GB ceiling`, then 9.1 GB. No kernel out-of-memory report stands in the journal, the host held 30 GB free, and the unit caps nothing. Other exits were the wrapper restarting on a watched file change.

`story-chapter-royal-road` is 17,709 files and 318 MB behind its glob and answers in 5239 ms. The two runs that stayed near a gigabyte served none; the death that could be typed served six.

A live run reached 5.4 GB in 4m15s then sat flat, ten samples spanning 15 MB: `story-chapter-played` at 1336 ms and four `book-chapter` near 1000 ms ran in its first three minutes and nothing heavy after. Resident size does come back: one run fell 1097 MB to 444 MB in ten seconds against a 1200 MB peak.

Requests are served one at a time: over 29,567 lines the peak in flight was 1, so concurrency multiplies nothing. A fresh process reached 8.3 GB 38 seconds after starting, which no per-request accumulation accounts for.

NOT MEASURED. What carries a fresh process to 8 GB in under a minute is unestablished. A forced collection returned no resident memory in my own runs, so what releases it later is unestablished. Of the types above, only the story-chapter ones are known to be asked for in the windows examined: `collection`, `story-read-royal-road`, `book` and `idle-game-all` were absent from both request starts and responses, so their cost is real but nothing shows them reaching the running service. Three earlier explanations of mine were refuted by these same measurements: a monitoring sweep as the driver, a deriver accumulating kinds without bound, and distinct field sets multiplying held derivers.
