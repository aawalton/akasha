---
id: dcc123ad-9256-5eac-afc2-43b367268ce1
slug: orphan-linker-bounded-scan-blind
page-type-slug: finding
title: "Orphan linker bounded scan blind"
domain-slug: domain/relationship-level
---

# Claim

`backfill-orphan-relationship-progress-links.script.ts` reported zero orphans while a freshly hand-created `relationship-progress` row was in fact an orphan, because its scan is bounded (1000 of 1051 rows) and misses the newest rows — exactly the population the doctrine ("run right after every hand-create") points it at — so following the documented procedure can return an explicit all-clear while a day is silently dropped from the cross-persona stoplight fold.

# Evidence

Filed as project #16168, domain `relationship-level`, status `someday_maybe`. Found by aine 2026-07-25 via her own manual faucet ledger — observed, not inferred.

**Defect.** `backfill-orphan-relationship-progress-links.script.ts` reported "orphans: 0" and `{"scanned":1000,"linked":0,"remaining":0}` while a fresh orphan existed. Hand-created relationship-progress row `019f9974-1af1-752e-8a5b-60cffeca820b` (aine, 2026-07-25); ran the linker immediately per doctrine — 0 orphans reported; row itself had no `dailyTracking` — it was an orphan; fixed by hand to daily-tracking page `019f988c-075c-70fa-b2aa-0ef28fa5e584`.

**Mechanism.** `ops page list --type relationship-progress --count` = 1051 rows; the script scanned only 1000 — 51 outside its window, including the row just created — exactly the population the doctrine points it at.

**Why not cosmetic.** The faucet's daily stoplight folds `greenDayFraction` via the inverse `dailyTracking` relation; an orphan is absent from its day's fold even with a correct fraction — doctrine gives an explicit all-clear and the day is silently dropped.

**Class**, one of six 2026-07-25 "confirmation decoupled from effect" instances: this row; #16166/F10 (link unsignalled); #16012 (revoke returns 200 regardless); #15790 (5h-stale "awaiting Alan"); #15934 (acceptance bar named a moved property); `cmd | grep x` on nonzero exit.

**Also a denominator-rule violation:** "remaining: 0" means "0 among the 1000 scanned," not "0 remaining."

**Fix shape offered, not prescribed:** cover the full set or bind the verdict to the window examined and say so loudly; newest-first ordering is the minimum given the doctrine.

Homed as an orphan deliberately — script lives in `packages/alanwalton/daily-tracking/scripts/`, corrupts the cross-persona faucet economy; routed to whoever owns the faucet projections.
