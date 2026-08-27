---
id: 59347488-445e-5506-897c-19220ea7073d
page-type-slug: finding
title: "Mode is read as facing"
domain-slug: domain/global
---

# Claim

Whether anything attends a seat's output and whether Alan is on the other side are separate questions, and four sites decide the second from the first — the same conflation already found and repaired at two other sites.

# Evidence

`supervisor-resume-decide.ts:194-197` reads interactive as Alan at the keyboard. `shared/terminal-alert.ts:58-64` reads headless as no human watching. `supervisor-args.ts:124` maps headless to awaiting-inbound and interactive to operator-attended, and `driverOf` returns operator-attended for the interactive arm at `supervisor-resume-decide.ts:259`.

`supervisor-limit-resume.ts:19-21` and `supervisor-monitors-wire.ts:76-78` record the identical read as a defect already repaired there: the former gate read a session kind as an attended human and so excluded every persona seat.

`rc-degraded-seats.ts:10-11` proves the two axes separate: every workstation persona seat is a headless supervisor spawn, and Alan talks to those.
