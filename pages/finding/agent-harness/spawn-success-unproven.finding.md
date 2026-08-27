---
id: 29d1d988-8871-5874-8962-df71d481a98d
page-type-slug: finding
title: "Spawn success unproven"
domain-slug: domain/agent-harness
---

# Claim

`ops seat start` reports `spawned` with a pid for a seat that then dies at boot, so a caller who treats the verb's success as dispatch waits forever for a hand-back from a seat that never ran.

# Evidence

Dispatching #18148 on 2026-08-07, `ops seat start` returned `{"status":"spawned","pid":441278}`. The seat never claimed its row, which stayed at `awaiting_worker_claim`. `~/agents/<name>/spawn.log` shows the supervisor's own guard refusing: `Fatal: refusing to start claude session: only 7.8 GB MemAvailable (need >8 GB)`, thrown from `enforceMemoryGuard` at `packages/shared/utils/system/src/memory-guard.ts:64` by way of `spawnOrAdoptChild`. `ops seat alive <name>` reported `dead — spawn-state wrapper pid dead (kill -0 ESRCH)`, carrying no clean-exit stamp, so the seat did not record the ending as deliberate.

Both checks read the same >8 GB floor; they differ only in when. The verb's check passed at 8.0 GB and the supervisor's re-read saw 7.8 GB moments later, on a host running 58 live seats. The window between them is not narrow under load, and it is exactly when a manager is most likely to be dispatching.

The failure is silent in both directions. The verb exits 0 and prints a pid, so nothing in the caller's hands says the seat is gone; the row it was dispatched onto is indistinguishable from one nobody has picked up yet; and a manager holding an unfinished tree reads the quiet as work in progress. The refusal that the sibling spawn received in the same minute — `refusing to spawn worker ...: only 8.0 GB MemAvailable (need >8 GB)` — is the honest shape, and it is the one that arrives when the verb loses the race rather than wins it.

What made it visible here was a liveness probe run against the seat name for an unrelated reason. Re-dispatching behind a 12 GB margin and probing `ops seat alive` after each spawn brought both seats up, one on its second attempt.
