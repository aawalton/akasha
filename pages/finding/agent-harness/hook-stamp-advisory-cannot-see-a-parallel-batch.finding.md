---
id: 95b72295-a872-5f33-977c-4a7b19e904c8
slug: hook-stamp-advisory-cannot-see-a-parallel-batch
page-type-slug: finding
title: "Hook stamp advisory cannot see a parallel batch"
domain-slug: domain/agent-harness
---

# Claim

The `hook-stamp` advisory cannot tell a hook that never fired from one that fired for a sibling call, so it reports both as the act being unable to be shown to have passed the gate — and a seat reading it concludes the fleet's gates may be inoperative.

# Evidence

A porting seat reported that on every one of its writes, the advisory said its last recorded firing named neither `tools/write.ts` nor an `ops` command ending `write`, and that the alternative reading was that the hook had stopped firing and everything it refuses was now inoperative. It could not tell which from where it sat, and said so rather than proceeding quietly.

Measured from the lead seat at 20:08 on 2026-08-12, against all four live worker seats: every one carried a stamp seconds old — `flex-775` at 20:08:01, `flex-774` at 20:07:48, `flex-772` at 20:08:02, `flex-771` at 20:07:37. The hook was firing for every seat throughout. Nothing was inoperative.

`tools/lib/hook-stamp.ts` already states the cause in its own header: an agent's tool calls are not sequential, a parallel batch stamps once per call, and the latest firing may be a sibling's — which it calls noise in an advisory rather than a false pass. The defect is not in the mechanism but in what the reader is told: the advisory presents the ambiguous case in the same words as the catastrophic one, when the stamp's own age distinguishes them. A firing 0.4 seconds ago for another tool is a parallel batch; an absent or minutes-old stamp is a hook that did not run.

The cost is paid twice over. A seat that escalates spends a lead's turn on a false alarm, and a seat that learns to ignore the advisory has been trained past the one instrument that reports a gate which silently stopped.

Not repaired in the same breath deliberately: this is a gate-adjacent path and five seats were writing through it at the time of measurement.
