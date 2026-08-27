---
id: 3aca3992-9a22-5450-b89c-3459f66d94e0
slug: probe-indistinguishable-from-orphan
page-type-slug: finding
title: "Probe indistinguishable from orphan"
domain-slug: page-type/alert
---

# Claim

Nothing on an alert event separates a firing made to exercise the path from one a watch made, so a probe fired against a real alert condition slug is indistinguishable at the observer from a condition whose document was never written. Both arrive at the `alert` definer as an unmatched event, and both start a seat to read one.

# Evidence

Events 24861574 (`alert.condition.fired`) and 24861575 (`alert.condition.cleared`) both carry `reference_id=alert-condition-probe-19177`. They are 0.14 seconds apart, at 2026-08-15 16:26:23.88 and 16:26:24.02 UTC. The fired event's payload is `{"source": "probe-19177", "evidence": {"n": 42, "flag": true, "nested": {"deep": [1, 2, "three"]}}}` and the cleared event's evidence is `{}`. Synthetic values and a clear inside a second of the fire are what mark the pair as a probe rather than a condition; nothing in the event's own shape says so.

No document under `domains/alerts/` declares that slug, and all 75 that stand there name real conditions. `alert observe` reported the pair to the `alert` definer as an unmatched event, which started this seat.

Grouping `public.events` where `event_category='alert'` and (`reference_id like '%probe%'` or `data->>'source' like 'probe%'`) returns this one slug and no other, so this is the first such pair in the stream rather than a recurring cost.

Attribution is inferred, not confirmed: the live seat `athena-alert-developer-build-child-deploy-19177` was running at that minute and commit 4a0fce211 carries the same issue number as the slug. I did not ask that seat whether it fired the probe.

I did not measure whether any suppression or test path exists at the observer. `ops alert observe --help` describes none, and I read no observer source.
