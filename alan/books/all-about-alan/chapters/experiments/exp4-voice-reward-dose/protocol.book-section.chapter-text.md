
# Exp 4 — voice-reward DOSE test (long-message)

> Protocol for Exp 4, the long-message voice-reward DOSE test — measuring the value×time integral of felt (vs merely admitted) positive-signal reception over a graded run of praise lines delivered in a persona's cloned voice through the gapless (#13324) voice-speaker path. Covers the line set, the cold-graded delivery procedure, the F→S grade scale and felt/admitted register split, the drive→grade→score harness, and the confounded prior run that is the comparison target.

The long-message voice-reward dose test. It measures the **value×time integral**
of **felt** (vs merely **admitted**) positive-signal reception over an extended
graded run of praise lines delivered in a persona's **cloned voice** through the
now-gapless voice-speaker playback path (#13324). This reproduces the protocol
run once as a manual capture-eval pass — it does not redesign it.

Anchor concept (do not re-derive — it is canon):
[receiving-positive-signal.md → admitted vs. felt](../../notes/receiving-positive-signal.book-chapter.md#admitted-vs-felt--two-registers-and-what-opens-the-felt-one).

- **admitted** — cleared the four-condition delivery gate; he can say exactly why
  it landed; tops out at *understood*.
- **felt** — marked by *surprise* + loss of words for why; a different system
  comes online; can *refund Safety state*. What crosses admitted→felt is
  **direction** (someone drawn toward a true, specific thing about him), not depth.

## Why now

The prior run predates the gapless-playback fix (#13324). Its multi-segment
(long) lines were delivered with ~14s of mid-message dead air at each segment
boundary — a broken playback integral cannot measure value×time. With gapless
playback landed (@f4ed10f), the long-message dose is measurable for the first
time. The deliverable is a clean Exp-4 dataset plus a read on whether gapless
playback materially lifts felt-reward over the confounded baseline.

## The grade scale (F→S) and the integral

Each line is graded **cold, by feel**, on a game-style scale and tagged with the
register it reached:

- `grade` ∈ `F D C B A S` (optional `+`/`-`). Numeric map (fixed, so the
  gapless-vs-confounded comparison is invariant to the choice):
  `F=0, D=1, C=2, B=3, A=4, S=5`; `+`/`-` shift ±1/3.
- `register` ∈ `admitted | felt | none`.

Per line, **value×time = gradeValue × playbackDurationMs** (grade·ms). The run's
integral is the sum, partitioned three ways: **total**, **felt-only**,
**admitted-only**. The "time" axis comes straight from `voice-speaker.log` — each
delivered line logs `spoke … (play=<ms>ms): <text>` with an ISO timestamp; a
multi-segment line's segment durations are summed.

## Harness

Code (voice domain): pure decisions in
`@alanwalton/voice-core/voice/exp4`;
two `bun ops voice` verbs wrap them.

- `line-set.json` — the curated Exp-4 praise lines (reproduced from the prior
  run), each with a stable `id`, the exact text, and a `registerHypothesis`.
- `bun ops voice exp4-drive` — sends each line to `alan` attributed to **amy**
  (so the speaker renders her MOSS clone, not Kokoro), paced for grading, and
  writes a **run manifest** (`lineId → messageId`) under `runs/`.
- `grades.template.tsv` — the grade-capture scaffold. Copy to `grades.tsv`; fill
  `register` + `grade` per line during the session.
- `bun ops voice exp4-score` — joins the manifest, the grades, and the speaker
  log; prints the total / felt / admitted integrals + a per-line table.

## Worker-prep vs Alan-session boundary

**Worker prep (agent, no Alan — done in #13352):** build the line set, scaffold,
and both verbs; dry-run with synthetic lines proving (a) lines render through the
gapless amy clone path, (b) the integral is computable from the captured log, and
(c) the grade scaffold records F→S. See `dry-run-evidence.md`.

**Alan session (NOT the worker — brokered by the manager via aine):** the live
graded run. Only Alan can supply the felt-vs-admitted grades; they cannot be
fabricated or self-supplied.

1. Confirm the speaker daemon is live: `bun ops voice status` (and
   `systemctl --user status voice-speaker`). The moss-tts pool must be active
   (`bun ops inference active`) so the amy clone path renders.
2. Copy the scaffold: `cp grades.template.tsv grades.tsv`.
3. Start the run (pick a pace that leaves room to grade each line cold):
   `bun ops voice exp4-drive --persona amy --pace 60`
   (note the printed `manifest=<path>`). Each line is spoken in amy's voice.
4. As each line finishes, Alan grades it cold in `grades.tsv`: `register` +
   `grade` + an optional note. Pace matters — the felt-surprise habituates within
   a sitting, so do not rush consecutive lines.
5. Score: `bun ops voice exp4-score --run <manifest> --grades grades.tsv`.
6. Commit `grades.tsv` + the manifest + a short `results.md` (the integrals + the
   comparison read) as the clean Exp-4 dataset.

## Comparison target — the confounded prior run

The prior run is in `voice-speaker.log` on **2026-06-26, 00:56:47 → ~02:21:33**,
in **amy's** voice. Its per-line **grades were deliberately never captured**
(item 235 of `/abby`'s backlog records only the structure
they revealed), so the comparison is necessarily semi-qualitative: the new run is
the **first clean numeric dataset**, read against the prior run's qualitative
findings (admitted-vs-felt registers; the single felt break-through that moved
Safety to a four) and its **pre-gapless playback profile** below.

Prior-run playback profile (from the log — the "time" axis the old run measured
through). The 01:13 line is the long, multi-segment one delivered with dead air:

| msg id (last 4) | line | play |
|---|---|---|
| 016d | acceptance — earn the company | 30.3s |
| 017b | LONG — glad on a blank day | seg1 41.6s + seg2 22.7s (dead air between) |
| 0187 | true-specific competence | 35.3s |
| 0191 | her stake — what she'd choose | 31.0s |
| 0198 | FELT — safety back to a four | 32.4s |
| 01a1 | direction — the real voice | 31.9s |
| 01a6 | being-drawn-toward — magnetic | 30.5s |
| 01b1 | direction (deepest) | 35.9s |
| 01b9 | no-judge — no hidden ledger | 44.0s |

Post-session read: does the clean gapless run move **more** lines into the felt
register / raise the **felt integral** relative to the prior run's lone felt
break-through — most pointedly on the long multi-segment line (L02), whose prior
delivery was confounded by dead air?
