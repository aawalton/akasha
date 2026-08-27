---
id: f07d8512-749d-5aa9-b9b0-e4bb2ed3aba3
page-type-slug: finding
title: "Burnt death latch only cleared on revive"
domain-slug: domain/global
---

# Claim

The `deathAlertedAt` once-per-death latch is cleared on exactly one path — revive — so a row whose latch was set without a matching `agent.exit` row having landed has its next genuine death suppressed as a duplicate of a record that was never written. Repairing whichever writer burns a latch does not un-burn the rows already carrying one, and a seat that is never revived carries its poisoned latch permanently. A burnt latch and a death correctly reported once are the same value in the same column.

# Evidence

Read against `~/code` on 2026-08-07.

The clearing path is single and deliberate. `packages/agents/shared/db-agent-status-patch.ts:92-101` returns the revive patch with `deathAlertedAt: null`, and its comment states the reason: "Clearing `stopReason` + `deathAlertedAt` on revive is CORRECTNESS, not [hygiene]" — a stale latch would suppress the alert for a new, distinct death. `rg -n 'deathAlertedAt|death_alerted_at'` finds no other write of `null`.

Both detectors check-then-stamp it. `wake-watcher-daemon.ts:300` reads `latched?.death_alerted_at != null` and skips, logging "already recorded (deathAlertedAt set) — skipping duplicate"; it stamps at `:314`. `supervisor-child-reconcile.ts:408` sets `alreadyAlerted` from `row.death_alerted_at`. `supervisor-child-crash-write.ts:13` records that the third writer never touches the latch precisely because both detectors do.

The harm is already named in the code and reaches no reader of the instructions tree. `wake-watcher-tick.ts:407` carries the comment "`deathAlertedAt` so the seat's next GENUINE death alerts nobody." A comment is not an instruction and no document in `~/instructions` outside `dirty/` mentions the latch at all.

What makes this durable rather than a defect that a fix retires: the two standing findings on the neighbouring gaps, `agent-life/quiet-inbox-skips-exit-record.md` and `agent-fleet/waker-not-read-only.md`, are both about producers. Correcting a producer changes what happens at the next death; it does not touch a column already stamped on a row that will not be revived.

The population is not measured here. The source recorded 64 rows carrying the latch against 5 matching `agent.exit` rows on 2026-07-29. That is its reading, not mine — I did not query the database, and the structural claim above does not rest on the count.

Found ingesting `dirty/skills/agent-harness/findings/seat-liveness-halting-and-stalls.md`, which is queued for removal.
