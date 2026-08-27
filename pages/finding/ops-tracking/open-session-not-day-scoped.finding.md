---
id: 4f07da57-f40f-5ddc-b3ae-599de785cfc7
page-type-slug: finding
title: "Tracking status does not scope the open session it reports beside a day's sessions"
domain-slug: domain/ops-tracking
---

# Claim

`ops tracking status --date <day>` scopes its session list to the day asked for and does not scope the open session it reports beside them. The open block is whatever block is open now, printed as that day's open block for every date the command is asked about, including dates the block does not belong to.

# Evidence

Taken on 2026-08-19 at 21:52 Mountain, with one session open: `Rest`, id `01a01d49-cda2-7000-aa9b-61ed40f2f6ba`, started 21:00, attributed to day 2026-08-19.

`ops tracking status --date 2026-08-19 --json` reports `open` as that session and lists 11 sessions, the last of them `Rest`. The two agree.

`ops tracking status --date 2026-08-20 --json` reports `open` as the same session, id `01a01d49-cda2-7000-aa9b-61ed40f2f6ba`, and lists 0 sessions. The day holds no session at all, and the block reported as its open one is the previous day's.

The TSV rendering carries the same pair, printing an `open` line above a day that lists nothing under it.

A reader asking what a day held reads the two fields together: an open block above an empty list reads as a day underway, which is what 2026-08-20 is not. The same shape appeared earlier tonight in the other direction, when a session created by a failed attribution stood open on 2026-08-20 while the day it displayed under was 2026-08-19.
