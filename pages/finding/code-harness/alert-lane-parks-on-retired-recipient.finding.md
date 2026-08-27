---
id: be8eb963-52eb-50de-af1b-84124ec34267
slug: alert-lane-parks-on-retired-recipient
page-type-slug: finding
title: "Alert lane parks on retired recipient"
domain-slug: domain/global
---

# Claim

An alert lane whose recipient is one hard-wired agent handle parks permanently the moment the seat holding that handle retires, and the silence that follows is indistinguishable from a healthy pipeline. `main-pipeline-alert.singleton` stood parked for two days on `recipient 'dalla' is RETIRED`, and was found only because an unrelated wedge alert routed to the same fallback handle.

# Evidence

Measured 2026-08-03, first-hand, while diagnosing a wedge alert about a different subscriber.

`ops worker-subscriber list-error` gave `main-pipeline-alert.singleton` at `status='error'`, cursor 21882227, 70 pending, `seq_lag` 102177. Stored blob: `lastErrorAt` 2026-08-01T15:13:40Z, message `insertInboundMessage: recipient 'dalla' is RETIRED — deliberately torn down, not crashed.`

Stack: `writeOrThrow` (`packages/agents/shared/db-messages-write.ts:194`) ← `insertInboundMessage` ← `sendEnvelope` (`packages/agents/main-pipeline-alert/src/messenger.ts:32`) ← `manifest.ts:65`. The throw is inside the batch handler, so the mutation transaction rolls back and the cursor never advances.

The recipient is not derived: `packages/agents/devops-monitor/src/operator.ts` declares `OPERATOR_AGENT_NAME = "dalla"`.

The row carries `retry_policy {"kind":"legacy"}` and this error is in no transient class, so `unparkTransient` (`packages/shared/worker-runtime/src/register-events-subscriber.ts:283`) is false and every boot re-register left the park standing.

Measured against a simultaneous park that had a backstop: `alanwalton-fun-points` sat parked 5.8 days, yet `fun-points.worker.ts` composes boot, hourly heartbeat and subscriber onto one `reconcileFunPoints`, and its daily row read 447403 at 11:01 on 2026-08-03, matching the live score. This lane declares no second trigger.

The throwing site names its own remedy: `bun ops seat record <name>`: no delivery path, pulled at the next boot by whoever holds the name.

Instance repaired, mechanism untouched: `ops worker-subscriber reset main-pipeline-alert.singleton --advance-to-tail` moved 21882227 → 21984404, past 70 events whose subjects were all terminal (`ops pipeline status`: `pipelines.non_terminal=0`).

NOT measured: how many other lanes hard-wire a handle; whether any main-pipeline failure went unalerted across 08-01/02, which needs the event history rather than the clean current reading I took.
