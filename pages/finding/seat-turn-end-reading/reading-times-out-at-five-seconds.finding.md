---
id: 06965099-2e9d-54a1-8c15-7f0ce04839b3
slug: reading-times-out-at-five-seconds
page-type-slug: finding
title: "Reading times out at five seconds"
domain-slug: page-property-definition/seat-turn-end-reading
---

# Claim

The interactive turn-end reading is given five seconds to answer, and on a large turn it does not answer in five seconds. When it does not, the reading comes back unsettled and the turn end is allowed, so the stall guard silently does not run.

# Evidence

Measured on one real turn from this seat's own transcript, replayed through `ops instructions turn-end-reading` against the live proxy.

At the default `--timeout-ms 5000`, three runs in a row came back `allow:unestablished-unanswered` — the model call was aborted before it answered, and `askReader` returns null on abort. At `--timeout-ms 30000`, the same input answered on all three runs: `refuse:NONE`, `refuse:NONE`, `refuse:Announced`.

So the guard's verdict on that turn was a refusal, and at the shipped timeout it was allowed instead. Nothing distinguishes this from a healthy allow at the seat: `domains/seat-turn-end.md` says a reading that cannot settle allows the turn end, which is the right fail-open, and the record it leaves reads as `allow` either way.

The timeout chain is `--timeout-ms 5000` inside `JUDGE_PATIENCE_MS` 8000 in `tools/turn-end-decide.ts` inside the hook's own 30 in `settings/agents.json`. Raising the reading's own bound means raising the two above it, so this is not a one-line change and the headroom to spend is a question for whoever holds it.

What is not measured here is how often it happens across the fleet. One turn is one turn. `ops seat hook-decisions` carries the reason for every turn end, so the rate is available to whoever wants it before tuning anything.
