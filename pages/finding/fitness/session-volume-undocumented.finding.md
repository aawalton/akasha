---
id: adbb2048-77aa-53b4-8a81-017cee297b21
page-type-slug: finding
title: "Session volume undocumented"
domain-slug: domain/fitness
---

# Claim

`ops exercise session-show` and `session-finish` both compute and print a session's total volume, and neither one's `--help` says so — a seat reading the help concludes volume is unavailable from the session verbs.

# Evidence

Measured 2026-08-07, while ingesting a quarantined document that claimed volume was reported by these two verbs. The claim reads false against the help and true against the code.

`ops exercise session-finish --help` says, in full: "Stamp completedAt on a session and report its duration … Prints the session id and its duration in minutes." Its flags are `--session`, `--notes`, `--json`, `--notes-file`. `packages/collections/exercises/src/cli/session-finish.ts:8` imports `loadSessionVolume` from `@/tracking/day-volume`, line 73 calls it, and lines 77 and 82 print `totalVolume` in the JSON envelope and as a TSV line. Every invocation emits a field the contract does not name.

`ops exercise session-show --help` says: "Show a session's header (date, schedule day, workout, started/completed) and its logged sets grouped by exercise in set-number order." `session-show.ts:7` imports `computeSessionVolume`, line 140 builds the per-set inputs, line 152 calls `computeSessionVolume(volumeInputs, bodyweight)`, line 162 returns `totalVolume`. Same gap.

The bodyweight the math runs against is documented, which makes the omission legible as one: `profile-set --help` calls it "the singleton client bodyweight profile used for volume math". The profile names the purpose; the two verbs serving it do not name the output.

A seat wanting a session's volume finds none in the help and reaches for `ops tracking strength-sync` — a day-level recompute with a write — or raw SQL, when a read it already ran returned the number.

Not measured: whether other `ops exercise` verbs drift the same way. Only these two were checked. Nothing here compares a verb's declared output against what it emits, so the population is unknown rather than zero.
