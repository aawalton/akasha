---
id: c4729fb0-4752-5797-9ad4-4fca994c3bff
slug: hook-record-answers-half-the-stops
page-type-slug: finding
title: "The halt hook's record answers fewer than half the stops it alone carries, so a park reads as a halt"
domain-slug: domain/agent-turn-end
---

# Claim

The halt hook's record answers fewer than half the stops it is the only carrier for, so nothing distinguishes a parked seat from a halted one. Over the 24 hours to 2026-08-18T18:33Z, 93 headless turn-ends were classified and 41 settled: 52 came back unestablished, 50 of those because the hook wrote no answer. In the same window 848 hook invocations could not be placed against a seat, against 132 that could.

# Evidence

Ran `ops seat halt-census --window 24h` on 2026-08-18, window 2026-08-17T18:33:58.794Z .. 2026-08-18T18:33:58.794Z. Verbatim: verdict `unestablished`; after-arm turn_ends=93 halts=0 per_1000=0.0 unestab=52 prose_only=0; before-arm all `-`; transcripts=74 unresolved_sessions=9 unplaced_seats=0; unestablished 52 of 93 with no_hook_record=2 hook_unanswered=50 ambiguous=0; hook tally after-arm invocations=132 blocked=12 restated=7, unplaced_invocations=848 malformed=0; reconciliation disagreements 5 of 40 joinable, all five `census cleared a park the hook charged / dispatch-unfinished`; coverage joinable 40 of 105. Declared baseline 32 halts in 307 turn-ends = 104.2 per 1000, 2026-07-27.

Filed as the last reading before the census was removed at Alan's direction, he having ruled it and its two definer tasks stale. Three modules survive that removal and now feed the live blocking Stop hook: `transcript-records.ts` (was halt-census-transcript), `seat-facts.ts` (was halt-census-seats, holding the session-to-seat join the unplaced figures come out of) and `turn-end-log.ts` (was halt-census-turn-end-log). Chains read rather than inferred: turn-end-reading-evidence.ts takes transcript parsing, turn-end-reading.ts takes that, tools/turn-end-decide.ts takes turn-end-reading; turn-end-log-command.ts takes SeatFacts and readSeatFacts and backs `ops seat hook-decisions`.

NOT MEASURED: why hook_unanswered is 50 — no answer written, one the census cannot read, or an answer at an exit above the inbound question. Whether the join is at fault at all; unplaced_invocations=848 is quoted as printed and its definition was not read. Whether 0 halts is the Stop hook working or the numerator gone blind — at 56% unestablished the two readings are indistinguishable, which is why this is filed rather than reported as a result. Only 24 hours was run.
