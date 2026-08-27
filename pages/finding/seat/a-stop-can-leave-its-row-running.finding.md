---
id: a6b437f9-ca30-5d15-b448-bac917f5146c
page-type-slug: finding
title: "A stop can leave its row running"
domain-slug: page-type/seat
---

# Claim

A seat that stops deliberately can lose its page and keep a row reading `running`. The row write is bounded at three seconds and, until today, its outcome was discarded, so the shutdown went on to remove the page whether or not the row had been stamped. Nothing reconciles the two afterwards, so the row stands as a live seat for as long as the fleet does.

# Evidence

MEASURED 2026-08-19 on `astra`, row `01a01ab1-bc67-76a5-be53-609bfa0fe89c`.

WHAT THE FOUR CARRIERS SAY. Her page was removed at 17:51:50 UTC by the shutdown path, on the commit `astra stopped, deliberate, so its page goes`. `tmux has-session -t =astra` answers `can't find session`. Her bucket states no `supervisor-process`. Her row says `status: running`, `stopReason: null`, `supervisorPid: null`, `lastHeartbeatAt: 17:51:44` — and `updated_at: 17:51:53`, nine seconds after that last beat and three after the page went. So the shutdown reached the row and the stamp is still not on it.

WHERE IT GOES. `writeTerminalStoppedStatus` in `tools/lib/supervisor-lifecycle-death-write.ts` races the patch against a three-second timer and catches every error into an empty block. Both the timeout and the throw resolved as success, and `supervisor-lifecycle.ts` then called `removeSeatPage` regardless. That is a ceiling that does not fail at the ceiling, which `code-quality`'s `Bounded Wait` names.

WHAT STANDS NOW. The write reports `stamped`, `unfinished` or `failed`, and the shutdown records which on its `terminal-status-write-done` event. The row is still left running when the write does not land — what changed is that it is no longer silent.

WHAT IT COSTS. `tools/sweep-seats.ts` takes live rows as its population, so astra reads as a seat in the fleet indefinitely, held only because she still states an on-call and an initiative. The moment either ends she is reported as a live seat holding no assignment — a finding about a seat that stopped hours earlier.
