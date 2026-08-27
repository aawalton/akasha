---
id: 9666c3de-a5ec-5019-934c-9545fd88bdad
page-type-slug: learn-everything-topic
node: Art › Particular Arts › Game Design
D: 3
C: 2.79
calibration: -2
updated: 2026-06-25
status: live
capture:
  source: aura-game-design-session-4a6053f1
  through_line: 5695
  through_ts: 2026-06-25T20:23:35.149Z
---

## Frontier
His grip is strong on the **doctrine and judgment** layer of game design and thin on the **concrete mechanic-space**. He reasons about engagement, balance, and progression from first principles (and from his own engineering and systems wells), but he does not yet command the craft's catalog of mechanics or its tuning math — he leaned on Aura for nearly every concrete mechanic and named the gap himself: "we clearly will need to build a bible of game mechanics." The D3→D4 edge is exactly that fluency: being able to generate the mechanic options, not just the principles that select among them.

## Integration
- **Theory of Play, Games & Fun** (strong, bidirectional) — his design judgment is *downstream of* his own axioms of play; the realness-of-progress kill and the un-solving doctrine are applications of his fun/meaningful-choices model. This craft cell is the applied art whose foundation is that theory.
- **Software architecture / his engineering principles** (strong) — he reuses feature-flags ("deployed ≠ enabled"), expand-contract, purity, and dev-server-in-worktree as *design* tools, not just build tools.
- **Systems thinking & optimization** (strong) — player-side he reverse-engineered the live optimization (lead = base output, support scales with lead, flatten-to-equal-rank to collapse cross-level comparison, brute-forced 6-choose-3), and named dominant-strategy / opportunity-cost / sink-vs-decision distinctions.
- **His attraction-map (consistency↔safety / novelty↔arousal)** (medium) — used directly as a design lens ("avoid partial consistency"; differences create meaningful choices).
- **ESO / Temper** (medium) — his live design reference for what the craft does well.
- **Human Behavior & Experience** (weak edge) — engagement/motivation psychology of the player.

## Misconceptions caught
None surfaced as *Alan's* misconceptions in the craft layer — the corrections flowed outward from him. He killed Aura's "two-homes" design on his realness-of-progress principle, sharpened her loose "two steps ahead" into "two *built* dormant mechanics," and rejected her offer to let him pick his own difficulty ("can't ask me to design my own trip hazards"). The one self-correction worth tracking is downstream of the theory cell: his initial sacred "no gacha" rule, later re-scoped to "no extractive preference-manipulation" once he separated a mechanic from a whole game.

## Next bites
1. Build the **mechanics bible** — a catalog he can reason about from principle, converting his derived doctrine into generative command of the mechanic-space (the named D3→D4 lever).
2. Field vocabulary: MDA, Koster's *Theory of Fun*, Schell's *Art of Game Design*, "game feel" — to attach names to the principles he already derives, so recognition catches up to generation.
3. Idle/incremental genre patterns specifically (the genre he's actually building in): standard progression curves, prestige-layer design, balance/tuning math.
4. Economy & balance math — cost curves, sinks, and the tuning he currently hands to Aura.

## Evidence
Floor distributed onto 7 leaves (capture-1): doctrine/principle leaves (engagement-loops, dormant-mechanics/cadence, authoring/GM-doctrine, progress-realness) at D3; mechanic-heavy leaves where he reconstructed Aura's designs player-side (progression/economy, synergy/composition, balance/friction) at D2. The parent D3 is his integrative cross-cutting design doctrine that spans them.

**Cleared (brackets D3 from below — generative design reasoning):**
- The **infinite-idle critique**: distinguished fake "numbers-go-up" infinity from true *mechanical* exhaustion, and named the cure as **infinite re-optimization, not infinite content** (treadmill content = "the enshittification of the mobile games market"). Genre-level design theory, his own.
- The **live-GM "un-solving" premise** and **"two steps ahead = two built-but-dormant mechanics"** (corrected Aura's loose usage → the dormant-mechanics doctrine).
- **GM/authoring doctrine**: the designer must not outsource the trap/difficulty choice to the player.
- **Realness-of-progress as a fun precondition** (single-canonical-save psychology) — used to *kill* a competing design, then decomposed scratch-play into build-speed (keep, via dev-server) vs real-play (one canonical save), and proposed user-scoped saves + a test user.
- **Production/consumption cadence decoupling** (batch-build N mechanics, deploy once) and **signal-to-noise in feedback** (per-rank pings are noise; milestones are events).
- **Player-side optimization mastery**: flatten-to-equal-rank to collapse the cross-level problem; brute-forced 6-choose-3; reverse-engineered lead/support roles from felt feedback.

**Did not clear (brackets from above — D4 Expert):**
- Originated **almost no concrete mechanics** — synergy gating, lineup-of-N, roles (lead/support/anchor), synergy weather, prestige/ascension, role affinity, and the composition/gate-design doctrine were all **Aura's**.
- Named the gap himself ("need to build a bible of game mechanics") — i.e. not yet fluent across the craft's mechanic-space, which is the Expert marker.

**Calibration:** chronically under-claims — disclaims "I don't really know game design" (a self-assessment near Reader, D≈1) while deriving steadily at Scholar level, so calibration ≈ −2. Score the derivation, not the disclaimer.

**Authorship (his vs Aura) on the craft layer:** split cleanly *by layer* — Alan owns the **frame, doctrine, critique, and player-side optimization**; Aura owns the **concrete mechanics and systems implementation**. Frame/principles slices ran ~60–75% Alan; build/deploy slices ~10–15% Alan.

**Provenance:** capture-1 of Alan's Aura game-design session, source jsonl `4a6053f1…`, lines 1–5695, cutoff `2026-06-25T20:23:35.149Z`. See `CAPTURE-LOG.md`.
