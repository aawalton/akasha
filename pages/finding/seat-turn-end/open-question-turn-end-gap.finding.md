---
id: 0f984fb8-2408-5fd2-9281-b12ffca21d64
page-type-slug: finding
title: "Open question turn end gap"
domain-slug: domain/seat-turn-end
---

# Claim

Project #17289 (domain: seat-turn-end) found that an interactive seat ending a turn while holding an unanswered question is caught by nothing — all twelve traced would-be detectors abstain, and the one mechanism that can see the state, `outbound-wake`'s open-question verdict, actively grants the stop permission with no age input, so a question open five minutes and one open five days get identical licence; the remedy must be detection, never a block, per `athena-stalls`.

# Evidence

Project #17289 (domain: seat-turn-end, status: someday_maybe, live-on: deploy); never defined, moved off retired `notes` on 2026-08-15. Alan's original question.

Twelve would-be detectors traced, all abstain: the halt hook, `halt-census`, `silent-resumes`, three reapers, the row reaper, the wake-watcher, `attention-scan`, `blocked-census`, the io-wedge roster, and `ops seat active` (a pull with no alert, cannot separate "idle by design, waiting on Alan" from "stalled holding a question").

The one mechanism that CAN see the state uses it to permit the stop: `outbound-wake`'s `open-question` verdict returns true from `outboundWakeAllowsStopAlone`, so `block-headless-halt.sh:270` allows the turn-end and `hook-decision-core.ts:108` classifies it `legitimate`. No age input anywhere — a question open five minutes and one open five days grant identical licence. Its stated reasoning ("answering one wakes whoever holds that handle") holds only for the TYPED answer path; the TAPPED path deliberately wakes nobody (`resolve-question.server.ts:287`) and has fired 4 times in the corpus.

Constraint (from `athena-stalls`): do not invert the licence into a block — a seat with only a question outstanding has nothing to send, run, or retire into; forcing a false assertion costs more than the defect. The remedy is DETECTION.

Success criteria: (1) reportable with seat, question, and duration; (2) reports, never blocks; (3) first run is its baseline, no denominator claim beyond it; (4) built on the existing record — `block-headless-halt.sh:162-185` already writes a JSONL line at every exit incl. the interactive exemption, `hook-decision-core.ts:46` already carries `interactive`→`not-judged`; (5) a zero reads as a zero over a stated denominator (live figures: 0 open, 204 answered, 43 dismissed; median 3 min, p90 53 min, longest 38.1 hrs); (6) age is carried — the current Alan-side APNs badge count names no asker and carries no age.
