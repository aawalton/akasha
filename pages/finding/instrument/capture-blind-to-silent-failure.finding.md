---
id: e356c8af-5413-58c9-9b8a-9c6013213eb0
page-type-slug: finding
title: "Capture blind to silent failure"
domain-slug: domain/instrument
---

# Claim

The temper error capture registers for exactly two ESO events, `EVENT_LUA_ERROR` and `EVENT_LUA_LOW_MEMORY`, so a failure that raises neither — code that runs to completion and does the wrong thing — never enters SavedVariables and cannot appear in any reading taken from them. `ops temper errors list` declares its residue bound loudly and this capture bound nowhere, so its "(no live errors)" reads as a health verdict over behaviour when it speaks only for raised errors.

# Evidence

Read on main 2026-08-07, in `packages/temper/shared/capture/errors/addon/src/`, and by running the verb.

`error-capture.ts:341` opens `registerErrorHooks`, and it makes exactly two registrations: `RegisterForEvent(LIVE_LUA_ERROR_NS, EVENT_LUA_ERROR, …)` at :342 and `RegisterForEvent(LIVE_LOW_MEMORY_NS, EVENT_LUA_LOW_MEMORY, …)` at :349. The pre-init path is narrower — `registerPreInitHooks` binds only `EVENT_LUA_ERROR` at :309, to buffer errors raised during addon load. `main.ts` wires these and nothing else. So the capture population is raised Lua errors plus low-memory events, and nothing widens it.

The contrast inside the same instrument is what makes this a defect rather than a choice. `ops temper errors list` is careful about the other way its reading can mislead, and says so at length: its help states that `TemperErrors.lua` is "a CUMULATIVE log — counts/lastSeenAt persist as residue long after a fix lands or an addon is disabled, so a raw listing surfaces phantom (already-fixed / extinct) errors as live backlog", then names both staleness signals. A run prints the suppressed count as a loud footer; mine printed `48 stale suppressed (--include-stale to show)`. It even separates the two empty cases: "no captured entries at all prints '(no errors captured)'; entries present but all stale prints '(no live errors)'". An instrument this careful about which nothing it is returning states nowhere that a whole class of failure never reaches it.

`Population` on `domains/instrument.md` is what this contradicts: state the population size where an instrument reports. `domains/instrument-population.md` names the stake — a population is "everything an instrument looked at on one run, and all its verdict speaks for".

Not measured: whether any silent behavioral failure is occurring. This is about what the instrument can see.

Carried out of `dirty/skills/temper/rulings.md`, queued for removal, and re-read against the source rather than copied.
