---
id: ccc26fff-1805-58a6-a12d-0475d3838469
slug: turn-end-rule-unwired
page-type-slug: finding
title: "Turn end rule unwired"
domain-slug: domain/seat-turn-end
---

# Claim

The consolidated turn-end rule (`tools/lib/turn-end-decide.ts`) is not called by the live Stop hook — which is still `tools/hooks/block-headless-halt.sh` with the arm order this project repairs — so every seat resolved under this project (18465, 17051, 18380, plus the two-seat send case) was stopped by hand rather than by the rule, and `tools/turn-end-dry-run.ts` takes no fixture input, reading live on every run, so a before/after over two passes is not evidence of a rule change's effect.

# Evidence

Project #18751, domain seat-turn-end, initiative consistent-seats, status awaiting_lead_definition, live-on commit.

METHOD (Alan's): one seat at a time — GROUND, FAILURE (failing test on `tools/lib/turn-end-decide.ts`, historical inputs), FIX (rule+tests), FORECAST (`tools/turn-end-dry-run.ts`), RESOLVE (`ops seat revive`), RECORD (`domains/lists/idle-live-seat.md`). Case 2 blocked on #18767 storing a column.

MEASURED WHILE FLEET MOVED: one seat's signals changed 3x/20min; case 2's 2 forecast passes differed by 5 rows, unrelated. Criterion 4 (fixed input) NOT BUILT — dry-run reads live.

NOT WIRED: nothing calls `turn-end-decide.ts`; live Stop hook still `block-headless-halt.sh`. Every seat resolved was stopped by hand. #18745 holds the wiring.

CASE 1: `open-question` stood above every arm reading what's owed, holding the seat on a question `attention-scan` has no path. Moved below both ending arms, above every refusal (`d14114f02eb3`). Seats 18465, 17051, 18380 resolved.

CASE 2: `claude-ios-install-worker-ship-install` stood 19h on a hand-back of #18284 (done 2min later); `amy-readouts-lead-verify-handback-18241` stood 21h on that child. Fix: `no-binding` gets an arm — a send warranted `announce` ends the seat, recorded `announce-sent` (`27aa0568a`); other warrants leave it; 4 seats parked on a send read `unrecorded` didn't move. Suite `turn-end-decide-send.test.ts`. Both stopped by hand, child first.

LEFT OPEN: 4 seats refuse on `no-binding`, stay resident — 11 of ~20 seats have no project row. `announce-sent` absent from `HOOK_DECISION_REASONS`; #18745 must add it. A stopped seat can't be reached: `ops seat stop` writes `stopped`; only `dormant` revives; Alan ruled `dormant` retired, so restart is by message only. Opposite case: `aine-my-strategy-recorder` died right after told to hold; `ops seat exits` reported `recorded=0 coverage=complete`. A seat parked on a prose question writes neither `blockedOn` nor `awaiting_*`, so `blocked-census` misses it.
