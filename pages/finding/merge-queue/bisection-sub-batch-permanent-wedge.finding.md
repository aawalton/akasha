---
id: 167f7980-398e-5ddb-ab2a-609c7df28048
slug: bisection-sub-batch-permanent-wedge
page-type-slug: finding
title: "Bisection sub batch permanent wedge"
domain-slug: domain/global
---

# Claim

In the merge-queue's advanceBatch catch, the creation_paused and degraded_inputs_graph arms both log "will retry next heartbeat" and return, but for a bisection sub-batch that promise is false: three independent, unrelated mechanisms each suppress any re-drive of the resulting forming child, so the branch freezes permanently and silently — surviving even after the triggering condition clears, as it did across a real 78-second pipeline-disable window on 2026-07-25.

# Evidence

Filed by worker-16274 from #16274 Path B, at dalla's request. DIAGNOSIS ONLY — no fix; the remedy is a real design question, posed not presumed.

DEFECT: advanceBatch's catch (advance-batch.ts:77-91) treats two arms (:80 isPipelineCreationPausedError, :86 isDegradedInputsGraphError) as retryable — false for a bisection sub-batch, which freezes permanently. Same shape as #16274's, #16224's fixes.

WHY IT WEDGES: bisect-apply-split-eject.ts:120-130 creates the sub-batch row (forming), commits, calls dispatchSubBatch inline. advanceBatch runs only from reconcile.ts:155/:331, autocommit, no BEGIN (merge-queue-coordinator.worker.ts:149-151); a throw stalls the child. Re-drive is blocked by advanceBisecting, advanceBatchInner's forming route, and applySplitLeft's guard.

CODE CONTRADICTION: dispatch-sub-batch.ts :368-369/:382-383 claim the forming row "persists and is re-dispatched" (FALSE); :391-393 says no re-dispatch driver exists (TRUE). Same false claim at advance-batch.ts:50-51,:61-62.

REACHABILITY: no pause gate precedes dispatchSubBatch — merge-queue pause (batchSize<=0) gates formBatch only (form-batch.ts:12,19,54). creation_paused fires under pipeline_creation_enabled (#14390, dispatch-ci.ts:129-144); dalla's disable, 21:10:47Z–21:12:05Z on 2026-07-25, wedges any split inside past re-enable. degraded_inputs_graph (#14491 Slice 2) is self-resolving, same shape, but outlives the condition.

SEVERITY: rarer than #16274's config-load timeout but permanent when it fires, and silent — one log line, no counter, no dispatch-stall signal.

DESIGN QUESTION: handleSubBatchDispatchFailure (landing with #16274), error-kind-agnostic, could take both arms, superseding the wedged forming child so the parent's hasActiveChild gate reopens and bisection re-derives.

Project #16310, someday_maybe, domain merge-queue. Captured, never formally defined; capture cut at a paragraph boundary. Moved off the row's retired `notes` attribute on 2026-08-15.
