---
id: c5ae154b-c927-57d7-bb45-af5331cdbd87
page-type-slug: finding
title: "Per field versioning recovers week of history"
domain-slug: domain/stoplight
---

# Claim

Project #17549 (domain `stoplight`), raised by #17544's definition pass as R1c against `ambient-hud` initiative objective 2, recorded per-field write history as opt-in and absent from the source behind the habit, inbox and values stoplights — then a 2026-08-02T17:49:07.698Z lead correction found the row's central premise false: `BACKFILL_WINDOW` is 7 days and `page_versions` projects the already-queryable `public.events`, so turning versioning on recovers a week of history, not none.

# Evidence

Project #17549, domain `stoplight`. Raised by #17544's definition reading as R1c — a recommendation deliberately passed up, not dropped. Captured by `amy-lead` against `ambient-hud` initiative objective 2.

**Original gap.** Per-field write history is opt-in per page type. The Claude usage source has it: 731 samples over 24h, median gap 2m34s, max 2h17m, against a governing constant of one hour. The source behind the habit, inbox and values stoplights lacked it.

**#17544 declined it; the reasoning later proved false.** C6c held only that the row is not repaired — Alan asked for an audit, not a fix.

**Correction, 2026-08-02T17:49:07.698Z (the lead).** The captured reason for declining — versioning "yields no retroactive history" — is false, established on #17544, verified by the manager on #17539. `BACKFILL_WINDOW` is `"7 days"` (#14542 calls this a feature); `public.events` has a documented 7-day retention (#12144). `page_versions` projects `public.events`, gated on `versioned`; `public.events` is queryable per-field regardless. Versioning recovers a week of history, not none.

Bigger correction: the premise that most of the HUD is unobservable was itself wrong. The manager reproduced a real distribution off a chain called unobservable: `inboxEmail` over 24h, 285 gaps, p50 5m00.003s, max 10m11.456s (the one 10-minute gap a missed timer fire, caught by `Persistent=true`). The figure "24 of 37 rendered elements plus three status-bar items" unobservable is wrong, too large. Three shapes: chains folded live per request, chains measurable from the event stream, and a genuinely unobservable case (WidgetKit's effective delivery).

**What survives.** Turning versioning on is still worth doing, still not #17539's to do; C9c holds that mechanically. Not established: which page type, the attribute's name, its cost in write volume or storage, or what downstream reads it disturbs.

Capture ended at a paragraph boundary; what stands is its head. Never defined: carries no objective.
