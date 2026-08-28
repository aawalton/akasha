---
id: 20716a79-c003-517f-b39c-d711cb8135a9
slug: turn-end-rule-unwired
page-type-slug: finding
title: "Turn end rule unwired"
domain-slug: domain/agent-harness
---

# Claim

The turn-end rule is consolidated in the instructions repo (`lib/turn-end-decide.ts` etc.) but nothing calls it yet — the live Stop path is still the two code-repo shell guards — and resolving a turn end's mode by its `reason` alone would move census figures off the measured baseline, because `continuation` covers 286 headless and 45 attended records while the code being replaced treated all 331 as headless; only the guard's own name resolves this correctly.

# Evidence

Project #18745, domain agent-harness, initiative harness-in-instructions, status awaiting_lead_definition. The port of every file here is #18904's (Alan, 2026-08-12), a prerequisite; this row keeps only the definition of what an ending means. Alan set it as a singleton worked in the foreground from athena-lead.

DONE: vocab, record parser, day-file helpers (`4fbfc7c5616d`); consolidated rule (`384cad632e61`) — `lib/turn-end-decide.ts` (mode as input, both guards' arms), `lib/turn-end-plan.ts`, `lib/turn-end-refusals.ts`, three suites over 38 cases plus `tests/turn-end-case.ts`; headless-only core retired (`ad3722c03f7b`). Suite: 1,571 pass over 121 files. Four rule mutations run and caught (named in `384cad632e61`).

LEFT: (a) one TS hook importing the rule, replacing both shells and the writer, one Stop registration; (b) move pairing rule and tally here; (c) move censuses onto them, cutting code gatherers to row/transcript reads and the model call; (d) retire code-repo copies and `checks/hook-reasons-mirror.ts`.

BASELINE, 48h to 2026-08-11T14:00:00Z, byte-identical on re-run: halt-census 421 turn ends, 199 refused, 2 halts, 22 unestablished. interactive-census 1,066 turn ends, 260 done, 610 blocked, 193 neither. hook-decisions 2,536 invocations, 200 blocked, 5 restated, none malformed.

DESIGN: mode resolves via record's `mode`, then guard name, then reason; `mode` optional (baseline predates it); 864 orphaned attended-log records carried in on Alan's word.

TRAPS: headless guard is 2 files (`block-headless-halt.sh` 7 arms, `headless-halt-wake.sh` 11 arms); attended guard 1 file, 10 arms; 78 tests (4 suites) invoke the real hook via spawnSync, must port before any shell goes; `interactive-recorded`/`not-interactive` (2/3 of corpus) stop being written but stay valid reasons.

FOOTPRINT: of 12 files, 98,262 bytes touch no db/object-store/model; 34,957 that do are 3 gatherers. Attended log has no reader; interactive-census infers attended stops via `MODE_BY_REASON`.
