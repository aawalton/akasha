---
id: 3253f341-dcc3-52b1-99bb-9466f303d9a8
slug: layoff-ceiling-prescription
page-type-slug: finding
title: "Layoff ceiling prescription"
domain-slug: domain/fitness
---

# Claim

Fitness's progression engine reads only what was performed, never when or whether load can still move, so it prescribes a PR attempt off a stale best after a training layoff and, at a load ceiling, defaults to holding load and adding reps rather than switching to a unilateral variant that can still progress — both observed live in the 2026-07-25 legs session and unaddressed as of this capture.

# Evidence

Source: #16062 (domain: `fitness`), `someday_maybe`. No objective — captured, never defined; retired 2026-08-15. Both parts found 2026-07-25 preparing Alan's legs session, running the real selector and digest against live data. Both are prescription defects; slice 6 adds "time since last performed" as a selection signal, this project would reuse it for prescription.

**Part 1 (priority) — layoff-aware prescription.** `exercise digest --focus legs` on 2026-07-25: legs last trained 2026-06-27 (28 days), target for the first session back was "beat your best" (30x25 from 2026-06-24), no regard for staleness. Alan carries standing `injury-watch` (joint swelling) and `medical-gate` (air quality); a PR attempt on a detrained joint after a month off risks a flare. Wanted: staleness modulates prescription — past some gap, target becomes a re-entry load, not a PR attempt. Must NOT infer detraining from log absence (cf. #16007, cardio capture broke 2026-07-02) — phrase as "no logged work in N days," never "you detrained."

**Part 2 — anchor load-ceiling escape.** Same session, slot 1: Goblet Squat 30x25 @ RPE 3-4 (30 = heaviest owned dumbbell) hit `anchor:stalled-held`, extending reps not load; the unilateral Goblet Bulgarian Split Squat gave RPE 8 at lower load. Holding load/extending reps buys endurance, not strength; the real escape is mechanical — a unilateral pattern halves per-limb load. Wanted: at ceiling AND absent-stimulus RPE/RIR, prefer a progressable unilateral variant; evidence-gated.

A `Weighted Vest` sits `proposed`, not owned — the other escape, Alan's call, not work here.

**Watch item from slice 6:** under score-decides (#16047), a stalled movement stays fresh (0-7d) so recency never rotates it out; rotation-out for a stall must come from the progression signal.

**Verification:** digest must stop targeting 30x26 off a 28-day-old best; an anchor at ceiling with RPE 3-4 must move, one at RPE 8 must not.
