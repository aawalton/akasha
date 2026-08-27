---
id: 5d4b9936-1901-5a5c-a91f-47c735cc21ba
page-type-slug: finding
title: "Pending mail no exit"
domain-slug: page-type/message
---

# Claim

`public.messages` held 508 live-pending rows (oldest 95.7 days, 249 targets), queue-reachability split 151 undeliverable / 357 stalled / 0 in-flight, 175 of the 508 senderless — undeliverable by `bounceStillPendingInbound`, which correctly never bounces a senderless row since `bounced` asserts return to a sender; nothing terminated them, and the vocabulary lacked a terminal value for a row that will never be delivered and was never `read`.

# Evidence

Project #17267 (domain: message, status: someday_maybe, live-on: deploy); never defined, moved off the retired `notes` attribute on 2026-08-15. Parent of #17278 (adds `skipped` to the type) and #17279 (the skip mechanism/threshold writing it).

Alan (2026-07-29): "this is specifically the pending messages, I'd like everything older than 1 day that hasn't been read to be cleared, marked read would be fine if there isn't a more explicit intervention." A more explicit intervention exists.

Measurements: 508 live-pending rows, oldest 95.7 days, 249 targets. queue-reachability: 151 undeliverable (all RETIRED, 0 absent) / 357 stalled / 0 in-flight. 2026-07-27 baseline of 128 undeliverable still had all 128 stranded plus 23 newly stranded. `bounceStillPendingInbound` (retire-time backstop) wrote `bounced` 11 times all-time; not failing, it DECLARES the hole — never bounces a senderless row since `bounced` means returned to sender, and 175 of 508 were senderless: undeliverable, unbounceable, nothing else terminated them. A sweep clearing the 508 leaves the producers and missing exit intact.

`read` could not be the exit: it asserts a witnessed delivery; writing it on 508 never-delivered rows would manufacture false deliveries and destroy the `created_at` discriminator separating historical unwitnessed `read` rows from witnessed ones.

Principles: Reliability (status reflects what was witnessed; age alone would also expire fresh alerts in the same stock — 57 infra-alerts avg 1.3d, 22 wedge-alerts avg 0.6d); "what fails silently cannot be found by looking" (rules out a one-time sweep, needs the missing exit plus a reportable instrument); Ubiquitous Naming (`message-status.unit.test.ts` asserts the partition); Parsimony (no second mechanism beside the bounce backstop).

Intent: a pending row never to be delivered reaches a new terminal value `skipped` (Alan's word), not `read`, classified in `message-status.ts` so the partition test catches an unclassified case.
