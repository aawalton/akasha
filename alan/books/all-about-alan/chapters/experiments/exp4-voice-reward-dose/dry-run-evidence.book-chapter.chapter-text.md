
# Exp-4 harness — dry-run evidence (agent-verified, no Alan)

> Agent-verified dry-run evidence for the Exp 4 voice-reward DOSE harness, captured during #13352 on synthetic input (no real reward lines, no Alan in the loop). Proves the three acceptance criteria — the line set renders through the gapless cloned-voice path, the value×time integral is computable from the captured speaker log, and the grade-capture scaffold records F→S grades joined via the run manifest.

Captured 2026-06-26 during #13352. Proves the harness works end-to-end on
**synthetic** input (two self-labeled test lines, `D1` single-segment + `D2`
forced 2-segment), with no real reward lines spent and no Alan in the loop. The
live `voice-speaker` daemon (main, with the #13324 gapless fix) did the
rendering; the worktree's `exp4-drive` / `exp4-score` did the send + compute.

## (a) The line set renders through the gapless cloned-voice path

`bun ops voice exp4-drive --line-set <synthetic> --persona amy --pace 0` sent two
lines to `alan` attributed to amy. From `voice-speaker.log`:

```
14:44:10.584  rendering message …5326ce clone via amy
14:44:10.658  rendering message …b2846 segment 1/2 clone via amy
14:44:10.658  rendering message …b2846 segment 2/2 clone via amy      ← seg 2 render-start
14:45:47.178  spoke message …5326ce via amy (clone=85927ms) (play=10666ms)
14:46:41.773  spoke message …b2846 segment 1/2 via amy (clone=115489ms) (play=35624ms)
14:46:53.480  spoke message …b2846 segment 2/2 via amy (clone=128163ms) (play=11706ms)
```

- Rendered **via amy** — the persona MOSS clone path, not Kokoro. ✔
- Both `D2` segments' **render-start** markers land at 14:44:10.658 — *before* the
  first `spoke` line — the directly-readable proof that segment 2 renders while
  segment 1 is still pending/playing (the #13324 double-buffer). Segment 2 was
  spoken 11.7s after segment 1 with no mid-message render stall. ✔
- (Aside: the large `clone=` values are a `--pace 0` artifact — all three clones
  queued on moss-tts at once and serialized through the cop. A real paced session
  renders each fresh. Playback was still gapless because the renders completed
  before playback reached them.)

## (b) The integral is computable from the captured log

`bun ops voice exp4-score --run <manifest> --grades <synthetic.tsv>`:

```
line        register   grade   play     value×time (grade·s)
D1          admitted   B       10.7s    32.0
D2          felt       A       47.3s    189.3
────────────────────────────────────────────────────────────────
lines=2 scored=2 total-play=58.0s
TOTAL integral    = 221.3 grade·s
FELT integral     = 189.3 grade·s  (1 lines)
ADMITTED integral = 32.0 grade·s  (1 lines)
```

- `D2`'s two segment durations were summed from the log: 35624 + 11706 = 47330ms
  = 47.3s. ✔ (multi-segment aggregation)
- value×time per line = gradeValue × playMs: felt `A`=4 × 47330ms = 189320 ≈ 189.3
  grade·s. ✔
- Partitioned total / felt-only / admitted-only. ✔ (the protocol's register split)
- `--json` reported `"issues":[]` — a clean deterministic join (manifest
  `lineId → messageId`, no text matching). ✔

## (c) The grade-capture scaffold records F→S grades

The grades TSV (`line_id`, `register`, `grade`, `note`) was parsed and joined: the
synthetic `D1 admitted B` and `D2 felt A` flowed through to the per-line table and
the integral. Register `∈ admitted|felt|none` and grade `F→S` (with ±) round-trip
correctly. ✔

## Coverage

The pure decisions also carry a unit test
(`exp4.unit.test.ts`,
13 cases): the F→S→value map (incl. ± and invalid grades), the `spoke …(play=…)`
log parser (clone, segmented, Kokoro-fallback, non-spoke), segment aggregation,
and the join + integral incl. the no-manifest / no-playback / ungradeable issue
paths.
