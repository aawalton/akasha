---
id: 9447552e-656f-5ecf-ae57-573dccd17482
slug: stale-marker-blind-to-a-stopped-poll
page-type-slug: finding
title: "Stale marker blind to a stopped poll"
domain-slug: domain/global
---

# Claim

The only freshness marker on Alan's VS Code status bar triggers on a rejected read and never on an old value, so the failure that hides the most marks nothing at all. A poll that stops firing — host suspended, timer cleared, `activate` returning early — rejects nothing, so every section keeps its last value under a clean tooltip indefinitely. Nothing in the feature compares a timestamp against now.

# Evidence

Read against `~/code` at `ecf5f9518f`, which is `origin/main`. `packages/agents/vscode-extension` is live.

`features/status-bar/render.ts:77-86` is the whole rule. `settleSection` returns `{ stale: false, lastFreshAt: now }` when the read fulfilled and `{ stale: true, lastFreshAt: prevFreshAt }` when it rejected. There is no third arm and no argument carrying an age.

`lastFreshAt` is stored and never compared. Its every live use is `render.ts:30` (the type), `:83`, `:85`, `:111-114` where `formatStaleSuffix` turns it into a string, and `:140`, `:152`, `:171`, `activate.ts:106-110` passing it along. `rg -n -U --multiline "Date\.now\(\)\s*[-<>]"` over `features/status-bar/` returns nothing, as does a search for `MAX_AGE|maxAge|ageMs|now - last`. So no age threshold exists in the feature — the marker cannot fire on age even in principle.

Two facts compound it. `formatStaleSuffix` at `render.ts:114` renders `toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })` — no date component — so a section stale for a day and one stale for a minute print the same suffix. And `item.color` is set once at activation (`activate.ts:64`, `:67`; `slots.ts:28` states it: their "`text` and `color` are set once at activation and never refresh"), so a stale item is visually identical to a fresh one and the suffix is reachable only by hovering.

WHY THE GAP IS THE INVISIBLE CASE. Marking on rejection is exactly right when the poll runs and a read fails, and that is the case `settleReads` was written for (#14021, one flaky read never blanking the healthy others). What it cannot see is the poll not running: nothing rejects, so nothing is marked, and the surface reads healthy. The louder failure is marked and the silent one is not.

Not measured: I did not observe the rendered bar, nor whether #17537, which the audit says retires this renderer, is open.

Found ingesting `dirty/code/docs-ambient-hud-staleness.md`, which recorded it and is queued for removal.
