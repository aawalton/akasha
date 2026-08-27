---
id: 1096b6bf-a07a-5762-9b28-0698c0629aaa
slug: read-redirect-fabricates-record
page-type-slug: finding
title: "Read redirect fabricates record"
domain-slug: domain/global
---

# Claim

`tools/read.ts` refuses to print into a pipe or `/dev/null` because a record would claim a body reached the agent when none did, but a redirect to a regular file is not caught and fabricates exactly that record. Measured: `domains/proximity.md` was absent from a seat's read record; `bun tools/read.ts --file-path domains/proximity.md --full > /tmp/prox.txt` exited 0, wrote 33752 bytes to the file, and left the record carrying `spans: [[1, 17]]` — the whole document — with nothing reaching the agent.

# Evidence

Raised by a review-instructions seat on `domains/folders/all-about-alan.md`, which reported exit 0 and 753 lines written to a file with nothing reaching it, and named the redirect as "the one redirect form an agent trying to manage a large read would reach for".

I reproduced it and took it further. The reviewer showed the body was diverted; I checked whether the record was fabricated, which is the half that matters. Before: `grep -c "domains/proximity.md"` against `/home/walton/.instruction-reads/019fda60-c257-7d90-833a-a58ba23dee6f.json` returned 0. After the redirected run: the entry exists with `spans: [[1, 17]]` and a fresh `seen`. `domains/proximity.md` is 17 lines, so the whole document is recorded as read.

I confirmed the two refusals that DO fire, having hit both in ordinary work this session: piping to `head` gives "this is printing to a pipe, so no body would reach you and a record would have said one had", and `> /dev/null` gives the same refusal naming /dev/null.

Consequence not measured: I did not test whether a write gate then passes on the strength of the fabricated record, though `read-what-governs` and `hold-seat` both read this file. I restored my own record's honesty by reading `domains/proximity.md` natively afterwards.
