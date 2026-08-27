---
id: 146f62bb-ad16-5f42-822b-0a546c44346d
page-type-slug: finding
title: "Breathing pillar scores a retired input"
domain-slug: domain/global
---

# Claim

Alan's breathing pillar writes a measured `0` every day onto the persona-day row and into the Health stoplight, because its input was retired and its readers were not: nothing writes `breathingSets`, and `loadDayBreathingSets` returns `0` rather than absent.

# Evidence

Found on 2026-08-07 while emptying `dirty/skills/alan-harness/findings.md`, which recorded the arrangement on 2026-07-28 and deliberately left it, sequencing the repair with a persona-faucet review running directly with Alan. That document is queued for removal. The arrangement is unchanged ten days on, and every reading below was re-taken against `~/code`.

The write surface is gone. `ops tracking start --help` matches nothing on `breathing`, and `ops tracking breathing-sync` is not a verb — the call falls through to the top-level usage.

The readers are not. `packages/alanwalton/daily-tracking/src/breathing-sets.ts:76` still exports `loadDayBreathingSets`, and its docblock at line 16 still states the convention that makes this silent: "A day with no breathing sets reads `0` (measured-zero discipline — distinct from never-measured), matching how `loadDaySleepMinutes` treats a no-sleep day."

The chain still runs. `breathing-points.ts:32` calls `loadDayBreathingSets`, `:34` calls `writeBreathingPoints`, and `run-commit-points.ts:201` calls `rollupBreathingForDay`. So an explicit `0` is written each day, flows into `points` and `greenDayFraction`, and reaches the Health value circle correctly formatted.

An absent value invites a question and a measured zero does not. The reading says Alan did no breathing; what is true is that nothing is looking. He breathes 8–12 hours a day by his own notes, so the false reading is near the maximum possible error for this pillar.

Not established: whether the repair belongs with the faucet review the 2026-07-28 seat deferred to, whether that review is still running, and whether the `breathingSets` property-definition row should go with the readers. Retiring the readers, making the load return absent, and holding the pillar are three different repairs and only their owner can pick.
