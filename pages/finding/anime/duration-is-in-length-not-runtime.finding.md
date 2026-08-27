---
id: 90f09e98-59e9-5e14-8321-2950c5c5a1c5
slug: duration-is-in-length-not-runtime
page-type-slug: finding
title: "Duration is in length not runtime"
domain-slug: domain/anime
---

# Claim

An episode row's duration is carried in `length`, while the `runtime` field that the page-type seed declares stands empty on every row — so the field whose name reads as the duration is the one that holds nothing.

# Evidence

Measured 2026-08-10 against the live `episode` rows and `packages/collections/shows/src/page-types/seed.ts`.

All 147 episode rows carry `length`. All 147 have `runtime` empty. The seed file declares `runtime` at two places in the episode and season definitions and does not list `length`, `completedAt` or `progress` at all, though the live type carries all three — so a reader who grounds on the seed meets the opposite of what the data holds.

The cost is silent on one path and loud on another, and which one a reader meets is luck. `runtime` is not merely empty: it is not a registered property key on the live type at all. Asked to FILTER on it, the page query layer refuses outright — "unknown filter property_id `runtime` — expected a promoted column or a property stringId" — so that reader is told immediately. Asked to PROJECT it, the same rows return null without complaint. So a sum written against `runtime` can return zero across the whole catalogue, exit clean, and be indistinguishable from a period in which Alan watched nothing, while a filter against it stops the reader dead. Two passes over Ceri's faucet were misled by the seed before this was measured on the rows.

Not established: which write populated `length` rather than `runtime`, whether `runtime` is fed for any other page type sharing this shape, whether the seed is stale or was superseded deliberately, and what the faucet engine does with an unregistered key in `faucetPointField` — which is what decides whether a recipe written against `runtime` would have announced itself or stayed silent.
