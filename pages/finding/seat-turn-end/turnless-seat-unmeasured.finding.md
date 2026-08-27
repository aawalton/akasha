---
id: 11d53a8a-cd48-53c9-b9b0-41081c1f2fd2
page-type-slug: finding
title: "Turnless seat unmeasured"
domain-slug: domain/seat-turn-end
---

# Claim

A headless seat that produces no turn is outside the reach of every instrument built to find a stalled one. Each of them keys on something a turn leaves behind — a Stop-hook record, a transcript write, a written obligation — and a seat revived to wait on an empty mailbox leaves none of the three. Its row goes on reading `running` and `live`, the supervisor process being alive.

# Evidence

Measured 2026-08-10, 13:20–13:30Z. `ops seat list --all --json`: 17 live rows, 8 `launch: spawned`.

Four of the eight had a transcript whose last write was 5.5 to 7.1 hours old, and in each that write was the `last-prompt` record a resume lays down, not a model turn: `019fe8cb` (session `41a37e9d`) at 06:53:06Z, `019fe8ae` (`2480d65b`) 06:20:25Z, `019fe8ad` (`dcdfc996`) 06:44:12Z, `019fe87c` (`32ce14f3`) 07:53:06Z. All four read `status: running`, `live: live`, reason `row supervisorPid alive and present in the env-keyed /proc set`.

Last model activity is older still. `019fe8ad`'s final assistant record is 2026-08-09T22:58:20Z and `019fe87c`'s is 22:50:23Z, about 14.5 hours before the reading, and both end on an assistant `tool_use` with no result after it.

Four instruments read clean over that population in the same minutes:

- `ops seat active` — active 12, running 16, wedged 0, with all four carrying `active: false`.
- `ops seat silent-resumes` — `unmet 0`. Its five `indeterminate` entries are all `019fe8ad` and `019fe87c`, resumed `driver: awaiting-inbound`, `delivery: nothing-to-deliver`, at 00:12:23Z, 00:25:28Z, 00:25:50Z, 00:37:47Z and 00:38:41Z: five revives inside 26 minutes, each filed "undriven by design", deferring to a later observation nobody takes.
- `ops seat blocked-census` — scanned 453, unrecorded 0. Neither handed-back row appears, neither seat having written a `blockedOn`.
- `tools/sweep-seats.ts` — 16 live, 0 running-unassigned, 0 custody-arriving.

`~/agents/hook-decisions/2026-08-10.jsonl` holds 196 records and zero blocks. `019fe8ad` and `019fe87c` have no record at all across 08-09 or 08-10.

Both rows had been RETURNED to those seats with a written reason on `custodyTransfer`, at 2026-08-09T23:03:34Z and 2026-08-10T00:12:15Z. Neither seat read one.

NOT MEASURED. Whether any of the four can still take a turn: none was sent a message. Whether the five revives came from one caller.
