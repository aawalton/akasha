---
id: 9b7a6255-d8a4-5fee-ac89-afe6991a3b4a
slug: requested-action-is-a-latch
page-type-slug: finding
title: "Requested action is a latch a census cannot see"
domain-slug: page-type/seat
---

# Claim

`requestedAction` stands among the 35 agent-row keys read as never set, and is therefore read as droppable. It is a transient latch rather than a stored value, so a census of standing rows cannot see it whatever its use.

# Evidence

Found while porting `db-agent-actions` into akasha on 2026-08-19. The latch now stands on the seat page's uncommitted sidecar rather than an agent row: `tools/lib/seat-action.ts` sets it and `tools/lib/seat-control.ts` clears it. `tools/lib/supervisor-poll-agent-action.ts` reads the column every poll, and six writers set it back to null once served: `supervisor-adopt-compact-self.ts`, `supervisor-agent-action-clear.ts`, `supervisor-child-crash-write.ts`, `supervisor-iteration-outcome-db.ts`, `supervisor-lifecycle-death-write.ts` and `supervisor-rebind-deps.ts`. Four ops commands set it — `seat compact`, `seat reset`, `seat restart` and `model-gateway swap` — each through `setRequestedAction` followed by `waitForActionCleared`, which polls until the supervisor clears it.

A value written and cleared inside one poll interval stands on no row at any instant a census runs, so zero rows carrying it is what a working latch looks like. `dispatchStatus` is a latch on the same evidence: `buildRequestedActionSet` sets it to `restart_pending` in the same patch, and all six writers clear it in the same patch. `interruptMessage` and `restartArmedAt` are set by that builder too and cleared by those same writers, so the reading holds for them on the same footing. That is four of the thirty-five. `rcConfirmAlertedAt` and `podName` have no clearing path, so the original reading stands for them; the writers of `rcConfirmAlertedAt` were removed on 2026-08-19 as reaching nothing.

Whether a latch belongs on the seat page, in the fast sidecar, or nowhere is a placement call this finding does not make.
