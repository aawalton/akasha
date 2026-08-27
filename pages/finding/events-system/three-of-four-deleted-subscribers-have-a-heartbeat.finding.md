---
id: a5201727-5995-585e-9d19-cb5d538315e8
page-type-slug: finding
title: "Three of the four deleted daily-tracking subscribers have a heartbeat behind them and the fourth has nothing"
domain-slug: domain/global
---

# Claim

The four subscribers deleted this morning are not one loss but two kinds. Health task,
strength and sleep points were only accelerated by their events; a fifteen-minute
heartbeat recomputes all three and is intact, so it resumes when the supervisor does.
The hourly-confirm is the exception: it performed an act no later sweep can redo, and
has no replacement anywhere. Whoever rebuilds should treat the first three as covered
and the fourth as the only open capability.

# Evidence

Commit `4079c09055` (2026-08-20 06:31 -0600) deleted four modules from
`alanwalton/daily-tracking-worker/src/`, all registered from that worker. Their
behaviour is read from the deleted bodies in the diff; the survival claim I read at
HEAD myself.

Covered by the heartbeat. `health-task-subscriber.ts` rolled up Health task points for
the day a `completed-task` landed; `strength-session-subscriber.ts` did strength on a
`workout-session` update; `sleep-session-subscriber.ts` did sleep on a
`session-tracking` write. In `alanwalton-daily-tracking.worker.ts`, `:14` sets
`PERIODIC_HEARTBEAT_INTERVAL_MS = 900_000`, `:51-67` runs `reconcileAllToday` over
task, strength and sleep each error-isolated, `:86` wires it as the heartbeat and `:87`
reads `subscribers: []`. The events were latency, not the mechanism. Nothing runs
today: `worker-supervisor` reads 0/0, stopped deliberately at 2026-08-20 12:38Z.

Not covered by anything. `hourly-confirm-subscriber.ts` and its decider
`hourly-confirm-decide.ts` were both deleted. On a `question` page answered
affirmatively it closed Alan's open `session-tracking` block at the answer instant,
opened a fresh block carrying the same title, `dailyTracking`, `safetyLevel`,
`difficultyLevel` and `relationships`, and stamped `reconciledAt`. On a free-text
answer it messaged the `amy-alan-handler` seat instead. A later sweep cannot reproduce
either: the boundary is the moment he confirmed, and the rows afterwards do not carry
it.

Its subscription row is deliberately retained, and is the one retained name with no
module behind it.
