---
id: 2c88fc78-d69c-5c09-b969-00e2243616bf
page-type-slug: finding
title: "A mechanical landing drops another agent's reading"
domain-slug: domain/read-record
---

# Claim

`carryReadings` takes an agent's read record outside the lock and writes the whole snapshot back inside it, so a reading another process lands in between is lost. It runs on every `--mechanical` landing and sweeps every agent page, so one agent's program-decided write can drop a second agent's reading. This is a way the record loses entries that needs no turn boundary and no context replacement, and it is not the delegate page removal already filed.

# Evidence

Measured 2026-08-28 against `agent/record-read.ts:132-155`. `const records = standingOn(page)` at :137 stands outside `exclusively(recordPathFor(page), ...)` at :149, whose body is `landReadings(page, records)` at :150 — the whole snapshot, not a merge. `flushReadings` at :83-88 does merge inside its lock; this path does not. `repo/land/land.ts:205` calls `carryReadingsBy` on every mechanical landing, and `:128-130` passes `agentPages()`, which is every seat and every subagent.

Reproduced in a scratch fixture: hold the lock, start `carryReadings` in a second process, land a new entry while it is blocked, release.

    interleaved  /f/b.md present after: false
    before       /f/b.md present after: true

The control is the same script with one thing changed, the new entry landed before the child takes its snapshot rather than after, and the entry survives.

It drops and does not invent. Vouching is recomputed at each load from stored `seenAt` against the live cutoff at `:18-31`, never taken from the stored `expiredAt` flag, so a restored snapshot cannot make a stale reading vouch: with no flag on disk, `recordsFor(page, 2000)` over `seenAt: 1000` answers `{}` and `recordsFor(page, 500)` answers the entry.

Not measured: how often a mechanical landing touches a path another agent has read, which is what sets the rate.
