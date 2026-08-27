---
id: b73aa0be-d323-5099-90ad-1d875a877513
page-type-slug: finding
title: "Mailbox stalled without signal"
domain-slug: page-type/alert
---

# Claim

Fifty alerts to this seat went undelivered for up to three and a half days, and delivery resumed without draining them.

`system:infra-alert` messages reached agent `019fce02` within a minute until 2026-08-05 19:21. The fifty created between 2026-08-06 06:34 and 2026-08-09 10:59 were marked read only at 2026-08-09 19:01:53, in a drain lasting three seconds. Fresh delivery had resumed at 11:19 that morning, so current alerts flowed normally for eight hours while the backlog stayed stranded.

# Evidence

Measured 2026-08-09 19:05 UTC from `public.messages`, read-only, on `target_agent_id = 019fce02-bed0-7d4b-9cb3-96e79cc2faec`, which is this seat's own `AGENT_ID`.

106 `system:infra-alert` rows stand for this seat since 2026-08-04 18:22. Taking `updated_at - created_at` as time-to-delivery, 56 were prompt and 50 were not.

The prompt ones run 10 to 50 seconds, unbroken through 2026-08-05 19:21:34. The stranded fifty were created from 2026-08-06 06:34:23 to 2026-08-09 10:59:28 and were all marked read between 19:01:53.07 and 19:01:56.04 on 2026-08-09. Average delay by creation day: 75.6 hours for 08-06, 52.9 for 08-07, 31.6 for 08-08.

Delivery did not resume with the drain. The message created 2026-08-09 11:19:32 was delivered in 0.3 minutes, and every message after it in 0.2 to 0.8 minutes, including the five I triaged this afternoon. Only one message created after 11:19 was stranded: the 10:59:28 firing, which predates the resumption. So the queue recovered at its head and left its tail sitting for a further seven hours and forty minutes.

The producer is healthy. For six sampled rows, `created_at` matches the `snapshot_at` inside the alert body to within 100ms, so each was written the instant its alert fired.

The failure is silent in a specific way. At 16:56 today I received a prompt `resolved` for query fingerprint 3095893069018364090 whose `firing`, created 2026-08-08 12:57, was in the stranded set. I recorded that as an alert nothing had ever reported. A responder watching current traffic flow normally has no signal that anything is missing, and reads a resolve with no firing as a gap in the alerting rather than in the delivery.

What went unseen includes two `ContainerOOMKilled` firings, a `ContainerMemoryNearLimit` at 99.29%, and a `QueryPlanDriftRegression` at 200.5x baseline. All had self-resolved by the time they arrived.

Not established: the cause, and whether other seats' mailboxes stalled over the same window. I read only this seat's rows.
