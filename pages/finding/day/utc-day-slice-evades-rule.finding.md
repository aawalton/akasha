---
id: 87036b53-b3cf-5f08-a1bc-ce8f75794761
page-type-slug: finding
title: "Utc day slice evades rule"
domain-slug: domain/day
---

# Claim

`getAccountHoldings` in `packages/alanwalton/finances/src/monarch/monarch-client.ts:218` sets `today` via `new Date().toISOString().split("T")[0]`, which is the UTC day with no zone marker, and evades check-timezone-handling rule 4 (`utc-day-slice`) because rule 4 matches only a recognised slice form, not `.split("T")[0]`.

# Evidence

Project #16419 (someday_maybe, day, live-on: deploy). Captured, never defined -- moved off the row's retired `notes` attribute 2026-08-15.

`packages/alanwalton/finances/src/monarch/monarch-client.ts:218`, in `getAccountHoldings`: `const today = new Date().toISOString().split("T")[0]`. `new Date()` reads the wall clock, `.toISOString()` converts to UTC, `.split("T")[0]` cuts a day -- no zone marker. Found by worker-16383 while closing #16383, handed off deliberately: the fix needs a decision outside that scope.

Candidate defect: UTC runs ahead of every US timezone; each evening (local midnight-minus-offset to UTC midnight) `today` evaluates to tomorrow locally, so a date-keyed snapshot queries a day not yet local. Whether it manifests depends on Monarch's handling of a forward-dated `portfolio` input (clamp, empty, prior close) -- unchecked.

Evasion: check-timezone-handling rule 4 (`utc-day-slice`) bounds to the wall-clock-read axis -- `new Date()`/`new Date(Date.now())` reaching a day slice, keyed off `/utc/i`. This site passes `new Date()` but evades on the day-cut axis: `.split("T")[0]` isn't a recognised slice form; the bound is documented; this sits outside it.

Decision: renaming to `todayUtc` would be a FALSE declaration -- it asserts UTC is intended, but for this personal-finance query the local day is almost certainly meant; that turns visible ambiguity into invisible wrong answers and suppresses the check that found it. Per Timezone Handling, every "what day" call routes through one canonical DST-aware helper per zone-domain: (1) establish `finances`'s zone-domain (likely local; confirm against the API); (2) determine Monarch's forward-dated-input behavior; (3) route through that helper; (4) judge whether the day-cut axis warrants extending rule 4, once the zone-domain is settled. Suggested: record as a known bound in timezone-handling.

Scope: grep other `.split("T")[0]` day-cuts before fixing this site -- a single fix leaves the axis open.
