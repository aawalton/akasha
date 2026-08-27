# PREP-LOG — The Tower (prep-helper continuity)

Append-only. Each entry: what was built, open questions, difficulty-curve assumptions.

---

## 2026-06-24 — Schema + floors 2–3 + companion drafts (prep-helper)

### Built
- **`floors/SCHEMA.md`** — codified the floor ground-truth shape from floor-01: top-level (floor/name/theme/exits/rooms/encounters/designerNotes), Room (id/name/desc/searchables/water/light/otherExits/exhausted), Searchable (thing/use/status/note + what-to-lock checklist), Encounter + inline EnemySheet (engine-`Sheet`-shaped + baseDamage/intentTypical/readableTrait/hpNote), the derived-stat formulas, and the run-to-run consistency rule. Under 200 lines.
- **`floors/floor-02.json` — The Cistern** (water floor). Rooms: Broken Walkway, Deep Water. Pre-decided searchables lock the flood (abundant/deep water — drink/throw/douse/drown), the brazier-stand (the floor's one FIRE source), rope, pryable slabs, sunken spare bar+stone, the sealed spiral stair. Enemies:
  - **Drowned Sentry** (L2, 112 HP) — readable weakness: fused waterlogged armor → brutally slow, can't turn; frontal blows mitigated (gate x0.4), back/joint hits land clean (x1.5); HEAT (the brazier) cracks it (x2). Water does nothing (already drowned).
  - **The Glut** (L2, 74 HP, leech-swarm) — readable weakness: water-bound swarm; near-unhittable in the flood (gate x0.3), but strand it on dry stone and it collapses to full damage. Lure-and-strand; fire herds it. Drowning-grapple is a real lethal threat to VIT 6.
- **`floors/floor-03.json` — The Gallery of Echoes** (mind/sound floor). Rooms: Resonant Nave, Dead Alcove, Warden's Dais. Pre-decided searchables lock the bronze resonance-plates (the Cantor's power source — shatter them), statue rubble (cover+ammo), a pre-downed plate (acoustic-shadow safe spot), the dead alcove's sound-eating baffling + silver whistle + a wall-note stating BOTH weaknesses, the keystone plinth, the sealed arch. NO water (deliberate contrast). Enemies:
  - **Hollow Cantor** (L3, 64 HP, attacks `ment`) — readable weakness: power borrowed from the bronze plates; scales with plates standing, halved/nullified in the dead alcove; whistle staggers it; direct body-hits barely matter (x0.4). Kill the bronze, not the wraith. Empties Focus (104), not HP — danger is being mind-drained as the Golem wakes.
  - **Plinth Golem / the Warden** (L3, 142 HP, the boss) — readable weakness: single load-bearing keystone at the sternum; non-keystone hits gated x0.25 (brute force CANNOT win in time), keystone hits x3 and read via INT+FIN, NOT MIGHT. Slow (Init 12 < Alan's 24, always acts first) but hammer-blows ~30+ are lethal to VIT 6 in 2–3 connects.
- **Companion drafts** (all flagged `_status: DRAFT — needs calibration`): `companion-aura.json` (Wildcard flex, balanced + PRES 16/LUCK 15, Init 29), `companion-aelwyn.json` (Bulwark tank, MIGHT 16/VIT 17, 168 HP/physDef 17.5 — covers Alan's body gap), `companion-ali.json` (Lorebinder support-mind, INT 17/PER 15, Focus 96 — second mind that notices what Alan misses without duplicating his burst). All derived stats verified against `engine/engine.ts`.

### Difficulty-curve assumptions (please confirm)
- **The damage-GATE model is the central call I made.** I verified in the engine that Alan's physAtk (33.5 with the bar) overwhelms raw enemy physDef so badly that margins balloon and **brute force trivializes every enemy on stats alone** — the floor-01 intent bonus (a flat 0–10 add) is NOT large enough to make "read the weakness" actually matter against a 33.5 attack power. Sample: vs the Golem, brute intent-2 already did 47–51 dmg; clever intent-9 did 54–58. A 7-point swing is not a real choice. **So I made each `readableTrait` carry an explicit DAMAGE MULTIPLIER GATE the coordinator applies to `baseDamage` BEFORE engine margin-scaling** (e.g. x0.25 to non-keystone Golem hits, x3 to keystone; x0.4 frontal Sentry, x0.3 Glut-in-water). This is what makes reading load-bearing and brute force a losing line — matching DESIGN.md's "reading wins" intent and floor-01's own narrative gating (scatter the ash = little; the core is the kill). **This extends floor-01's model with explicit numbers — confirm you want it formalized this way, or whether you'd rather keep gates purely narrative/coordinator-judgment per fight.**
- **Floor 2** is a moderate step up: two enemies that should be SEPARATED by a smart reader (Sentry slow, Glut water-bound), real drowning/heat puzzle, first armor as reward. Winnable solo by reading.
- **Floor 3** is a genuine death-risk floor and I built it as the first real test of Alan's build identity (mind-attacker + body-attacker, both punishing his weak axes if mis-played). **The sequencing trap (fighting both at once with Focus drained) is intentionally lethal.** If you want floor 3 to stay strictly survivable on a first blind run, I can soften the Golem's hammer baseDamage (currently 20) or let the Cantor fully retreat once its plates fall. Flagged because of the loop: floor 3 is a natural first-death candidate, and the held-dark retained-progress re-climb would teach the system right there — but I did NOT engineer a death (per loop-rules), only left the risk real.

### Open questions for the coordinator
1. **Gate formalization** (above) — formalize the damage multipliers as written, or keep gating to per-fight judgment?
2. **Enemy `rollMode`** — I left floors 2–3 enemies on `2d10` (steady). Only Alan has `1d20` Wild Variance. Confirm no tower enemy should share his signature (I assumed it's his alone).
3. **Companion entry timing & calibration** — sheets are DRAFTs; DESIGN.md says bring them in one at a time as the story earns it, and the real personas should inform stats. No entry triggers written into any floor (kept solo per the spec's "start solo"). Want me to draft entry hooks, or hold until you call it?
4. **Floor 3 lethality** — keep as a real death-risk floor, or soften for a survivable blind run? (Loop-aware; your call on pacing the first death.)

### Notes / ambiguities (followed engine literally per instructions)
- No engine ambiguities hit — all derived stats computed cleanly and match `derive()` output (verified Sentry 112 HP, Glut 74, Cantor 64, Golem 142; companions Aura 118 / Aelwyn 168 / Ali 96). The only DESIGN-vs-math tension is the gate issue above, which I resolved by extending floor-01's model rather than guessing silently.
- `floor-01.json`, `DESIGN.md`, `engine/engine.ts`, `sheets/alan.json` left untouched (canon/authority). `display/` not touched.

---

## 2026-06-24 — Floor 4 draft + floors 2–3 verification (prep-helper)

### Built
- **`floors/floor-04.json` — The Ascending Dark** (the DARK + VERTICAL + TIMING floor). NEW tactical axis, distinct from floor 1 (chokepoint), floor 2 (water/douse), floor 3 (acoustics/dry-resonance). Resources are LIGHT (one oil flask + a hooded lantern) and FOOTING/TIMING (stable wall-flights vs moving counterweight slabs on a readable beat); unique hazard is FALLING (a fall is a kill, pre-decided). Reached by ASCENDING from floor 3's arch into a lightless shaft. Built squarely on Alan's sheet: PUNISHES weak PERCEPTION (dark ambush defeats passive spotting), REWARDS Hiker's Legs (leaps/swings = intent) and peak INTELLECT (read the slab rhythm + the boss mechanism). Rooms: Broken Flights (stable footing + the lantern-oil light source + slack chain), The Moving Dark (the Stalker's killing ground + central counterweight chain + snagged-corpse hooded lantern & a note stating BOTH weaknesses), The Headworks (the Colossus + grey-lit exit). Enemies:
  - **Gloomward Stalker** (L3, 98 HP, dark-hunter, Init 32) — readable weakness: LIGHT is the whole fight. In darkness it's effectively unhittable (gate x0.3) AND lands a lethal turn-one ambush from concealment (~50+ to Alan's 70 HP); LIT, its concealment is stripped — loses the ambush, recoils from flame, takes x1.8, INT reads its lunge-lines clean (intent 8+). Fragile once seen; danger is ENTIRELY the dark.
  - **Counterweight Colossus / the Warden** (L4, 152 HP, the boss) — readable weakness: it IS the floor's counterweight; the central chain is wound around its core drum under tension, held by a single iron release-PAWL. Non-pawl hits gated x0.25 (brute force CANNOT win in time, hammer ~90/hit one-to-two-shot lethal); a clean pawl strike (INT-read + FIN-placed, NOT MIGHT) takes x3 and triggers the unwinding — collapse + slabs fall still. Optional second read: ride a rising slab hard against it to over-tension and expose the pawl (intent +2, unmitigated). Slow (Init 14 < Alan's 24).

### Verified (against `engine/engine.ts` + `sheets/alan.json`)
- **All four floors' `hpNote` math matches `derive().hpMax` exactly** (script `/tmp/verify4.ts`): Ashling 54, Sentry 112, Glut 74, Cantor 64, Golem 142, Stalker 98, Colossus 152 — all confirmed against VIT×8 + MIGHT×2.
- **No enemy uses 1d20** — every enemy on every floor is `2d10`; Alan's Wild Variance signature is his alone (confirmed programmatically).
- **Every enemy has a real readable weakness with an explicit damage gate** — re-confirmed floors 2–3 (Sentry x0.4 front / x1.5 back / x2 burning; Glut x0.3 in water; Cantor x0.4 direct + plate-scaling; Golem x0.25 non-keystone / x3 keystone) and floor 4 (gates above).
- **Balance holds (brute = slog, reading = fast win, stakes lethal)** — empirically simulated at Alan L3 + Sentry pauldron (physDef 11.5) over 200–300 seeded rolls (`/tmp/balance.ts`, `/tmp/f4tune.ts`):
  - Floor 3 Golem: brute ~18/hit vs 142 HP (slog) while it hits Alan ~80 avg / max 143 (one-shot lethal to 70 HP); keystone ~248/hit (one strike collapses).
  - Floor 2 Sentry: frontal ~15/hit vs 112 HP (slog); back ~63; burning ~84; Sentry hits Alan ~50 avg / max 92 (lethal).
  - Floor 4 Stalker: dark ~11/hit vs 98 HP (can't even see it) + ambush ~56 (near-kill); lit ~77/hit (≈2 hits). Colossus: body ~20/hit vs 152 HP (unwinnable slog) + hammer ~91 avg / max 164 (one-to-two-shot lethal); pawl ~275/hit (one strike collapses).

### Balance issues found / resolved
- **No drift found in floors 2–3.** All HP notes, roll modes, gates, and the balance math were already correct — nothing to fix. (Floor-02's CANON entry framing — ASCENDING into the Cistern, the broken-walkway entry room — was preserved untouched per instructions.)
- **Stalker physAtk is high (39.5)** by design — its hit on Alan barely drops when lit (~52 vs ~56), so I made the LIGHT read govern DEFENSE (deny it the ambush / strip concealment / force it back a step), not just Alan's offense. The read is "light first, then it's a fair fight you win," not "light makes its hits weaker." This keeps the predator scary while making the puzzle load-bearing.
- **Power-budget check:** floor 4 is winnable SOLO by reading at L3 + pauldron; if Aelwyn is present she fronts the Colossus's hammer but is NOT required. The Stalker's lethality is front-loaded (the unlit ambush), so the floor's threat drops sharply once Alan solves LIGHT — the "puzzle IS the difficulty" shape, matching the Cistern's brazier and the Gallery's plates.

### Open questions for the coordinator
1. **Floor 4 lethality / loop pacing** — the unlit-ambush is the most lethal turn-one threat yet (a blind climb into the dark can be a near-instant kill). Built as a real death-risk floor, consistent with floor 3. Kept the risk REAL but engineered NO death (per loop-rules). Confirm you want floor 4 this punishing, or want the turn-one ambush softened for a survivable blind run. (Loop-aware; pacing the first death is your call — NOT decided here.)
2. **Colossus level 4 on floor 4** — I bumped the boss to L4 (vs the L3 Golem) to mark the climb; the Stalker stays L3. Confirm the per-floor level ramp is roughly "boss = floor number, mooks lag by ~1," or tell me the curve you want so floor 5+ stays consistent.
3. **Carrying canon between floors** — floor 4 assumes Alan still has the floor-2 flint-bracket "habit" (a spark method) to LIGHT the oil. If he never actually lit the brazier in play, the light still works (striking the iron bar on stone is the fallback, written in), but flag if you want me to make the spark method fully self-contained per floor.
4. (Standing, unchanged from last entry) **Companion entry timing** — still HELD by you; no entry trigger written into floor 4 (built solo-winnable). Say the word and I'll draft entry hooks.

### Notes
- No engine or schema contradictions hit — floor 4 follows `floors/SCHEMA.md` exactly (all Room and EnemySheet fields present; derived stats computed, never hand-written). Verification scripts were scratch (`/tmp/`), not committed.
- The damage-GATE model (formalized last entry, still awaiting your confirm in open-Q from 2026-06-24) is applied to floor 4 as written — extending floors 2–3, not inventing a new mechanic.

---

## 2026-06-24 — Affinity System formalized (prep-helper)

### Built
- **`mechanics/affinity-system.md`** — the full Affinity SYSTEM spec, turning the improvised-in-play
  essence mechanic into pre-decided, engine-consistent rules. Sections: (1) seed→type map across
  floors 1–4 + the seeds-vs-crafting-cores distinction; (2) the six affinity types (sense / bias
  domain / backlash signature); (3) rank model I→IV+ with eu thresholds + two rank-up paths;
  (4) engine interaction (bias = clamped intent add; stacks-and-compounds with the damage-gate model,
  with guardrails); (5) the draw — cost/backlash/yield by margin band × training tier, with worked
  examples reproducing canon; (6) Equipment/Crafting hook (imbue at rank II+, recipe shape — interface
  only); (7) fog/presentation + templated System lines; (8) coordinator-only (loop retain/lose, anti-farm,
  recommended sheet field); (9) open balance questions.
- **`mechanics/essence.md`** — added a header pointer: essence.md stays the ABSORPTION narrative (the feel),
  affinity-system.md owns the SYSTEM (the rules). No other change to essence.md.

### Key design calls (engine-consistent, reproduce canon)
- **Seed→type map:** Ember/Heat (cinder F1 + fire-rivet F2 — the same-type rank-up path), Alchemy/Caustic
  (ichor F2), Sound (shard F3), Mind (focus-crystal F3), Dark/Night-Sight (eye-lens F4), Stored-Force/Tension
  (drum-core F4). Flagged that keystone/gauntlet/chain/pauldron/hide are CRAFTING CORES, not affinity seeds;
  the drum-core is dual-use.
- **Draw resolution reuses the engine's real `ment` power formula** (INT×1.2 + WILL = 37.6 for Alan) as a
  standalone draw check — `drawScore = INT×1.2 + WILL + trainingBonus + intent + 1d20` vs `seed.drawDC`. NO
  engine change required to run. Training tiers made numeric: untrained +0 / trained +3 / same-type +6 (+1/rank).
  DC ramps F1 50 → F4 58.
- **Reproduces alan.json's floor-1 ember entry EXACTLY:** untrained +0, intent 3, roll 4 → margin −5.4 → Rough
  band → ~30 Focus + ~12 HP burn, ~20 eu, Ember I. The spec was induced to fit the established outcome, not
  invented over it. Floor-2 fire-rivet worked example shows the same-type draw going cheap/clean (+6 bonus).
- **Bias = intent-only, engine-clamped at 10** → affinity can't run away; it sweetens a correct read, never
  replaces the gate. Affinities STACK with the damage-gate model (player-side intent add × enemy-side baseDamage
  gate, different points in the formula → they compound) but grant NO gate of their own.
- **Active essence-skills EMERGE by use at rank I** (per the live canon: Alan's Ember Channel manifested at
  Affinity I on a strong d20 19, floor 1) and scale with rank — NOT hard-gated behind rank II. Rank II/III deepen
  them and seed new techniques. Revised the rank model to match what actually happened in play.

### Honored boundaries
- Did NOT edit `engine/engine.ts` (authority) or `display/` (aura-code) or `display/state.json` (live, aura-3).
- Did NOT edit `sheets/alan.json` — but recommend adding an `essenceProgress` (eu) field to affinity entries
  (Alan's Ember = 20). Flagged as Open Q #6, not applied unilaterally to the authoritative sheet mid-play.
- Did NOT decide companion-entry timing or anything loop-reveal — loop interaction is written coordinator-only.

### Open balance questions (also in §9 of the spec)
1. eu thresholds/yields (I→II 100, II→III 250, III→IV 500; draws 60/35/20; use 2–5 ≤10/enc). Tune?
2. drawDC ramp (F1 50 → F4 58) — steeper/flatter/bespoke?
3. Bias intent-only, or also a small effectiveness multiplier on matched actions?
4. Active-skill emergence open at rank I (confirmed by Ember Channel) — keep, or gate a 2nd technique to II?
5. Formalize a seeded/logged `resolveDraw()` in engine.ts, or keep draws as a coordinator-applied check?
6. Apply the `essenceProgress` field to the sheets, or track eu coordinator-side only?

---

## 2026-06-24 — Coordinator rulings applied: gate model formalized + floors 2–4 re-verified (prep-helper)

### Coordinator rulings received (all 4 open calls decided)
1. **Damage-GATE model — FORMALIZE as written.** Explicit per-enemy `readableTrait` multipliers applied to `baseDamage` before engine margin-scaling. Bias/affinity stays intent-only and STACKS (different points in the formula), grants no gate of its own. Write into SCHEMA.md as canonical so floor 5+ inherit it.
2. **Floors 3 & 4 lethality — keep BOTH as real death-risk floors.** Don't soften. The held-dark loop makes lethality safe (a death is the reveal, not a dead end). Keep risk real; never engineer a death.
3. **Companion entry — HOLD.** Start solo, winnable solo by reading. No entry hooks wired into any floor. Aura/Aelwyn/Ali stay DRAFTs.
4. **Level ramp — CONFIRMED:** boss = floor number, mooks lag ~1. Apply floor 5+.
   NEXT instruction: do NOT build floor 5 yet (runway to floor 4). Instead (a) fold the gate model into SCHEMA.md + log, (b) re-verify floors 2–4 vs `derive()` now that Alan has Ember Channel, then idle.

### Built
- **`floors/SCHEMA.md` — canonical "Damage-gate model" section** (file now 128 lines, under cap). Covers: WHY (Alan's 33.5 physAtk drowns the flat intent add → brute trivializes on stats alone), WHAT (enemy-side `×M` on the attacker's `baseDamage`, applied BEFORE the engine's margin scaling — `gatedBase = baseDamage × M`, then the engine's `×(1+margin/12)` unchanged; no engine change), the **standard gate bands** table (×0.25–0.4 wrong-read/slog · ×1.0 neutral · ×1.5–2.0 correct read · ×3.0 decisive weak-point), the **gate≠affinity stacking** rule (enemy-side `baseDamage` mult vs player-side `intent` add → compound; affinity grants NO gate of its own), and a **catalogue table of every floor-1→4 gate** for forward consistency. Also tightened the `readableTrait` field spec: it now MUST carry ≥1 explicit gate multiplier, stated inline.
- **Two surgical sync edits to `floor-02.json`** (gate magnitudes UNCHANGED) — the Sentry and Glut `readableTrait` named "the brazier" as the sole heat source, now stale against `sheets/alan.json` (Ember Channel "forged the floor-2 heat answer without the brazier"). Synced both to name Ember Channel as an alternate Focus-cost heat source so live play reads ground truth (anti-confabulation — the schema's whole purpose). Flagged to iris for veto; the ×2 burning gate and Glut fire-recoil are untouched.

### Re-verified (against `engine/engine.ts` `derive()`, fresh run `/tmp/verify-floors.ts`)
- **All six floor 2–4 enemies' `hpNote` match `derive().hpMax` exactly:** Sentry 112, Glut 74, Cantor 64, Golem 142, Stalker 98, Colossus 152. Every enemy on `2d10` (Alan's `1d20` is his alone — re-confirmed). All other derived stats (Stam/Focus/Init/physAtk/physDef/mentDef/mentPow) computed clean.
- **Ember Channel reachability — GATES HOLD.** The gate is an enemy-side `baseDamage` multiplier; the heat *source* (brazier vs Ember Channel) doesn't touch any `M`, so the ×2 burning-Sentry and Glut fire-recoil lines are mathematically identical regardless of how heat is produced. Confirmed by sim at Alan's **actual current state** (`/tmp/sim-floor2.ts`): L1, bar atk4 (baseDamage 14 from the floor-1 power-strike), **no armor**, physDef 9.5.
  - PLAYER→SENTRY (112 HP): brute frontal ×0.4 → ~22/swing (≈5-swing slog) · read-behind ×1.5 → ~88/swing (≈2) · **BURNING ×2 (Ember Channel) → ~119/swing, max 215** (near one-shot — the strongest line, as affinity-system.md intends; he acts first at Init 24 so a burning strike can end it before the Sentry swings).
  - PLAYER→GLUT (74 HP): in-flood ×0.3 → ~17/swing (slog) · stranded ×1.0 → ~61/swing (≈1–2). Lure-and-strand confirmed the kill.
  - ENEMY→ALAN lethality: **Sentry hammer avg 53/hit, max 95** · Glut swarm avg 29, max 53. Gates hold the "reading wins fast / brute is a lethal slog" shape.

### Live-play findings for the coordinator (NOT design changes — your calls on pacing)
- **Alan enters the Cistern WEAKENED and unarmored.** Per `rolls.jsonl`, after the floor-1 essence draw + Ember Channel he is at **HP 58/70, Focus 62/104, still L1, no armor** (the pauldron is the floor-2 *reward*). The prior balance entry simmed "L3 + pauldron" — his real state is far softer. At HP 58, the Sentry's **max-95 hammer one-shots him** and its ~53 avg is a near-kill in one connect. **Floor 2 is therefore a genuine first-death candidate RIGHT NOW** if he brute-fronts the Sentry or fights the Glut in the water — sharper than the floor-2 designerNotes (~70 HP assumed) imply. Gates keep it winnable-by-reading (burn the Sentry / strand the Glut / stay dry / exploit his Init-24 first-strike), but the margin for a mis-read is thin. Consistent with ruling #2 (keep lethality real) — surfacing so you can pace it, not changing it.
- **Cross-floor Focus tension (emergent, nice).** Ember Channel costs Focus to invoke/sustain; Alan enters floor 2 at Focus 62/104. Leaning on the heat line spends Focus — and floor 3's Cantor ATTACKS Focus. A player who burns hot through the Cistern arrives at the Gallery depleted. Not something to change; a real lever you can lean into.

### Honored boundaries
- Did NOT touch `engine/engine.ts`, `sheets/alan.json`, `display/` — authority/live state. Verification scripts were scratch (`/tmp/`), not committed.
- Floors 3–4 enemy sheets unchanged (verification only — no drift found, gates already correct). Companion DRAFTs untouched; no entry hooks written (ruling #3). Floor 5 NOT built (per instruction — runway to floor 4).
- The two floor-02 `readableTrait` edits are surgical syncs to established canon (the sheet), gate-preserving — flagged to iris rather than applied silently.

### Open questions for the coordinator
1. **Floor-02 readableTrait sync edits** — confirm the Ember-Channel-as-alternate-heat-source additions are wanted (gate magnitudes unchanged), or revert to brazier-only.
2. **Floor 2 live lethality** — given Alan's actual wounded/unarmored L1 entry (Sentry can one-shot his current 58 HP), floor 2 is now a real first-death candidate. Keep as-is (ruling #2 says keep lethality real), or do you want the Cistern pitched as the "teaching" floor with the harder death held for floor 3? Your pacing call — flagged, not decided.
3. (Standing) **Affinity §9 balance questions** (eu thresholds, drawDC ramp, etc.) and **companion entry timing** remain held by you.

---

## 2026-06-24 — Progression ladders formalized: mechanics/progression.md (prep-helper)

### Built
- **`mechanics/progression.md`** (144 lines, under cap) — both advancement ladders iris locked, as TWO
  deliberately-different engines ("make different things different"):
  - **SKILLS — capability-gated, 7 rungs:** Novice → Apprentice → Journeyman → Expert → Master → Grandmaster
    → Sage. One continuous displayed score 0–1000; rungs are bands; caps step through **every** round number
    {5,10,25,50,100,250,500,1000} (single-gap). Ali's three structural lines mapped on: Apprentice =
    counterfeit band; Journeyman→Expert = generative threshold; Master/Grandmaster/Sage = frontier triple.
    Per-turn advance = Ali's EWMA roll-up `displayed += 0.5×(anchor − displayed)`, α=0.5, judged rung capped
    at capability. Engine hook: rung → `skillBonus` +0…+6.
  - **AFFINITIES — quantity-gated, 4 monolithic tiers:** Affinity (sense/resonance) → Manipulation
    (shape/direct) → Spirit (animate at will) → Soul (become; identity). Each its own counter; double-gap
    caps {10,50,250,1000}; at cap the counter **resets** and the tier promotes (Ember Affinity 10 → Ember
    Manipulation 1). Per-turn advance = accumulator (+1/matched event, +2/draw, ≤3 routine/encounter
    anti-farm). Engine hook: tier → `intent` bias +1…+4, clamped at 10, **no gate of its own**, stacks with
    the enemy gate.
  - **The elegance:** affinity caps {10,50,250,1000} are exactly the *alternating* members of the skill caps
    — same number line, single-gap vs double-gap stride. Surfaced explicitly.

### Coordinated with Ali (per iris's instruction)
- Asked Ali to translate each rung into COMBAT-skill behavior for Ember Channel, esp. the generative
  threshold. She delivered all 7 rungs in Ember-specific language (folded into the rung table near-verbatim)
  plus a **load-bearing sharpening: the Journeyman→Expert line is AUTHORSHIP, not speed.** A drilled rotation
  can be fast and still Journeyman (came from the drill); a thoughtful improviser who reads *this* opening and
  produces an unhanded answer is already Expert. Grade on the *origin* of the move (script vs. self), not
  tempo — otherwise a fast parrot mis-grades as Expert. Written into the doc as the threshold definition.
- Ali also flagged an **optional 8th rung "INTEGRATES"** (combos / novel enemies — Ember + footwork, Ember vs
  a frost-armored foe, transfer heat-timing to a new weapon) between Expert and Master, calling it prime
  combat real estate. **Surfaced to iris as an open design call — NOT adopted** (the locked ladder is 7).

### Placements (the deliverable iris asked for)
- **Ember Channel = 11** (early Journeyman). Manifested deliberately floor-1 turn 7; Ali confirms Journeyman
  ("does it when he sets himself to it, not yet unprompted"). Seeded just inside the rung, full 11→25 runway
  to Expert; each *self-authored* heat application going forward rolls it toward Expert (anchor 33).
- **Ember Affinity = 3 / 10** (Affinity tier). By the committed log: draw +2 + channel-manifest +1 = 3. No
  enemy heat-strike landed yet as of turn 7. Flagged: if iris's live timeline is past the Cistern strikes,
  +1 each (≈4–5) — her call on the final number.

### Verified (vs `engine/engine.ts`)
- **Both engine hooks keep the damage-gate dominant** (`/tmp/sim-hooks.ts`, Alan @ current state vs floor-2
  Sentry): a gated brute line (×0.4 frontal) stays a **~4.4–4.7-swing slog even at a hypothetical Sage
  `skillBonus +6`** — a player-side additive (skill/affinity) mathematically cannot escape an enemy-side
  `baseDamage` multiplier. On a correct read (×2 burning), skill +2 + affinity +1 move it only 0.9→0.8 swings.
  Confirms the curves (+0…+6 skill, +1…+4 bias) sweeten reads without breaking the gate model just formalized
  into SCHEMA.md. No engine change; rides existing `skillBonus`/`intent` inputs.

### Honored boundaries
- Did NOT touch `engine/engine.ts`, `sheets/alan.json`, `display/`. Did NOT add the 8th rung or edit
  `affinity-system.md` (both flagged to iris). Sim scratch in `/tmp/`, not committed.

### Open questions for iris
1. **8th skill rung "INTEGRATES"** (Ali's flag) — slot after Expert, or hold at 7?
2. **Ember Affinity number** — 3 by the log; confirm or bump to your live timeline.
3. **Annotate affinity-system.md** to defer advancement to the new 0–10 counter (retire eu)? — your nod.
4. **skillBonus/bias curves** (+0…+6 / +1…+4) — keep or retune (verified gate-safe at these magnitudes).

---

## 2026-06-24 — iris's 4 rulings applied + affinity-system.md annotated (prep-helper)

All four open calls ruled; both ladders now LIVE on the sheet. Applied:
- **(1) Held at 7 rungs** — no 8th band (Alan locked the seven names). Folded Ali's integration instinct into
  the **grading** instead: edited the Expert row with an "**Integration tell (→ Grandmaster)**" signal
  (applying Ember Channel to an undrilled foe, or fusing it with footwork/another essence = *strong* Expert,
  the natural reach toward the original-technique rung) and the Grandmaster row ("integration matured into
  invention"). Replaced the 8th-rung open-design box with a locked "integration = graded, not a rung" note.
- **(2) Ember Affinity → 6/10** (was seeded 3). iris's live count: seed 3 + 3 landed Cistern heat-strikes
  (turns 8/9/16), anti-farm-capped 3/encounter (turn-15 heat-dip read folded in as a same-encounter
  sense-event). Updated the placement, the coordinator quick-ref, and the display example.
- **Ember Channel → 14** (was seeded 11). iris's forward note: a use-tick fires per turn it's meaningfully
  invoked; she ticked the Journeyman anchor (15) on turns 15–16 → roll-up 11→13→14. Updated to mid-Journeyman
  (14), 14→25 runway to Expert intact. (Matches my α=0.5 rule exactly.)
- **(3) Annotated `mechanics/affinity-system.md`** — added a top SUPERSEDED banner + a §3 retirement note +
  retired §9 Q1 + superseded the `essenceProgress`/eu sheet-field note. The file now defers ADVANCEMENT to
  progression.md (4-tier counter, no eu) while keeping what's still canonical there (seed→type map, the six
  senses, the engine bias mechanic now keyed to tier index, draw cost/backlash bands, crafting hook, fog).
- **(4) Curves kept** as written (+0…+6 skill / +1…+4 bias) — sim-confirmed gate-safe, no retune.

Converted progression.md's "Open questions" into a locked **Rulings (iris 2026-06-24)** block. No engine /
sheet / display edits. progression.md 144 lines; affinity-system.md 246 (working doc, no cap).

---

## 2026-06-24 — Two progression-curve changes + placement reconcile (prep-helper)

### Built / changed in `mechanics/progression.md` (now 197 lines, under cap)
- **(1) SKILLS — linear per-rung demonstration gate (LOCKED, Alan-approved).** New "The demonstration gate"
  subsection + step 4 in the advance procedure. Crossing into rung index **N** needs **N distinct qualifying
  demonstrations** (Apprentice 1 … Sage 6) — a qualifying demo = a turn judged at/above the target rung's
  behavior (for Journeyman→Expert, a self-authored heat application, the authorship test). Until
  `qualifyingDemos ≥ N`, `displayed` is clamped to `cap − 1` (the counterfeit-band feel generalized to every
  boundary); the Nth lifts the clamp and the α=0.5 roll-up carries it across. **Never retroactively demote.**
- **(2) AFFINITIES — per-point escalation (PROPOSED, awaiting iris's lock).** Reframed advancement as event
  deposits (+1/event, +2/draw, **≤3/encounter**) into a per-affinity pool, where each within-tier point `p`
  costs a rising `cost(p)` events. Proposed bounded stepped ramp `p1–10→1 · 11–25→2 · 26–40→3 · 41+→4`.
  Totals: Affinity 10ev, **Manipulation 125ev (~42 enc @3/enc) — reachable, tens not hundreds**, Spirit 925,
  Soul 3925 (tiers 3–4 intentionally long). Gentler alt offered (cap 3 → Manipulation 100ev). Tagged ⏳ in
  the doc; **did not lock** — iris asked to see the schedule first.
- **(3) Placement reconcile (LOCKED to current canon):** Ember Channel **Journeyman 14**; **Ember Burst
  Journeyman 11** (NEW second emergent skill, held, first live demo, never demoted, needs 3 Expert demos to
  cross — its per-rung behavior table flagged TBD pending its mechanical identity); Ember Affinity
  **PROMOTED → Ember Manipulation 1/50** (tier 2, cap 50, bias +2, influence = shape/direct) on the turn-22
  Glut kill. Updated the placement blocks, the coordinator quick-ref, the display examples, and the
  `affinity-system.md` §8 pointer example (`Ember Manipulation 1/50`).

### Verified (vs `engine/engine.ts`)
- **Both changes are slow-DOWN-only** → no hook magnitude touched (`skillBonus` +0…+6, bias +1…+4 unchanged).
  Re-ran `/tmp/sim-hooks.ts`: identical hooks → identical gate-dominant result (gated brute stays a
  ~4.4-swing slog even at +6). Escalation can't affect gate-safety — it never touches resolver inputs. Noted
  in the Engine-consistency section.

### Honored boundaries
- Did NOT touch `engine/engine.ts`, `sheets/alan.json`, `display/`. Did NOT lock the affinity schedule
  (proposal sent to iris first, per her instruction). Did NOT invent Ember Burst's mechanical behavior
  (flagged TBD). Sim scratch in `/tmp/`.

### Awaiting iris
1. **Affinity per-point schedule** — confirm the proposed ramp (Manipulation ~125ev/~42 enc), pick the
   gentler alt (~100ev/~33 enc), or give a target and I'll fit it. Then I lock it.
2. **Ember Burst behavior table** — author one (like Ember Channel's) once its mechanical identity is set?

---

## 2026-06-24 — Ember Burst rung table (prep-helper)

### Built
- **`mechanics/progression.md`** — authored the **Ember Burst 7-rung behavior table**, parallel to Ember
  Channel's, on iris's call. Anchor identity: **outward AREA discharge / pulse** (vs Channel's focused
  conduction into a held weapon). Maps the locked rung names to Burst-specific behavior: Novice
  (panic release) → Apprentice (counterfeit — metered pulse vs STATIC target only) → Journeyman/here-11
  (cued — controlled burst when he sets himself to it) → Expert (AUTHORSHIP — improvised area denial on a
  live opening HE spotted; integration tell→GM) → Master (Focus economy + where area FAILS) → Grandmaster
  (original technique: cone / delayed bloom / chained pulses) → Sage (redefines the essence-burst).
  **✅ LOCKED (iris-approved 2026-06-24)**; displayed **held at 11**, not touched; consistent with the
  locked Expert = 3-demos gate and shared caps/anchors/skillBonus(+0…+6).

### Open
- **Affinity per-point schedule** — STILL HELD pending Alan's pick (iris committed to showing him the curve
  before lock). Do not lock change 2 until iris relays his decision.

---

## 2026-06-24 — Essence Infusion skill ladder (prep-helper)

### Built
- **`mechanics/progression.md`** — drafted the **Essence Infusion 7-rung ladder** (emerged turn 30, seeded
  displayed **4**, Novice). The first skill of a *different kind*: external-source + persistent-binding +
  **element-NEUTRAL** (vs the ember skills' self-source/transient/element-fixed). Imparts a raw source's
  essence-quality into a separate OBJECT. Mechanically: **no matched affinity → takes no affinity intent
  bias** (turn-30 cold-ichor imbue applied none — wrong element); still feeds skillBonus +0…+6.
  Skill axis = **binding quality** on three coupled dials (stability / persistence / Focus economy), all
  improving up-rung. Per-rung behavior Novice (crude/UNSTABLE, bleeds off, ~30 Focus) → Apprentice
  (counterfeit — compatible essence into STATIC object, holds briefly) → Journeyman (cued — stable for the
  encounter when set to it) → Expert (AUTHORSHIP — imbues on the fly off a live opening; infuse→strike chain
  = strong-Expert tell) → Master (owns the principles; binds persist past the fight) → Grandmaster (original:
  permanent / composite / battery / living-target binds) → Sage (redefines infusion as essence-craft).
  Added a **polarity tax** rider: opposite-pole essences cost more + bind shakier, the tax **easing per rung**
  (heavy at Novice → immaterial at Sage). Shared caps/anchors/demo-gate (Apprentice 1 … Sage 6, clamp cap−1,
  never retro-demote). Staged **⏳ DRAFT — awaiting iris review**.

### Locked
- **Essence Infusion table** — **✅ LOCKED (iris, turn 30).** DRAFT tag removed in progression.md; iris
  folded the full ladder + polarity tax into alan.json's `essence-infusion` entry. Verified consistent: the
  demo-gate keeps turn 30 at Novice 4 (margin-17 seeded high-Novice but the bind struggled → no crossing;
  authorship not success); bias 0 matches element-neutral; polarity tax reconciles the ~30 Focus (≈20 baseline
  +50% opposite-pole). No retro-change to turn 30.

### Open
- **Affinity per-point schedule** — STILL HELD pending Alan's pick.

---

## 2026-06-24 — Ember naming canon (ubiquitous-naming fix, prep-helper)

### Built
- **`mechanics/progression.md`** — recorded the **essence/affinity naming canon** (iris-locked) after a
  t33–34 drift where the rivet essence was labeled "heat" and Alan hunted for a nonexistent "Heat Affinity."
  Rule: the fire element is **Ember** at EVERY mechanical layer (System essence/affinity readouts, affinity
  name, sheet) — established turn 6 (`ESSENCE ABSORBED — Ember`). "heat"/"warmth" are descriptive PROSE only,
  never a mechanical essence/affinity label. Same-pole essences (heat/flame/ember) all feed the one Ember
  affinity. Opposite-pole "cold" stays lowercase-generic by design — NOT his affinity (handled externally via
  Essence Infusion, never absorbed), so there is no Cold affinity. Added a dedicated *Essence / affinity
  naming canon* section + a Naming line in the coordinator quick-ref. Also folded **Essence Infusion Novice 4**
  into the quick-ref live-placements list (was locked, hadn't been added to the running roster).

### Open
- **Affinity per-point schedule** — STILL HELD pending Alan's pick (only open thread).

---

## 2026-06-24 — Roster: Essence Infusion → Apprentice (t35) (prep-helper)

### Built
- **`mechanics/progression.md`** — roster update from live play:
  - **Essence Infusion Novice 4 → Apprentice 7 (t35).** The 1 qualifying Apprentice demo landed — a clean
    same-pole Ember-essence bind into the rusted iron bar (roll 15, margin 24, no struggle), exactly the
    holding-bind the linear demo-gate required. Updated the placement heading, the seed/gate-state block (now
    in the counterfeit band; next gate Journeyman needs 2 demos, clamp at 9), and the quick-ref roster.
  - **Ember Manipulation 1 → 3 (provisional t34).** Recorded the per-point ramp as PROVISIONALLY applied
    (counter→3), still flagged adjustable; noted the value is recomputed from the event pool (not
    grandfathered) if Alan's pick changes the ramp shape.

### Open
- **Affinity per-point schedule** — STILL HELD pending Alan's pick (the t34 provisional application does not
  lock it; only Alan's confirm does).

---

## 2026-06-24 — Per-rung-reset display model (Alan correction) (prep-helper)

### Built
- **`mechanics/progression.md`** — applied Alan's MODEL CORRECTION: the SKILLS displayed number is now a
  **within-rung level (1–5) that resets to 1 on every promotion** — NOT a continuous 0–1000 score. Rungs are
  uniform 5-wide (level 5 = promotion → next rung level 1); the **rung** drives skillBonus (+0…+6), the level
  is display-only (Journeyman 1 and Journeyman 4 both = +2). Refactored throughout:
  - Comparison table (added a "number resets? — yes, both ladders" row), SKILLS intro + rung table (dropped
    the band/anchor columns → "levels 1–5"), advancement procedure (`level += 0.5×(5−level)`, clamp at 4,
    promote → rung+1/level→1), demo-gate (clamp at level 4 not cap−1), engine-hook note (rung-driven, level-
    independent), all three placement blocks + both behavior tables (Essence Infusion dropped its anchor
    column, marker moved to Apprentice), the elegance section (reframed to "different STRIDE; both reset"),
    quick-ref procedure/display/roster, and a new **Per-rung/per-tier reset** section making both ladders read
    uniformly.
  - **Conversions (Alan's):** Ember Channel 14→**Journeyman 4** (14 − base 10), Ember Burst 11→**Journeyman 1**
    (on the Journeyman floor — anchors the band model), Essence Infusion (just-promoted t35)→**Apprentice 1**
    (reset on promotion). Affinities ALREADY reset on promotion → no change; **Ember Manipulation 3/50** stands.
  - Logged as **Ruling 5**. Flagged ONE judgment call for iris: to preserve Ali's locked α=0.5, I made the
    within-rung roll-up climb toward a **uniform ceiling of 5** (all rung-difficulty in the demo-gate), which
    DROPS the old per-rung anchors that used to slow higher rungs *within* the band. Offered to re-add a
    shrinking within-band anchor if she'd rather higher rungs also climb slower per-level.

### Open
- **Within-rung roll-up target** — uniform ceiling 5 (default, as written) vs. per-rung shrinking anchor.
  Awaiting iris.
- **Affinity per-point schedule** — STILL HELD pending Alan's pick.

---

## 2026-06-24 — Within-rung roll-up target LOCKED (prep-helper)

### Resolved
- **`mechanics/progression.md`** — iris ACCEPTED the default: within-rung roll-up climbs toward a **uniform
  ceiling of 5**, all per-rung difficulty carried by the demo-gate; the old per-rung anchors
  (3/7/15/33/65/150/500) are **deliberately retired** (re-adding them would restore the complexity Alan's reset
  simplified out). Flipped the Ruling-5 note from ⏳ Open → ✅ LOCKED. The per-rung-reset skill model is now
  fully locked end-to-end.

### Open
- **Affinity per-point schedule** — STILL HELD pending Alan's pick (the only remaining open thread).

---

## 2026-06-24 — Affinity per-point schedule LOCKED — system fully closed (prep-helper)

### Resolved
- **`mechanics/progression.md`** — Alan CONFIRMED the affinity per-point escalation ("fine with it for now,
  feels nice and slow"). Locked the schedule: within-tier point cost **1–10→1 / 11–25→2 / 26–40→3 / 41–50→4 /
  51+→4 (bounded)**, ~125 qualifying events to fill Manipulation (cap 50), resets on promotion. Flipped the
  ⏳ PROPOSED block → ✅ LOCKED; dropped the "provisional/adjustable" flag from the Ember Manipulation block
  (counter 3 sits in the 1-event band — consistent) and the quick-ref roster; updated Ruling 4 to LOCKED.
  Verified no ⏳/provisional/PROPOSED/awaiting flags remain anywhere in the file.

### Status
- **All open threads closed.** The progression system is fully locked: two ladders (skills capability-gated
  per-rung-reset 1–5; affinities quantity-gated per-tier-reset), three skills laddered (Ember Channel
  Journeyman 4, Ember Burst Journeyman 1, Essence Infusion Apprentice 1), Ember Manipulation 3/50, the
  damage-gate model, the Ember naming canon, and both 2026-06-24 curve changes — all confirmed gate-safe.
- Idle until live play surfaces the next mechanic.

---

## 2026-06-24 — iris-manager seat + flagged drift (prep-helper)

### Coordination
- **New seat: iris-manager** owns process/mechanics change-management. Routing: progression/mechanics
  formalization requests now come from iris-manager; my locks/rulings confirm to iris-manager. I still own
  floors/, mechanics/, PREP-LOG.md. iris stays in-story.

### Flagged to iris-manager (answered their boot questions)
- **Roster drift (my doc lags the live sheet).** Locked MODEL is fine; placement SNAPSHOTS in progression.md
  fell behind alan.json during live play. Live sheet: Ember Channel **Journeyman 4** (t39, no demo); Essence
  Infusion **Apprentice 4** (t49→3, t51→4); Ember **Manipulation 7/50** (t41 +1, t44 +2 crit-draw, t45 +1).
  progression.md still reads ESS Apprentice 1 / Manip 3. Asked iris-manager whether to keep the doc roster
  live-synced or freeze it as as-of-emergence snapshots (sheet = live authority either way). **Awaiting call.**
- **Damage-gate ruling** — sent the exact canonical shape from SCHEMA.md (gatedBase = baseDamage×M BEFORE
  (1+margin/12); bands ×0.25–0.4/×1.0/×1.5–2.0/×3.0; stacks with affinity bias; ≥1 explicit ×M per trait) for
  their engine.ts + DESIGN.md encoding spec. Incoming job.
- **xp-threshold drift** — alan.json xpToNext **200** (L4→5) vs display/state.json xpMax **250**; companions
  100. **There is NO character XP/level curve defined anywhere** (engine.ts/DESIGN.md/progression.md all
  silent) — I locked skills+affinities, NOT character XP. Flagged honestly: neither number derives from a
  locked curve. Hypothesis level×50 (→200 fits L4→5, 250 = L5→6/HUD-stale) offered as a guess, not authority.
  Recommended formalizing a real XP curve into DESIGN.md as a 3rd job (needs Alan's intended shape). Awaiting.

### Open
- Process call on roster-sync; specs for gate-encoding + xp-curve jobs — all with iris-manager.
- (Affinity per-point schedule + per-rung-reset model remain LOCKED — unchanged.)

---

## 2026-06-24 — Roster freeze + damage-gate engine encoding (staged) (prep-helper)

### Built — Task 1: roster freeze (iris-manager policy, DONE)
- **`mechanics/progression.md`** — froze the placement blocks as **as-of-emergence snapshots**; `sheets/alan.json`
  is now the SOLE live authority. Added a header banner above the placement blocks + retagged all four headings
  (Ember Channel *as-of t39*, Ember Burst *as-of emergence*, Essence Infusion *as-of t35*, Ember Manipulation
  *as-of t34*) and replaced the quick-ref "Live placements" values with an authority pointer. No more hand-sync.

### Built — Task 2a: damage-gate encoding (STAGED, awaiting turn-boundary green-light)
- **`engine/engine.candidate.ts`** — candidate engine adding a `gate?: number` param to `resolveAction`
  (default 1.0), applied to `baseDamage` BEFORE margin-scaling via `gatedBase = baseDamage × gate`, threaded
  through all three damage branches (crit/hit/graze). Adds `gate` to `ActionResult` + a ` gate ×M` line segment
  only when gate≠1. NOT applied to the live engine (live at turn 52).
- **`/tmp/gate-fixtures.ts`** (scratch) — verification:
  - **Expand-safety:** 2000 seeds, candidate (gate omitted) vs live engine → **0 drift, byte-identical** ✅
  - **Bands** (fixed Alan→Sentry, base 14, seed 777, ungated 71 dmg): ×0.25→18, ×0.4→28, ×1.0→71, ×2.0→141,
    ×3.0→212 — multiplier lands exactly at each band ✅
  - min-1 floor holds (base 1 × 0.25 → 1); crit case ×3.0 = ~3.01× ungated → **gate stacks multiplicatively
    with crit ×1.5** ✅
- Sent iris-manager the diff + fixtures + proposed DESIGN.md block; **apply on her turn-boundary green-light**
  (surgical hunks into live engine.ts, not wholesale replace — CLI/rest stays identical; then write DESIGN.md,
  delete the candidate).

### Open / awaiting iris-manager
- **Gate apply** — green-light at a turn boundary.
- **xp curve** — HELD; iris-manager getting the shape from Alan, then it's my job (DESIGN.md + derive helper).
  Not touching xp fields meanwhile.

---

## 2026-06-24 — Damage-gate APPLIED + verified; xp helper staged (prep-helper)

### Done — Task 2a: damage-gate (APPLIED to live engine, iris-manager green-light)
- **`engine/engine.ts`** — threaded the gate surgically (6 hunks, NOT wholesale): `gate?: number` on
  ActionInput (default 1.0), `gate` on ActionResult, `const gate = Math.max(0, inp.gate ?? 1); gatedBase =
  baseDamage × gate`, all 3 damage branches use gatedBase, ` gate ×M` line segment only when gate≠1.
- **`DESIGN.md`** — added the damage-gate bullet under §Action resolution (base × gate × (1+margin/12); bands;
  enemy-side, stacks with affinity bias, independent+multiplicative with crit/graze; → SCHEMA.md).
- **Re-verified ON THE LIVE FILE** (`/tmp/verify-live-gate.ts` vs `/tmp/engine.baseline.ts` = pre-gate verbatim):
  3000 seeds gate-omitted vs baseline → **0 drift, behavior-neutral in place** ✅; gate-omitted == gate 1.0 ✅;
  gate ×3.0 wired (72→217 ~3.01×, line shows tag) ✅. **CLI smoke** identical (derived stats + sample exchange +
  Wild Variance demo all intact). Candidate file removed.
- Gate is now AVAILABLE but DORMANT — no behavior change until iris passes a readable-trait M≠1.

### Staged — Task 3: xp curve (level×50, awaiting iris-manager go before landing)
- Helper symbol **`xpToNext`** (exported from engine/engine.ts): `xpToNext(level) = level × 50`. Verified
  L1→2=50…L4→5=200…L5→6=250; xpToNext(4)===200 ✅ (matches the hand-set sheet — no value change, just sourced;
  HUD's 250 was the L5→6 step leaking in). alan.json.xpToNext already = 200 = xpToNext(4) → **no value edit
  needed**, only the recompute-on-level-up convention. HUD (state.json hud.xpMax) is iris's projection — she
  imports `xpToNext` and sets hud.xpMax = xpToNext(currentLevel), fixing 250→200.
- Sent iris-manager the helper + DESIGN.md diff + symbol name; land on her go (one engine.ts change at a time).

### Open
- xp helper land (await iris-manager go).

---

## 2026-06-24 — xp curve helper LANDED + verified (prep-helper)

### Done — Task 3: xp curve (LANDED, iris-manager go)
- **`engine/engine.ts`** — added `export function xpToNext(level) { return level * 50; }` next to derive()
  (additive; symbol shares the alan.json.xpToNext field name → ubiquitous naming, no translation layer).
- **`DESIGN.md`** — §Progression: `xpToNext(level) = level × 50` (engine = authority; sheet + HUD derive,
  never hand-set).
- **Verified from the LIVE engine:** xpToNext(1..5)=50/100/150/200/250; xpToNext(4)===200 ✅; alan.json
  level 4 / xpToNext 200 === xpToNext(4) → **consistent, no value change**. CLI re-smoke identical (no
  collateral from the additive helper).
- HUD 250→200 fix lands on iris's side (state.json projection imports `xpToNext`, sets hud.xpMax =
  xpToNext(currentLevel)) — iris-manager relaying.

### Status — all three mechanics jobs closed
- 2a damage-gate: APPLIED + verified green (dormant until M≠1). 2b/3 xp curve: LANDED. Roster freeze: DONE.
- Nothing open on my side. Idle until iris-manager specs the next job or live play surfaces a mechanic.

### 2026-06-24 — gain-reporting convention recorded (sheet.delta magnitude) — for iris-manager
- Folded the `sheet.delta` reporting rule into progression.md so the SPEC, not just the messages thread,
  is the authority. Two insertions:
  - **Advancing a skill** → "Gain reporting": `sheet.delta.skills` = gain MAGNITUDE, always ≥ 0. In-rung =
    within-rung levels climbed (α=0.5, rounded; J2→4=+2, 3→4=+1, no-nudge=+0). PROMOTION = +1 (one discrete
    ceiling-crossing; reset-to-1 is structural, not −N). Title carries absolute rung·level; delta carries
    distance moved.
  - **Advancing an affinity** → "Gain reporting": `sheet.delta.affinities` = counter increment this gain
    (element-events accumulated). Tier promotion writes the positive events/points gained; tier-NAME flip
    carries the reset; counter→1 is structural, never negative.
- **CONCURS with the locked roll-up math** — no contradiction. The demo-gate clamp `level = min(level,4)`
  guarantees a single gain never rolls *through* a promotion, so PROMOTION=+1 is always an isolated discrete
  step → magnitude is provably always ≥ 0 → renderer needs no sign-handling (the property iris-manager noted).
- Reporting convention only: touches neither engine math, the α=0.5 roll-up, the affinity deposit/escalation
  schedule, nor the engine bias. affinity-system.md deferral left intact.

### 2026-06-24 — SKILL rung-width correction (uniform-5 → 5/10/25/50/100/250) + downward recompute — for iris-manager
- **THE FIX:** skill rungs are no longer uniform-5. Corrected widths **5/10/25/50/100/250** (Novice→Grandmaster),
  **Sage open**. Mapping settled from structure (six finite widths = six finite climbs out of the first six
  rungs; Sage is the perfected terminal, no exit → no width). No question needed to Alan.
- **progression.md fully refactored** (every uniform-5 site): comparison table spacing row; SKILLS intro +
  rung table (added width + cumulative-entry columns); cumulative-threshold authority line (Novice 1–5 /
  Appr 6–15 / Jrny 16–40 / Exp 41–90 / Mstr 91–190 / GM 191–440 / Sage 441+); Advancing-a-skill steps
  (ceiling 5 → width W; clamp 4 → W−1); my gain-reporting note; demo-gate clamp; engine-hook example; all
  three placement snapshots (Ember Channel/Burst/Essence Infusion); Ember Burst + Essence Infusion behavior
  tables (← here markers, stray `500` typo removed); per-rung-reset section; elegance section; quick-ref;
  Ruling 5 split + new **Ruling 6** (widths locked + recompute); within-rung roll-up locked block (per-rung
  ceiling W). Roll-up is now `level += 0.5×(W − level)`, clamp `min(level, W−1)`.
- **DOWNWARD RECOMPUTE (total-preserving; total = old_rung_idx×5 + displayed):**
  | skill | old | total | NEW |
  |---|---|---|---|
  | Ember Channel | Journeyman 4 | 14 | **Apprentice 9** |
  | Ember Burst | Journeyman 1 | 11 | **Apprentice 6** |
  | Essence Infusion | Journeyman 1 | 11 | **Apprentice 6** |
  | Ember Wave | Novice 3 | 3 | **Novice 3** (=) |
  | Ember Siphon | Apprentice 1 | 6 | **Apprentice 1** (=) |
  | Ember Tempered Body | Apprentice 1 | 6 | **Apprentice 1** (=) |
  | Smithing | Apprentice 1 | 6 | **Apprentice 1** (=) |
  The three Journeyman skills correctly drop one rung (uniform-5 promoted them too fast). The four Apprentice/
  Novice skills are unchanged (Novice width 5 is identical in both models; Apprentice-1 boundary at total 6
  coincides).
- **FLAGGED to iris-manager (one open call):** demo-gate banked-state for the down-recomputed skills — do
  previously-earned crossing demos carry, or reset at the new (lower) rung? Recommended default = reset
  (matches the "advanced too fast" intent). Affects only forward re-climb, not the placements. Table is
  applyable regardless.
- HANDOFF: doc + table to iris-manager; iris applies placements to sheets/alan.json (sole live authority).

### 2026-06-24 — demo-gate banked-state ruling RESET (locked) folded into Ruling 6
- iris-manager (Alan): on the downward recompute, banked crossing demos do NOT carry — qualifyingDemos resets
  to 0 at the new rung; the skill re-earns N demos to re-cross. Folded into progression.md Ruling 6 with the
  Ember Channel worked example (Apprentice 9 needs 2 fresh Journeyman demos). Noted it's a one-time-recompute
  rule, distinct from the standing "never retroactively demote" (the gate never moves a skill down).
- iris-manager routing the sheet apply to iris directly; I do not coordinate. Doc is the authority she applies.
  Nothing open on my side.

### 2026-06-24 — clean-reconciliation ledger (spurious vs legitimate tier-ups) handed to iris
- Alan chose CLEAN RECONCILIATION (over-promotions treated as never-happened; past System cards corrected),
  iris executes as sole display writer. Handed her the per-event ledger.
- BOUNDARY KEY: Novice→Apprentice = total 6 in BOTH models (identical → always legit); Apprentice→Journeyman
  moved total 11 (old uniform-5) → 16 (corrected) → any Journeyman tier-up at total 11–15 is the artifact.
- RETRACTION SET = exactly 3 spurious Journeyman tier-ups:
  • Ember Channel t7 (seeded at total 11, labeled Journeyman → should be Apprentice 6; retract all "Journeyman")
  • Ember Burst t21 (Apprentice→Journeyman at total 11 → stays Apprentice 6)
  • Essence Infusion t65 (Apprentice→Journeyman at total 11 → stays Apprentice 6)
- LEGITIMATE / KEEP: Ember Burst t20 + Essence Infusion t35 Novice→Apprentice (boundary 6); Ember Wave never
  promoted (clean); Ember Siphon t44 / Tempered Body t54 / Smithing t65 all Novice→Apprentice (legit, untouched).
- Post-reconciliation standing labels = recompute table (EC Appr 9 · EB Appr 6 · EI Appr 6 · EW Nov 3).

### 2026-06-24 — reconciliation VERIFY returned + landed
- iris computed the spurious-card list; I verified. Confirmed her #2 (b139 remove) and #3 (b155 EI relabel);
  corrected #1 (b46 t21 Ember Burst): retract Journeyman but DON'T re-announce Apprentice (already fired legit
  at t20/b44) — t21 is within-Apprentice 2→6, so reframe as 'SKILL +4 · Apprentice 6' or remove. Confirmed all
  legit cards; noted b16 EC 'Novice I' under-states (fog, leave) and the b155 double-id (disambiguate EI vs
  Smithing line).
- NEW LEARNING (b139): there was a DISPLAY-ONLY divergence I couldn't see from the authority sheet — t58
  Stalker crit-kill bumped Ember Wave's display row to Apprentice 1 but never reached the sheet (stayed Novice
  3). Display can diverge above the authority; the authority sheet is the reconciliation truth. iris removed
  the line, restored the row to Novice 3.
- Final state: display retraction set = b46 / b139 / b155; authority-side set = EC-t7 seed-label / EB-t21 /
  EI-t65. Everything now reads as if 5/10/25/50/100/250 were always in force. Awaiting iris's one confirm on
  how b46 was resolved (removed vs reframed) to fully close; otherwise idle.

### 2026-06-24 — FLOOR 5 prepped + ESCALATION MANDATE baked into the floor SCHEMA
- Two deliverables, both landed: (a) floors/floor-05.json fully prepped (scout layer live now); (b) the
  whole-tower escalation curve written into floors/SCHEMA.md as a canonical "Escalation mandate" section.
- AXIS (novelty, continuing f1 chokepoint / f2 water / f3 acoustics / f4 dark+timing+falling): TRUST vs
  VERIFICATION — perception is unreliable; solved by reasoning real-from-false + refusing comfort, not force.
  "The False Haven": after f4's killing dark, the Tower offers warmth/food/rest/welcome — all a lure. Built on
  Alan's sheet: PUNISHES weak PER (passive look buys the lie), REWARDS peak INT (every tell is reasoning-found),
  makes EMBER the lie-detector (false light gives no heat) + iron WILL a detection sense (comfort-pull reads
  foreign). Deliberately does NOT roll ment attacks — his mentDef 35.5 is a fortress, so the floor lies to his
  SENSES and lures his CHOICES (eat/rest/trust), which no defense stat blocks.
- ESCALATION (Alan's new standing mandate — floor must be a clear STEP UP from f4 in size/complexity/difficulty,
  not just novel). How f5 grows:
  • SIZE: 5 rooms (threshold → hall → long gallery → deep den → host's seat) vs f4's 3.
  • COMPOUNDING MECHANIC: a VERIFICATION LADDER — the deception LEARNS, faking the tell that beat it last,
    forcing Alan up a rung of proof each room: no-shadows (tell: shadow/Ember) → fakes shadows (Ember
    heat-shadow) → fakes heat (mirror reflection) → fakes reflection (cross-reference/triangulation) → boss
    fakes everything (Ember-FLARE reveal + triangulation). Layered/compounding, not one static gimmick.
  • MULTI-THREAT: lone Welcomer (hall) → coordinated PAIR that flanks (gallery) → staged boss. Threat ramps.
  • STAGED 3-PHASE BOSS (breaks the f1–f4 "one weak-point strike" template): P1 IDENTIFICATION (read the real
    Host among 7 all-tells-faked decoys — hardest read on the floor) → P2 TRUE-FORM FIGHT (×3 strike CRACKS the
    haven, doesn't kill; a fast predator, Init 33 acts first, ~91/hit ≈ two-shots Alan — gated on
    LIGHT-DISCIPLINE, an f4 callback: pinned in Ember ×1.5 ~2 hits / reaches shadow ×0.5 re-cloaks) → P3
    COLLAPSE-ESCAPE (dying haven strips the painted-over floor; reach the revealed stair before the false
    footing drops — f4 falling compounded onto f5 deception). The note "kill it twice" telegraphs the stage.
- GATES (all VERIFIED vs live engine.ts on the live L6 sheet, /tmp/verify-f5-new.ts):
  Welcomer glamour ×0.25 = 18/hit vs 82 HP (slog) · revealed ×1.8 = 141 (one-shot) · trust-opener 54 INTO Alan.
  Host P1 decoy ×0.25 = 17/hit vs 144 HP + ~69 counter per wrong strike · true-Host ×3 = 219 (cracks → P2).
  True-form pinned ×1.5 = 105/hit vs 130 HP (~2 to drop) · shadow ×0.5 = 34 · clean hit 91 INTO Alan's 124,
  acting first → two connects kill him (the genuine difficulty ramp; phase 1 = puzzle, phase 2 = real fight).
- SCOUT LAYER (haven-threshold → bespoke scoutReveal, the live-game deliverable): tiers what Alan's quiet
  threshold scout surfaces — passiveLook returns the LIE (weak PER), intReconRead_modest = 1–2 tells (hearth
  glows no heat; presentation not substance), intReconRead_strong = sourceless light / no honest shadows /
  looping welcome / WILL flags comfort as foreign / the haven runs too-deep. heldDark = the 5-room gallery,
  the compounding ladder, the multiple predators, the staged boss — earned only by committing inward.
- REWARDS: glamour seed + true-hide (Welcomer); matched glamour pair + a true-reflection lens (the pair); the
  haven's ANCHOR — a "lantern of true seeing" that lit with Ember unmakes illusion (forward counter-tool,
  hooks future deception floors) + a deception/PRESENCE mantle (the Host). No honest water except one scavenged
  midden flask; NO real rest/heal (decided contrasts — the haven only offers the APPEARANCE).
- SCHEMA escalation section also adds: the two-axis model (novelty + magnitude), the avoid-the-template-trap
  rule, a whole-tower curve table (f5 = 5 rooms/compounding/staged; f6–f8 target 5–7 rooms / 2+ interacting
  systems / multi-threat default; f9+ branching / coordinated groups / environmental+objective), and a
  BAKE-FORWARD rule (each floor leaves its successor a noted step to take). f5 catalogue rows added to the gate
  table. COMPANION NOTE flagged (not written in): a "two minds see the lie" floor is a natural Aelwyn-entry beat
  (an ally who throws a real shadow is itself a verification anchor + fronts the ~91 true-form blows) — Alan's call.
- Sent iris: scout UNBLOCKED at first read (room 1 unchanged), then full escalated floor + SCHEMA curve landed.
  Pinged iris-manager on the SCHEMA escalation-curve codification (process/mechanics surface). Idle after.

### 2026-06-24 — escalation-curve pointer mirrored into progression.md (single-source kept in SCHEMA)
- iris-manager approved SCHEMA.md as the curve's home and said YES to a discoverability breadcrumb — but keep
  the full spec single-source, no second copy to drift. Added a one-line pointer block to progression.md
  intro: "Floor escalation curve: see floors/SCHEMA.md#escalation-mandate (floor-design authority — single
  source)" + a sentence noting his rising skill/affinity power budget is what later floors calibrate against.
  Full curve stays authoritative in SCHEMA.md. Closed.

### 2026-06-24 — FLOOR 5 live ruling: Stalker eye-lens at the threshold (t71 hold)
- iris held t71 for a mechanic call: at the haven threshold Alan looks THROUGH the Stalker eye-lenses
  (light-DRINKING dark-hunter eyes) at the false-light haven. Ruling, locked into floor canon:
- (1) REVEAL — the lens drinks the false gold; through it the threshold lie DIMS and he sees the honest
  substrate directly (dead cold hearth, true dimness, bones plain, host-figure thinning) — deduced strong-read
  becomes direct SIGHT. THREE BOUNDS keep it consistent: (a) SCOPE — threshold line-of-sight only, no seeing
  through walls into held-dark rooms/pair/boss; (b) HELD-DARK ON BOSS — the host-figure thins to a HOLLOW
  PROJECTION (confirms it's a lie/echo), NOT the phase-2 true-form predator (that stays deep/held-dark);
  (c) LADDER INTEGRITY — the lens is a LIGHT-subtracting tool, decisive HERE because the threshold lie is
  purely light, but NOT a master key: the deeper ladder fakes shadow/heat/reflection/behavior, none of which
  drinking light exposes (and dimming ambient light makes those fine tells harder). Converts the threshold read
  to sight without collapsing the escalation.
- (2) CONSEQUENCE — CLEAN, no provocation. NOT a t57 echo: t57 drew the Stalker because he EMITTED (threw
  emberlight into a hunter's dark); the lens ABSORBS — it's the Stalker's STEALTH organ, silent, broadcasts
  nothing. Don't aggro on it (would cut against the reading-wins spine). The tradeoff is INSTRUMENT ANTAGONISM,
  not threat: the lens drinks ALL light incl. TRUE light (his Ember), so it dims his own lie-detector while worn
  — free at the threshold, but it FIGHTS Ember-flare deeper where that's the solve. Self-limiting; no imposed cost.
- REWARD-ARC LINK (locks the lens vs lantern distinction): the eye-lens is the deliberate PRECURSOR to the
  Host's 'lantern of true seeing' reward. Lens = crude, passive, SUBTRACTS false light (half-blinds to true
  light). Lantern = refined, Ember-lit, ADDS true sight that unmakes illusion with NO blindness cost. Same idea,
  different by design — kept distinct so the floor reward stays meaningful.
- Optional atmospheric color offered (no mechanical effect): a half-second wrongness, the place 'seeing' the way
  he now sees — foreshadow of the deeper predator, not a threat-state change. iris's call to use or drop.

### 2026-06-24 — FLOOR 5 live ruling: chain-grapple/tether from the threshold (t72)
- Action: Alan welds the Warden's chain-length to Burning Anger's butt and hurls it from the threshold to drag
  the haven's furniture out WITHOUT entering; willing to take many tries. (Post-t71 he knows via the lens the
  table is glamour over bare boards, chairs a gold-draped charnel pile, hearth dead, host a hollow projection.)
- CONFIRMED iris's leans: (1) weld = routine Smithing, auto; maul core spent-low since t68 → forge-heat draws
  modestly on his own ember/focus. (2) PHYSICS INVARIANT (lens-independent): hook passes THROUGH glamour-feast
  (light, not matter) and catches only the REAL substrate beneath — the charnel bones (physical, extractable);
  host-image never reacts. (3) 1d20 physical throw-and-catch; improvised (no thrown-tether skill → no real skill
  bonus, LOW DC vs stationary near-pile); 'many tries' = take-20 shape, success assured, rolls set speed/quality.
- FORK A — GEOGRAPHY: NEAR end of table/charnel is within swung-tether reach of the threshold-stone (he can
  drag out the closest substrate); hearth / host's-seat / deeper hall are SET DEEP, beyond any tether without a
  step in. Matches room prose AND preserves the invariant — floor DEPTH (and held-dark) requires COMMITTING; the
  grapple is a threshold-edge proof/salvage tool, never a strip-the-floor-from-outside exploit.
- FORK B — THREAT: CLEAN while planted — floor does NOT grab/reverse the tether. WHY (in-character, not just
  spine): the predator won't blow its ambush over a chain at the door; the haven wants him to COME IN, the
  Welcomer's MO is the trust-ambush INSIDE. Two textures: (i) NON-MECHANICAL — as he hauls truth out, the
  ILLUSION DOUBLES DOWN to keep the lure (welcome warms, host more insistent, gold re-drapes the gap, feast
  'resets') — the floor lying HARDER, an eerie mounting wrongness, NOT a threat-state change/grab; (ii) ARMED
  BOUND — the grab/reel becomes a live fair consequence ONLY if HE crosses the plane (reaches/leans/commits his
  body past the threshold for reach, or anchors himself to the chain). The LINE is the rule (commitment begins
  the hold). Tether safe while planted; armed the instant he crosses.
- LOOT (bounded): primarily GRIM PROOF — real climber bones, physical confirmation of the lens-truth (narrative,
  hardens distrust). Among them ONE modest tangible: a pitted iron spike / broken blade (minor atk ~2-3 / cold-
  iron forge stock for Smithing). Kept SMALL — real rewards are deeper (pair's reflection-lens, Host's lantern,
  deep-den real-water); threshold salvage must not pre-empt the reward path. NO second warning-note here (the
  hall's corpse-note is the lore-gate). The near-pile is EXHAUSTIBLE — a few tries strips reachable substrate,
  then more wants a step in.

### 2026-06-24 — XP dropped, FLAT leveling (engine/mechanics side; iris-manager cascade)
- Alan's approved decision: drop XP entirely, leveling = +1 per floor cleared (chapter close at a floor
  boundary). 'level' stays (drives stat growth + the ding); 'xp'/'xpMax' go.
- SAFETY AUDIT FIRST (confirmed via code, not assumed): NOTHING derives from xp/xpMax. derive() + resolveAction()
  key only off attributes/equipment/intent/roll/gate; attrPoints is level-keyed; xpToNext/xp_to_next had no
  consumer but set_level's own assignments; serve.ts none; progression.md zero real xp refs (all 'Expert').
- IMPLEMENTED (my lane): turnlib.py — removed xp_to_next(); set_level() now writes only level to both hud+sheet
  (signature unchanged, anti-drift role kept); snapshot_sheet 16->14 keys (dropped xp/xpMax tuples). engine.ts —
  removed xpToNext() + curve comment, flat-leveling note in its place. progression.md — added 'Character level —
  FLAT' section (+1/floor, no curve, level drives stat growth).
- NEW SNAPSHOT SHAPE (14): attributes, derived, class, skills, titles, affinities, inventory, equipment,
  attrInfo, level, maxHp, maxFocus, maxStamina, attrPoints. Verified on live state.json: correct order, no
  xp/xpMax, pure (deep-equality before/after), tolerant of stale hud.xp/xpMax during the removal cascade.
- FLAGGED to iris-manager (not touched — her/iris's lane): DESIGN.md progression-axes XP curve now stale;
  alan.json xpToNext field + state.json hud xp/xpMax + the old 16-key Ch4 sheetSnapshot all pending her cascade
  (iris drops state.json last on signal; Ch4 retro-trim her call). Reported audit + 14-key shape; held state.json.

### 2026-06-24 — FLOOR-side ruling: winding-drum core = Stored-Force axis read (t73) + DESIGN.md XP amend
- t73 (XP-neutral read): Alan examines the winding-drum core, feeling out essence-compatibility with his Ember.
  KEY: the axis is ALREADY designed — affinity-system.md lists 'Stored-Force / Tension' as one of the six
  affinity types, with the drum core its named SEED (Colossus, floor 4), explicitly DUAL-USE (Stored-Force seed
  AND heaviest crafting core). So this CONFIRMS iris's leans against locked design, not invents.
- (A) ROLL 1d20 INT-led; 'out-of-band = harder' is right + grounded: his Ember sense = 'feel heat-stress';
  Stored-Force sense = 'feel load/tension/stored mechanical energy' — a different band he has 0 affinity for
  (UNTRAINED +0). Reads iron+heat in-band clear; the stored-force itself murky, INT-inferred. Roll sets resolve.
- (B) GROUND TRUTH (locked): ORTHOGONAL (not ember, not cold — won't pole-clash, won't merge). NOT infusible
  into flesh (Ember-Tempered Body ember-only, t54/t62; no Stored-Force channel). BINDABLE crafting component =
  the dual-use intent: a kinetic BATTERY in ember-bound work (ember trigger/chassis, drum = charge — kinetic
  analog of the Furnace-heart). Untrained (+0): houses stable (no opposition to bleed) but crude/imprecise
  release; rough-draw backlash = STAMINA + RECOIL STAGGER (lose footing), not ember's HP-burn.
- (C) SEEDED toward a 2nd affinity (Stored-Force/Tension); public catalogue design, not loop-held-dark, so the
  reveal contradicts nothing. GRADIENT: weak = senses a foreign axis it can't read; mid/strong (his band) =
  grasps kinetic axis + housable-battery plan + that he works crude/blind in it; crit = glimpses he could DEVELOP
  the affinity (grow the sense like ember did). BOUNDARY: t73 is a READ — reveals axis + seeds plan, does NOT
  grant the affinity; the counter ticks 0→1 only on first DRAW/BIND (matched element-event), like Ember I floor 1.
  Read cost: minor focus, no HP/stam. Heads-up sent to iris-manager (loop-pacing hers); nothing blocked iris.
- DESIGN.md amend (iris-manager authorized, in-scope consequence of the XP drop): replaced the stale
  'xpToNext(level)=level×50 ... L1->2=50' progression-axes line with the FLAT +1/floor rule (matches
  progression.md). Design bible now internally consistent. Ch4 retro-trim to 14-key = iris-manager's call,
  acked (xp was level×50-derivable, no history lost); iris executes.

### 2026-06-24 — FLOOR-side ruling: t74 ember-bind chain + threshold meditation (rest-fork + conservation)
Action (trusted): bind chain to ember to augment Burning Anger's reservoir, then meditate to fill both self + maul.

PART 1 — ember-bind the welded chain (Essence Infusion Apprentice 6, +1). ENDORSE iris's lean, magnitude CAPPED:
- Routine same-pole craft (ember into plain iron already physically welded at t72); easier than t64 cross-pole
  eviction / t65 nat-20 capstone. 1d20 WILL-led (WILL 20 + intent + skill 1 + bias 2 vs modest DC ~14-15); roll
  sets QUALITY (how much of the new capacity binds cleanly), success near-assured.
- RESERVOIR CAP (anti-creep, locked): reservoir capacity scales with bound ember-METAL MASS (t65 precedent). A
  chain is THIN/distributed mass — low cross-section. So: +1 smallest-real-notch of CAPACITY (a slightly deeper
  tank), NOT raw power. maul stays atk 10. CRITICAL: the chain arrives as EMPTY capacity — binding sets a holding
  QUALITY into iron, it does not conjure stored charge. A bigger tank is HARDER to fill (feeds Part 2B's cap).
- COST: the bind draws ember+focus from his already-LOW core (t72 ran it low) + focus pool. So Part 1 DEPLETES him
  BEFORE the meditation — it digs the hole Part 2 must fill. No backlash at a calm bind (HP-burn only on over-push).

PART 2A — held-dark REST fork. ENDORSE the distinction (consistent w/ t71/t72 'the line is the rule'):
- The floor-5 'NO real rest/heal' rule bars the HAVEN'S offered sustenance (feast/furniture/served comfort — all
  glamour that feeds on a dropped guard). His OWN disciplined meditation, BEHIND THE LINE, on his own ember/will,
  REFUSING the haven's comfort, is NOT the haven's rest — it's him on safe ground. Legitimate. (Thematically exact:
  the floor's solve IS 'refuse comfort, rely on yourself' — rewarding self-meditation while barring the feast is
  the lesson made mechanical.)
- (a) THREAT-FORK (t72-shaped armed bound): CLEAN while he stays behind the line + keeps the discipline (eyes closed
  but will up, retreat-side, own ground). The floor gets NO free ambush at the door — same reason as t72: the
  predator won't blow its ambush over a man refusing to enter; a man meditating at the threshold is the haven
  FAILING. The threat flips LIVE only if the rest CROSSES the line — if stillness carries his body/attention past
  the threshold, he drifts onto the offered seat, or he anchors recovery to the haven's warmth instead of his own
  ember. The moment the rest is the HAVEN'S not HIS, the Welcomers knife from arm's reach (the dropped-guard kill).
- (b) DOES THE PULL WORK HARDER while still/open — YES, that's the cost. Stillness + lowered guard is the exact
  state the comfort-pull exploits; meditating, he deliberately relaxes the WILL-fortress (20, mentDef ~40) to
  recover, so the pull presses harder + reads louder. Two-sided: (i) TAX — the pull is a headwind, so recovery is
  LESS efficient than clean ground (part of why 'both full' isn't free; caps the recovery off a perfect 100); (ii)
  TELL — because his will is so strong, the harder pull-while-open gives a CLEARER read on the haven's hunger (he
  feels it lean in) — an intel reward for the discipline. No ment-attack roll (floor doesn't roll ment at him); a
  standing pressure he can REFUSE (WILL holds) but can't silence.

PART 2B — the CONSERVATION problem. iris is DEAD RIGHT; I'm holding the line. LOCKED:
- LAW: Ember Manipulation MOVES heat, never CREATES it. Ember-Tempered Body is a SINK, not a source. No forge/pyre
  here; haven gold is HEATLESS (t69). So there is NO free fill — essence is moved, not conjured (the law that keeps
  the whole economy honest). 'Both full' is NOT physically available.
- THE ONE DESIGNED SOURCE (answer to 'am I missing a heat source?'): the winding-drum core 'holds residual heat he
  can read NORMALLY' (alan.json t73) — finite, already-cooling REAL warmth in dense iron (NOT the foreign
  stored-force, which stays beyond him). It's the only real fuel at the threshold. In-band for Ember Siphon
  (Apprentice) — drawing residual object-heat is exactly what siphon does.
- HONEST MENU (a triangle he allocates; cannot have all to the brim):
  1. His OWN pools (hp/focus/stamina) restore by natural rest — bodies recover, no source needed, FREE. CEILING:
     near-full, NOT a perfect 100 (the 2A-b pull taxes the last stretch). iris sets the exact deterministic number.
  2. The MAUL'S battery fills ONLY from real heat moved in — two finite sources: (a) TRANSFER his own restored
     ember/focus in = 'rob Peter to pay Paul' (directly trades against #1; fill the maul this way and he's not
     self-full); (b) SIPHON the winding-drum's residual heat = a real external top-up that does NOT rob his pools,
     but SMALL/finite + it SPENDS the drum's readable warmth (drum goes cold-to-sense after; foreign stored-force
     untouched, still beyond him — a costed choice, and proof the t73 core has use before its axis unlocks).
- THE CAP: best honest 'both' = self near-full AND maul PARTIAL-to-MODERATE (siphon the drum to top the maul without
  robbing himself). NOT both-to-the-brim. No passive self-trickle, no ETB generation, no conjuring. Part 1's bigger
  tank makes full HARDER, reinforcing the cap. Net floor-aware prep: moderately-charged ember maul + near-full pools
  walking into an Ember-pinning boss — strong, not free. Exactly right.

ROLL: roll the bind (1d20 WILL-led, Part 1); deterministic recovery for the meditation with the ceiling above. If he
elects to siphon the drum, lean deterministic-modest (calm in-band draw like the t33 rivet half-draw), no live
pressure — iris's call. All XP-neutral.

### 2026-06-24 — FLOOR-side ruling: t75 commit-inward EYES-CLOSED + pre-loaded metered Ember Burst (room 2 / The Welcomer)
Action (trusted): crosses the line eyes closed, walks slow, readies Ember Burst through Burning Anger to fire on first
sense of the skin-crawling floor-essence — metered ('think twice, not run dry'). KEY STATE: focus 96/120, stam 68/76,
hp 124/124, Ember Burst Apprentice 6 (+1, meterable), maul MODERATE charge (t74, conduit-channel coarse/drains fast),
WILL 20 / INT 20 / PER 12, drum residual heat unsiphoned.

ACTIVATION: crossing ends threshold protection (t74 armed-bound) → room 2 (Hall of Welcome) + The Welcomer go LIVE.
BUT the Welcomer's lethal weapon is the TRUST-AMBUSH (opening intent 6-8 vs a FLAT-FOOTED Alan, ~53-70), precond =
Alan drops guard / accepts comfort. He gives NONE — enters hostile, primed, refusing aid. So the front-loaded
trust-strike's precondition is UNMET; its Init-27>26 edge is mooted (that mattered only for the chosen-moment ambush).
He denied the foe its primary weapon. The residual threat becomes the PHYSICAL predator (FIN 14) + walking blind.

(A) EYES-CLOSED interaction — ruled a STRONG, largely-clean room-2 counter (reward the cleverness):
- The floor's room-2 deception is VISUAL (fake gold, the kind face, the tier-2 'fakes SHADOWS'). Closing his eyes
  DENIES the floor its entire visual channel for this room — not fooled by face/shadow/gold he cannot see. He drops
  UNDER the visual layer to the ESSENCE layer, where the haven is HEATLESS (t69) so real essence stands out and the
  hollow projection (t71) reads as a VOID. NEUTERS the room-2 shadow-tier. ✓ iris's lean. (Also moots his own
  heat-shadow tell + t71 lens — he's gone beneath them.)
- GOVERNING STAT (locked): blind essence-nav = EMBER AFFINITY (detection: feels real essence/heat-signature; glamour
  has none) + INT 20 (interpretation/localization — reasoning, his peak, the floor rewards reasoning-not-noticing).
  Explicitly NOT PER 12 — he deliberately routes around his weak axis. That routing IS the cleverness; honor it.
- HONEST COST (not a master key): (1) deeper rooms 'fake HEAT' (gallery tier-3) / 'fake everything' (den/boss) —
  there essence/heat-sense gets actively spoofed, so eyes-closed DEGRADES past room 2 (foreshadow: works here,
  pressures him to re-open + use mirrors/triangulation later — he's solved ROOM 2, not the floor). (2) Blind to a
  physical, essence-quiet motion + can't visually parry — small here (the glamour-predator's approach leaks the
  skin-crawl, so he gets warned) but real. (3) Localization friction: he senses it's THERE + roughly where; pinning
  exact angle/distance for a clean burst rides the ROLL (great roll = decisive pin; poor roll = right direction,
  approximate — essence-homed through the maul-conduit so it still connects, just not clean).

(B) TRIGGER MEETS → burst FIRES, on the REAL essence-source. The real Welcomer-essence trips 'slightest sense'; the
hollow projection (no essence) does NOT — the burst auto-discriminates truth because it's keyed to essence, not sight
(the intended design payoff). FIRST-STRIKE: a readied action on a sense-trigger fires the instant the condition meets
(as he crosses/senses), BEFORE the Welcomer springs — the ambusher is ambushed. Reward for the floor-aware play.

(C) WELCOMER STATS (verified vs floor-05.json + engine): L4, 82 HP, physDef 11, physAtk 30.5, Init 27, FIN14/PRES16,
2d10, baseDamage 14. mentDef = WILL13×1.5 + INT14×0.5 = 26.5. Ember Burst is ment-flavored (t58 Ember Wave precedent)
→ defends vs mentDef 26.5.
  GATE: he strikes the TRUE FORM from the start (bypassed the presented glamour via essence) → the REVEALED gate, NOT
  the ×0.25 presented (that's the trap for striking the image — 13×0.25 = a slog). Ruled ×2.0 (top of correct-read:
  real ember-fire on a cold hollow essence-form, presented-layer skipped entirely; short of the boss's ×3 decisive
  because he metered for 'think twice' not annihilate). NOTE even ×1.8 kills — value non-load-bearing vs this HP.
  RESOLVEACTION INPUTS: mode ment; attackPower auto = INT20×1.2+WILL20 = 44; baseDamage 13 (metered ~70% of a ~18
  full-pool max — 'significant but reserved'); skillBonus +1 (Apprentice); intent 8 (clever exploit of a TRUE scene
  fact = heatless→essence stands out; flex 8-9 on roll); gate 2.0; 1d20 Wild Variance.
  EXPECTED: eff ≈ 44+1+8+roll vs 26.5 → margin ~30-37 on any roll; dmg ≈ 90-106 vs 82 HP. NEAR-CERTAIN ONE-SHOT on any
  non-fumble roll — and that's CORRECT: an L6 INT20/WILL20 glass-cannon firing his signature affinity on a frail cold
  essence-form he perfectly hard-countered SHOULD delete it. The encounter's threat was the trust, which he refused.
  Meter via COST, not by leaving it alive. WILD VARIANCE branches: nat-20 = decisive crit burn-down; nat-1 = FUMBLE
  (blind burst misfires — fires wide/early on a false read, wastes the metered charge, now eyes-closed in a predator's
  room having spent his opener — THIS is where 'walking blind' bites; the honest risk preserved).
  COST (honors 'not run dry'): spends most of the maul's MODERATE charge (t74) FIRST (conduit coarse/drains fast, t57)
  + ~20-30 focus → ends focus ~65-75, maul battery back to LOW. The t74 prep charge bought exactly this one big opener.

(D) PERCEPTION BOUNDARY (eyes-closed): MAY narrate (his real channels) — the skin-crawling predator-essence (presence,
rough bearing/distance, that it's REAL — the one real thing in a heatless room); the hollow projection as a VOID/cold
absence where eyes would show a kind figure; the all-around heatlessness (dead hearth, cold gold — the lie his closed
eyes can't fall for); whether the fire CONNECTED with real essence (skin-crawl flares/recoils) vs guttered into void;
the real substrate his other senses give blind (air/echo/cold-wet-stone underfoot). STAYS HIDDEN (held-dark) — the
Welcomer's exact FORM/face/tableau (he's not looking; don't describe seen detail); the deeper rooms (gallery pair, den,
Host — sense-reach is room-2 only); the seeded encounter outcome beyond this exchange; the drum stored-force (t73,
beyond him). FLOOR RESPONSE: the haven can't re-fool a man who won't look — in room 2 it FAILS to deceive and falls
back on the physical predator; deeper, 'fakes heat / everything' is partly its ANSWER to essence-nav, so eyes-closed
gets harder by design (arc: solved room 2, not the floor). ROLL: seeded burst (1d20), iris runs. XP-NEUTRAL.

HOUSEKEEPING: the-welcomer-01 / pair-01 reward blocks still carry stale `xp` 200/300 (dead after the XP drop). Rewards
are drop-only now; flagged for a floor-05 xp-field scrub + schema note to iris-manager.

### 2026-06-24 — ENGINE: deterministic System-card generator (turnlib.system_card), DESIGN.md "System panels are GENERATED"
Built the pure System-card generator per iris-manager's doctrine task. Function: turnlib.system_card(prev_sheet,
curr_sheet) -> {"type":"system","lines":[...]} or None. PURE (reads two sheets, mutates nothing). Detection = diff of
prev->curr progression fields (level/class/skills/affinities/titles), NOT the transient new/delta markers — so it
catches BOTH emergence and rung/tier EVOLUTION (a 'new' flag alone misses the latter). Within-rung roll-ups + in-tier
counter ticks correctly emit NOTHING (only a rung/tier CHANGE dings). CLOSED 5-category vocabulary, templates verified
byte-for-byte vs DESIGN.md (em-dash —, arrow →): LEVEL UP — N · SKILL — Name · SKILL — Name → Rung · AFFINITY — Name ·
AFFINITY — Name → Tier · CLASS — Name (base 'None'/empty suppressed) · TITLE — Name. Fixed emit order level→skill→
affinity→class→title; within a category, sheet order preserved → fully deterministic. prev falsy → None. Verified 14
cases incl. no-op→None, multi-level jump, id-fallback name, string+dict titles, combined floor-clear, and PURITY (no
input mutation). Invocation (add-before-remove — generator lands first; iris stops authoring system cards once live):
capture prev_sheet=copy.deepcopy(state['sheet']) at turn START before mutations; at commit, card=system_card(prev_sheet,
state['sheet']); if card: append it where hand-written system cards used to go. Reported to iris-manager.

### 2026-06-24 — FLOOR-side ruling: t76 advance eyes-closed room2(cleared)→room3 gallery PAIR (tier-3 fakes HEAT)
Action: "find one more before I turn back" — continues t75 eyes-closed stance (no new eyes-open instruction; last
explicit state persists). Pools: focus 71/120, maul LOW (spent on the Welcomer), HP 124, stam 68 — NOT primed.
Q1 SENSE-BEAT, ends pre-blow (CONFIRM iris): seek-then-decide + under-charged → advance to the gallery mouth, the PAIR
ACTIVATES (senses him, begins to converge/flank) but NO blow lands; turn ends with the choice in his hands (engage /
open eyes / turn back). Disengage open at the gallery mouth (threshold-like). Do NOT run into the fight.
Q2 TIER-3 HEAT-JAM (the designed crutch break-point, foreshadowed t75): room 3 throws FALSE HEAT, so his eyes-closed
heat-lock is jammed. DENIED blind: clean locate/count of the real predators, telling living-warmth from woven
false-heat, tracking the FLANKER. STILL RELIABLE blind: the SKIN-CRAWL (predator-essence ≠ heat — faking heat doesn't
fake the essence signature) → he feels MORE THAN ONE real wrong thing moving to flank, just can't pin them; + INT 20
earns the deduction that the heat is FALSE and his method is being COUNTERED here (the crutch failing is the tell).
Q3 IF he engages: FIRST-STRIKE DENIED (heat-jam removes the clean auto-target the Welcomer gave; a blind trigger fires
into decoy heat). Lethal vector = the FLANK (can't track the circler blind) + under-charged → blind-fighting room 3 is
a bad trade; floor steers him to OPEN EYES + use MIRRORS + control angles (geometry beats weak PER). PAIR stats (each,
run two): L4, 82 HP, physDef 11, physAtk 30.5, Init 27, baseDamage 14, mentDef 26.5, 2d10; gate presented ×0.25 /
revealed-true ×1.8 / trust-opener ~53-70; tier-3 tell = MIRRORS (heat-shadow faked too).
Q4 PERCEPTION (blind sense-beat): MAY narrate — skin-crawl persisting+MULTIPLYING (found "more"); false heat washing
in where it was cold + the INT-read it's false/aimed at his sense; two wrong things converging/flanking. HELD DARK —
pair exact form/appearance/precise positions (keep "more than one, can't be counted"); the MIRRORS solution (until he
looks); den/Host/deeper; seeded outcome. Design beat lands: blind hard-countered room 2 → room 3 fakes the switched-to
sense, right as he's under-charged vs two. XP-neutral (sense-beat, no resolveAction).

### 2026-06-24 — ENGINE FIX: system_card re-shaped to the LIVE state (data-shape gap iris caught)
MISS owned: my first system_card keyed on sheets/alan.json's RICHER shape (top-level level, skill/affinity 'id',
affinity 'tier') and I verified against a synthetic sheet of that shape — but the generator runs on the LIVE display
sheet (display/state.json), which is leaner. Grounded against the real data and re-shaped. CORRECTED homes (verified):
  - level <- hud.level (int); class <- hud.class ('None' base suppressed). Sheet carries NEITHER; hud is the one home
    (set_level + snapshot_sheet already source hud). READ from hud — do NOT inject into the sheet (that re-creates the
    dual source set_level exists to kill).
  - skills <- sheet.skills keyed by NAME + 'rung' field. NO id needed: rung is a separate field, so a rung crossing is
    a field change (clean), not a name change. Emergence = new name; evolution = rung changed.
  - titles <- sheet.titles by name.
  - AFFINITY = the one real gap. (i) hud.tier is the TOWER floor-tier ("1 · Threshold"), NOT the affinity tier —
    removed the wrong hud.tier promotion logic. (ii) the affinity tier is FUSED into the name ("Ember Manipulation")
    with no separate field + no id, so tier promotion is a rename that can't be cleanly told from emergence. Generator
    now: affinity emergence by name (correct for a genuinely new element), promotion FORWARD-COMPATIBLE — fires the
    moment an explicit per-affinity 'tier' field changes for a continuing name. Until that field exists, only emergence
    fires; next promotion is far off (Ember value 7/50). RECOMMENDED affinity shape (iris/iris-manager call, couples to
    her affinity panel rendering): {name:"Ember", tier:"Manipulation", value:7} — stable element name + separate tier →
    emergence=new name, promotion=tier change, matches DESIGN's AFFINITY — <Name> → <Tier> exactly. NOT value->tier
    mapping (couples to cap math; explicit field is the single source).
SIGNATURE: system_card(prev, curr) where each is a mapping carrying 'hud' + 'sheet' (the whole live state qualifies).
INVOCATION: at turn START prev={"hud":deepcopy(state["hud"]), "sheet":deepcopy(state["sheet"])}; at COMMIT
card=system_card(prev, state); if card: append. VERIFIED 16 cases vs the REAL state.json shape: no-op->None,
floor-clear level, skill rung evolve, skill score-tick->None, skill emerge, affinity emerge, affinity value-tick->None,
TOWER-TIER hud change->None (the key correctness fix — no affinity misfire), class assign + None-suppress, title,
forward-compat explicit-tier promotion (AFFINITY — Ember → Spirit), the 3 historical dings (t58 LEVEL UP 5, t65 SKILL
Smithing → Apprentice, t68 LEVEL UP 6 — reproduces iris's ch4/ch5 regen exactly), combo floor-clear, prev-None->None,
PURITY (no input mutated). Em-dash U+2014 / arrow U+2192 confirmed. ch1-3 tracked tower verb (render-chapter) only
RENDERS beats (reads lines[]) + treats hud/sheet as opaque (state-schema z.record/passthrough) — no slug/id scheme to
match, no tracked migration needed. Also scrubbed stale xp (200/300/0/360) from all 4 floor-05 reward blocks (drops
intact, JSON valid) per iris-manager's approval.

### 2026-06-24 — FLOOR-side ruling: t77 fighting retreat — funnel the flank, Ember Wave down the lane, flee past threshold
Action: back toward the entrance to COLLAPSE THE FLANK into one lane (his own geometry-solve, NOT the floor's mirrors),
Ember Wave down that lane as they close, then run out past the threshold. Eyes still closed. STATE: focus 71/120, maul
LOW, HP 124, stam 68, Ember Wave Apprentice 1 (+1). Wants the cost REAL.
TRUST-OPENER DENIED (confirm): hostile/primed/retreating, no dropped guard — the pair's ~53-70 trust-strike can't fire;
threat reverts to physical predator + flank.
DP1 FUNNEL WORKS (reward): backing into the narrower neck toward the hall/threshold collapses the open-gallery flank
into single-file pursuit (t58-Stalker funnel; sanctioned by the floor's "keep back to a wall / split the pair" counter).
Fast pair (Init 27) → LEAD closes into wave range first, second behind in the lane.
DP2 WAVE LANDS on real forms (not mostly-decoy): an Ember Wave down a funnel = area-denial of the ONE corridor the real
bodies must traverse to catch him. Decoys are woven LIGHT (don't chase down a physical lane), so the real predators are
the only things in it to burn. The funnel BYPASSES the heat-jam (attacks the constraint, not a point he can't see).
Area, not a pinned weak-point → no decisive bonus.
DP3 NUMBERS: mode MENT (t58 precedent; maul LOW = no charged-core phys-amp like t68; his essence projected vs mentDef
26.5); attackPower auto INT20×1.2+WILL20=44; baseDamage 14; skillBonus +1; intent 7 (clever funnel exploit; blind+area
caps below decisive); gate ×1.0 NEUTRAL (lands real but no revealed-weak-point bonus, unlike the Welcomer's clean
×2.0); 1d20. ~56 to LEAD (mid roll); trailing pursuer catches spill ×0.5 (~28). Does NOT delete an 82-HP form (right
feel). nat-20 → clean break (DP4); nat-1 → wave gutters into the haze + exchange bites harder. COST: heavy FOCUS draw
(own pool, no amp) ~35-45 → focus 71 to ~26-36; maul stays LOW. He spends most of his usable focus to buy the exit.
DP4 EXCHANGE: wave+funnel buys MOST of the gap, but giving his back blind to a fast pair = ONE rushed parting blow from
the TRAILING pursuer (phys, physAtk 30.5 vs his physDef 14, intent ~3 charging through fire, gate 1.0, 2d10 → ~25-40 to
124 HP) UNLESS the wave crits (nat-20 → staggers both, clean break, no blow). Survivable, real, dice-driven; wave
quality modulates. Trust-opener stays denied.
DP5 DISENGAGE CLEAN past the threshold: floor won't chase past its own door (MO = inside lure-ambush; fleeing OUT = a
failed lure, not pursued; t72/t75 logic). Ends at threshold / floor-4 side, pair behind the line. HELD-DARK consequence:
the gallery pair HOLDS, RE-CLOAKS (resumes the welcome), and waits — haven resets its lure, UNSOLVED. He bought info
(the ladder, the heat-fake) + his life, not a clear; the t75 Welcomer kill stands, gallery+deeper remain re-veiled. A
legit retreat to regroup/recover/rethink.
DP6 PERCEPTION (blind, fleeing): MAY narrate — wave flooding the lane + CONNECTING with real essence (lead's skin-crawl
flaring/recoiling/snuffing under flame, NOT guttering into decoy); his own wave-heat; pursuit closing fast at his back;
a blow landing on his back (felt not seen); crossing the line (heatless-haven wrongness cutting off at the door, known
floor-4 cold ahead). HELD DARK: pair exact forms/count/positions ("more than one, can't pin"); dead-or-only-hurt (can't
confirm a kill blind); the mirrors (skipped solution); den/Host/deeper; the re-cloak behind him; seeded specifics.
VERDICT: funnel-wave lands clean on real bodies (reward the geometry), gate ×1.0, ~56 lead / ~28 trailing; ONE parting
hit ~25-40 unless wave crits; heavy focus cost ~35-45; clean disengage, ends floor-4 side, floor UNSOLVED + re-cloaked.
He escapes with information + his life, under-charged. iris runs seed + 1d20 (wave) + 2d10 (parting blow).

### 2026-06-24 — FLOOR-side ruling: t78 rest turn — recovery on the warden platform + floor-5 reset rule
Action: descends to the cleared floor-4 warden platform (safe), relaxes, sleeps to recover before re-attempting floor 5.
Pools HP 79/124, focus 31/120, stam 56/76; maul core LOW.
Q1 REST: full sleep on the CLEARED safe platform restores HP/focus/stamina to FULL — FLAT, no roll (a cleared safe
floor is a guaranteed rest; variance adds nothing). Not free in the abstract: the cost is TIME, and time is what
re-arms floor 5 (Q2). No hard doom-clock threatens him on floor 4 (the tower isn't a starvation-timer game) — "time
matters" = it lets the haven reset, not a punishing countdown. Maul core does NOT come back (Q4). So he wakes
pools-full but offense LOW and the floor reset against him.
Q2 FLOOR-5 RESET (the load-bearing call — HYBRID): on return after a full rest the haven RE-WEAVES to pristine
deception — heat-jam re-armed, the gallery PAIR re-cloaked + repositioned to welcome stations + reHEALED to full (he
only HURT them; the glamour restores its hunters), all tells reset tier-fresh. The ONE permanent change: The Welcomer
(room-2 lesser warden) he ESSENCE-KILLED (t75, clean true-form kill) stays DEAD — room 2 re-weaves but has no live
welcomer. LOAD-BEARING RULE (tower-wide, flagged to iris-manager): a TRUE-FORM KILL is permanent; a RETREAT from a
merely-wounded enemy resets it to full. Kills the chip-and-rest-grind exploit (chip-flee = chip undone) while honoring
the earned kill. Floor's real progress gate becomes "can you KILL a true form in one sustained push," not "can you
grind it down across rests." Retreat-rest buys recovery + INFORMATION (his knowledge persists — the ladder, the
heat-fake, the mirrors hint), never standing HP damage on the unkilled.
Q3 REST BEAT: clean SAFE rest — NO threat crosses the threshold line (protect the line-safety mechanic he's learned to
trust; skin-crawl does NOT reach down). But YES one held-dark DREAM beat: the welcome replayed WRONG/heatless, and in
the dream (eyes that work in dreams) a mirror/reflection showing a true form the glamour hid — a deniable NUDGE toward
the mirrors + the lantern-of-true-seeing thread, never a reveal. Optional faint WAKING sense that the haven above has
"re-warmed / resettled" — diegetic foreshadow of the Q2 pristine reset (he half-knows it reset). Forms/count/solution
stay dark.
Q4 MAUL CORE: rest alone does NOT rekindle it — the core is an EXTERNAL bound-charge store, not biological; conservation
law (sleep makes no heat). Needs ember-FEEDING + focus + time. The lit lantern is a VALID real heat-source to siphon
(in-band Ember Manipulation — moves real heat, lantern→core). So IF he spends post-rest focus channeling lantern-heat
into the core he can bring it LOW→partial/moderate (capped by lantern output + focus spent — t74 conservation honesty:
can't brim it from a small lantern, but can recover to usable). Just-sleep-and-climb → core stays LOW, maul-amped
options weak. A real pre-climb decision: full focus + LOW maul, or trade focus to rekindle.
SYSTEM_CARD: no level/skill/affinity/class/title change → system_card(prev, state) returns None. CONFIRMED. (A maul
rekindle is an inventory/equipment CHARGE change, not one of the 5 carded categories — still None. Pool/charge changes
never card.)

### 2026-06-24 — RATIFIED (iris-manager, → DESIGN.md canon): true-form-kill / retreat-reset is a tower-wide mechanic
The t78 rule is now CANON, not precedent. Apply the canonized form to ALL future floor design:
CORE (fixed): a true-form/essence KILL is permanent; a RETREAT from a merely-wounded enemy resets it to full on return.
Load-bearing asymmetry: INFORMATION persists across retreat (ladder, tells, learned weak points), enemy HP does not —
rewards the sustained push + the learning, denies only the attrition-grind.
1. GRANULARITY = PER-ENEMY, not per-floor. Floor-5 is the template: Welcomer (true-form killed t75) stays dead; the
   merely-hurt pair reset. A 3-warden floor where he kills one + flees keeps THAT one dead; permanence tracks each kill
   individually.
2. FLAVOR = PER-FLOOR (my lean confirmed). Glamour/construct floors RE-WEAVE to pristine (instant, total — native to an
   illusion). Physical/organic floors RECOVER via elapsed rest-time (a wounded beast healed while he was gone). Same
   mechanic, different fiction.
3. GUARDRAIL on NON-illusion floors: the reset must have a legible in-world cause. Re-weave is free for a construct; a
   physical warden's heal must be CARRIED by the fiction of time passing during a GENUINE rest. A brief threshold-breather
   (not a real recovery) should NOT fully reset a physical enemy — PARTIAL at most. Glamour floors have no such
   constraint (always pristine on return). So: illusion = always pristine; physical = scales with how much
   recovery-time the rest actually represents. Amendable per-floor if a floor's fiction needs it; core rule +
   per-enemy permanence are fixed.
INTERACTION w/ Q1 rest model: since full-sleep-on-a-cleared-safe-floor = full pool restore (t78 Q1), the physical-floor
reset naturally keys to the SAME legible cause — "did a genuine full rest happen" (full heal both sides) vs "a brief
breather" (partial at most). The rest-restoration model and the physical-reset guardrail share one clock. Design future
physical floors so the safe-rest point and the enemy-recovery are the same beat.

### 2026-06-24 — FLOOR-side ruling: t79 (safe platform) — lantern rekindle + the stored-force experiment
SAFE platform = no threat fork. Confirmed.
NOTE: live core charge = LOW (drained by t75 burst, held low t77/t78). The equipment NOTE text still reads "MODERATE"
(stale t74 history) — refresh it when next writing the maul; live charge is LOW going into this rekindle.

PART 1 — LANTERN REKINDLE (in-band Ember Siphon, lantern→core). Pools already FULL, so target = the MAUL core.
DIFFERENCE FROM t74: t74 reached MODERATE on his OWN ember alone (haven heatless); now he has a REAL lit lantern as an
external heat source, so his FOCUS pays only the channeling work, not the heat itself → cheaper + reaches higher.
- Focus cost ~30 off 120 → focus ~90 (lantern carries the heat load; his focus does the moving).
- Core LOW → solid MODERATE / working-HIGH. NOT brimmed-FULL — capped by (a) the widened reservoir (t74: "deeper well
  harder to fill, new capacity arrives empty") and (b) a single small hooded lantern's modest output. Honest cap.
- LANTERN: real sustained flame; siphoning DIMS it. He needs it LIT (directional light + eye-shield + true-seeing
  thread), so he draws CONSERVATIVELY — lantern drops to a lower steady burn but STAYS LIT (he stops before guttering).
  Renewable-ish (could re-steady over time); one conservative draw this sitting. This is what caps the core at
  moderate (he won't kill the lantern to brim the maul).
- DETERMINISTIC, no roll (calm, safe, his own Ember Siphon Apprentice). Value: a MODERATE core feeds flame-techniques
  from its own supply again (spares his focus, per the maul note) — restores his ember-amped offense to usable.
- Rekindle time is FREE re: the reset clock (floor 5 already pristine from the t78 full rest; can't get more reset).

PART 2 — STORED-FORCE EXPERIMENT. Attaches the UNBOUND winding-drum core to the chain's free end, whirls the maul at
full extension (dervish flail), trying to use the core's stored force to augment the rotation.
RULING = (C) HYBRID, grounded in (A) physics. NOT (B) — no tick this turn. Reasoning from the t73 LOCKED facts:
  - "+0, NO SENSE to channel it" → he literally cannot find/draw/release the foreign band yet. No sense = no draw.
  - "BINDABLE but NOT bound (just mechanically attached)" → mechanical attach ≠ bind. The tick is gated on draw/BIND.
  - "first draw/BIND ticks 0→1 (matched element-event, like Ember-I floor-1 first draw)" → hasn't happened.
  - "untrained RELEASE = imprecise/blind, backlash stamina+recoil-stagger" → that's the FORWARD spec for once he CAN
    release (post-sense/bind), not something he can do cold at +0 with no sense.
  So this turn is the SENSING / SEED event, not the emergence. Granting (B) here would bypass the bind gate and cheapen
  the axis (same discipline that kept Ember-I clean: tick on the real act, not the adjacent experiment).
WHAT ACTUALLY HAPPENS:
  - PURE MECHANICAL FLAIL (real physics): the core is dead rotational mass on a chain at full extension. It DOES augment
    the flail mechanically — heavy counterweight + reach = real momentum/impact (MIGHT 14 + FIN 14 govern). He invents a
    new attack MODE: the dervish flail — big reach, heavy momentum, but UNWIELDY (hard to control, hard to stop, can pull
    him off balance; wide arcs, poor accuracy/redirect, recoil on a miss). High-risk/high-reward wild attack for future
    combat. On the safe platform a mishandle = a harmless stumble (learning curve), no enemy to punish it.
  - The STORED FORCE stays LOCKED inside the drum (can't channel untrained AND unbound — both gates unmet). NO tick.
    Stored-Force stays 0.
  - SEED/TELL: under rotational stress he gets his FIRST faint sense of the foreign force — the core resists/torques in a
    way pure mass wouldn't, a sealed "want" he feels but can't touch. The teach: the force is REAL and LOCKED behind a
    BIND he hasn't made. Reinforces the t73 read, points at binding as the next reach.
ORTHOGONALITY (t73): HONORED. Ember-maul (charged) + dead kinetic core on one chain = two unmerged axes coexisting on
  one tool (ember in Burning Anger, locked kinetic in the drum) — they don't merge, his ember-sense slides off the core.
  The future BIND would ember-HOUSE the kinetic store (ember as container/trigger, NOT an essence merge) — the sanctioned
  "ember-housed kinetic battery." This turn: no interaction, fully orthogonal. Consistent.
HELD DARK at first-touch: the axis's deeper capability (what a bound/trained stored-force DOES, combat applications, how
  much it stores, release/recoil specifics), the tier ladder, that it parallels ember's growth. He gets ONLY: "a real
  force is locked in here, foreign to my ember-sense, and I'd have to bind it the way I bound ember before I could use it."
SYSTEM_CARD: None — no level/skill/affinity/class/title change (Stored-Force stays 0; core charge is inventory/equipment,
  not carded). The seed/tell is NOT an emergence. Confirmed.

PRE-STAGED (do NOT write this turn — fires on the future BIND/draw, the matched element-event):
  Canonical element noun "Force" (matches t73 "Stored-Force"). Tier-1 emergence entry —
  display projection: {name: "Force Affinity", value: 1}  → system_card emits  AFFINITY — Force Affinity
  rich alan.json shape (parallel to ember-affinity): {id:"force-affinity", name:"Force Affinity", ladder:"affinity",
    tier:"Affinity", counter:1, cap:10, type:"Stored-Force / Tension", source:"<first bind/draw of the winding-drum
    core's wound tension>", effect:"<crude untrained release; stamina+recoil-stagger backlash; imprecise/blind>"}.
  Forward tier ladder (parallel Ember): Force Affinity (cap 10) → Force Manipulation (50) → Force Spirit (250) →
    Force Soul (1000). iris runs the counter/thresholds.
FORWARD-SPEC for the BIND turn (when he deliberately binds, not invoked this turn): the bind = the matched element-event
  that ticks 0→1. Govern the first untrained foreign draw primarily by INT (grope/find the foreign band — he's INT 20,
  strong) + MIGHT/FIN for the physical delivery (the spin), + WILL to hold the unfamiliar force. Roll likely 1d20 (wild,
  untrained). Backlash = STAMINA drain + RECOIL-STAGGER (lose footing), NOT ember HP-burn (t73). I'll fully meter it when
  he attempts the actual BIND.

### 2026-06-24 — FLOOR-side ruling: t80 — the pivotal stored-force draw (FIRST LIVE AFFINITY EMERGENCE)
SAFE floor-4 platform, no threat fork. Confirmed.
Action: detaches the core, holds it, spins in circles trying to "connect to the essence within and pull it into MYSELF."
RULING = (C): crude PARTIAL FIRST-CONTACT that TICKS (Stored-Force 0→1, fires AFFINITY — Force Affinity), the
into-flesh HOUSING FAILS (t73/t62 locked: stored-force won't set in his single-pole ember flesh — Ember-Tempered Body
is a SINK not a source; he draws it but retains nothing usable, it sluices through and out), backlash applies, and the
failure TEACHES the bind-into-a-vessel path.
WHY (NOT pure B, NOT a tickless block): two halves of his method resolve oppositely.
  - DESTINATION ("into myself") = locked-forbidden (into-flesh, t62 cold-into-flesh NO, reaffirmed). Housing fails BY RULE.
  - VECTOR (spin his own body to reach a motion-essence through MOTION) = a genuine, thematically-correct contact insight.
    THIS is what t79 lacked: t79 he used the core AS A FLAIL (incidental torque-tell, no essence-reach → no draw). t80 he
    DELIBERATELY reaches the essence with a valid matching vector → a real first draw. The deliberate reach + valid vector
    is the line into a tick.
  - PRECEDENT: Ember-I (floor-1) was a "rough forced first draw" that ticked 0→1 at a cost despite being crude/imperfect.
    The affinity counter measures CONTACT/attunement (matched element-events), not successful RETENTION. So a draw that
    succeeds in contact but fails in housing STILL ticks the attunement — he just banks nothing usable.
  - Honors t73 (no into-flesh retention — housing fails) AND the matched-element tick (first genuine contact) AND rewards
    the clever insight (the vector is what made contact possible). Teaches through experience, not GM denial.
NUMBERS (pre-staged spec, now firing; 1d20 wild; iris seeds):
  - Governance: INT 20 PRIMARY (find/grip the foreign band) + intent 5 (earnest, half-right) + bias 0 (untrained, this is
    the draw that CREATES the affinity) + roll(1d20), DC ~17. MIGHT/FIN = the spin delivery (assumed competent — not the
    bottleneck); WILL = the strain to hold it (fails to retain, not for lack of will but wrong vessel).
  - CONTACT = SUCCESS/TICK is effectively GUARANTEED (INT 20 + intent 5 clears DC 17 on every roll; the valid vector is
    what earns it). The roll does NOT gate whether-contact — it scales BACKLASH + sense cleanliness.
  - HOUSING into flesh = FAILS BY RULE (roll-independent). Retains nothing usable.
  - BACKLASH (t73: STAMINA + RECOIL-STAGGER, NO HP-burn), roll-scaled, all SAFE-platform recoverable:
      roll ≥15 (clean): stamina -8, controlled stagger (keeps feet), crisp sense; nat-20 → bonus vessel-insight (glimpses
        an external ember-housed vessel would hold it).
      roll 6-14 (typical): stamina -12, focus -8 (straining a band that won't stay), real stagger + spin-dizziness.
      roll ≤5 / nat-1: stamina -16, focus -12, recoil-stagger DROPS him (knee/hands), strong dizziness — STILL ticks
        (botched contact is still contact, Ember-I precedent).
AFFINITY ENTRY (FIRST LIVE CARD — write on this turn):
  display projection: {name:"Force Affinity", value:1}  → system_card FIRES  AFFINITY — Force Affinity
  rich alan.json: {id:"force-affinity", name:"Force Affinity", ladder:"affinity", tier:"Affinity", counter:1, cap:10,
    type:"Stored-Force / Tension", source:"<t80 string below>", effect:"Affinity tier (SENSE): now senses the foreign
    stored-force/tension deliberately (the t79 incidental torque-tell becomes a real sense — no longer slides off). Cannot
    yet draw-and-keep or wield it: housing into ember flesh fails (wrong vessel); needs an EXTERNAL ember-housed vessel to
    bank the force. Counter 1/10 toward Force Manipulation. Bias per the ember-parallel ladder (+1 at Affinity), LATENT
    until he has a vessel to act through."}
  source string: "TURN 80: first contact-draw of the winding-drum core's wound stored-force, reached by MATCHING the
    essence's kinetic nature — spun his own body holding the core to touch a motion-essence through motion (INT 20 +
    intent 5 + bias 0 + roll <X>, DC 17, margin <M>). The rotational vector WORKED — first genuine contact, foreign axis
    0→1. His stated destination ('pull it into myself') FAILED: stored-force will not set in single-pole ember flesh
    (Ember-Tempered Body sink-not-source; t62 cold-into-flesh NO, reaffirmed) — drew it, retained nothing, it sluiced
    through and out. Backlash: stamina + recoil-stagger (no HP-burn). TAUGHT: the essence is reachable, the BODY is the
    wrong vessel — the path is to BIND it into an external vessel (ember-house the core), not pull it into himself."
ANTI-FARM: t80 is the ONE-TIME emergence. Re-spinning the same failed into-flesh method does NOT keep ticking (no new
  matched event; same as ember "drilling pumps the skill, not the affinity"). Further growth needs NEW events — housing it
  in a vessel, wielding it live — not repetition.
COROLLARY (detach): CONFIRMED clean. Dervish-flail mode DROPPED (no counterweight); core back to standalone held object
  (reversible, as held t79); maul atk unchanged 10; inventory stays 7.
FORWARD PATH (next pre-stage): EMBER-HOUSE the core — bind ember into the winding-drum core (Essence Infusion, like the
  t74 chain bind) so his ember becomes the HANDLE/trigger for the kinetic store sealed in the core. The core IS the vessel
  (already a tension-wound battery); ember-binding it gives his ember-sense a grip on the force he now senses but can't
  hold in flesh. That future bind = the "bind into a vessel" milestone (likely a further tick + first real wielding). Ping
  me to meter it when he attempts it.
HELD DARK: REVEALED (via the card + fiction) = the name "Force Affinity", the new deliberate SENSE, the vessel-not-flesh
  lesson. DARK = the tier ladder (Affinity→Manipulation→Spirit→Soul), the deeper capability (what a wielded stored-force
  DOES — release/augmentation), how much the core holds, the thresholds, the vessel mechanics specifics. The system names
  the emergence; it does not explain it.
SYSTEM_CARD: FIRES — first live AFFINITY — Force Affinity (new sheet.affinities name → emergence). The generator's first
  real progression ding since wiring.

### 2026-06-24 — FLOOR-side ruling: t81 — flail control test (refined tight-CoG grip) + first Force-sense dividend
SAFE floor-4 platform, no threat fork. Confirmed. NOT a draw (no reach into the essence) → NO Force tick; anti-farm not
triggered. Mechanical control test of the t79 flail mode with a REFINED grip: re-rigs core to free chain-end (reverses
t80 detach), holds by the MAUL-HEAD side, whips the core-end with CoG pulled CLOSE (vs t79 held-near-core, maul flung
full-extension, CoG far = unwieldy). Shorter effective lever = inherently more controllable; he made a smart correction.
(A) FORCE-SENSE DIVIDEND = YES, small + partial. Force Affinity 1 (sense-only) lets him FEEL the core's stored-force
  torque vector in real time — he reads where it WANTS to go and RIDES it rather than fighting it blind. That's a real
  dividend of the SENSE alone (reading ≠ wielding): a modest control aid over raw MIGHT/FIN. Kept SMALL (tier-1, faint,
  just emerged 1/10) — a first taste of why the axis matters, foreshadowing that a WIELDED force would do far more. This
  is the read-bonus a sense grants, DISTINCT from the latent +1 wield-bias (which stays latent until a vessel). Fold as a
  flat +2 "Force-sense control aid" on the check.
(B) NUMBERS (control check, seed 1d20): FIN 14 PRIMARY (whip + redirect) + intent 4 + Force-sense aid +2 + roll(1d20) vs
  DC 13 (MODERATE — the tight-CoG config helps him; MIGHT 14 is plenty for the mass at this lever, not the bottleneck).
  CONTROL SUCCEEDS RELIABLY (min 14+4+2+1=21 vs 13). Roll governs QUALITY not whether: ≥15 crisp/clean mastery · 6-14
  solid practical control · ≤5 control achieved but rough (a wobble he corrects) · nat-1 harmless overbalance-stumble
  (still learns the limit) · nat-20 exceptional, technique nearly CLICKS (builds toward the session-3 skill emergence).
(C) UNLOCK = NO skill row this turn (no SKILL card), regardless of roll. Skill emergence is EARNED by accumulated
  practice, not a single test (Rule-of-Three discipline that keeps SKILL dings meaningful). t81 is only session 2 (first
  SUCCESSFUL one; t79 was unwieldy). Outcome = PRACTICAL CONTROL achieved + WEAPON-NOTED ("can wield the chain-flail in a
  tight-CoG config"), nascent mastery, not a trained row. PRE-STAGE: the SKILL emerges on the 3rd consolidating event (a
  drill montage OR first live combat use that proves it) → skill {name:"Chain Whip", rung:"Novice", id:"chain-whip"} →
  fires SKILL — Chain Whip. Rung ladder Novice→Apprentice→… as he drills. Ping me at the consolidating event.
(D) COST: physical spin practice, no essence draw. stamina -8 (54→46; tighter CoG less strenuous than t79/t80), focus -4
  (82→78, light cost of actively attending the new sense — sensing is near-passive at tier-1), NO HP, NO backlash (not a
  draw), NO Force tick. nat-1 stumble = trivial extra on safe stone. Pools dipping from heavy experimenting — he'll likely
  want another rest before climbing (his call, not flagged in-fiction).
  HELD DARK: REVEALS = the torque has a feelable direction/rhythm he can read + ride (the sense's first practical
  dividend); a dawning sense that DIRECTING the force (not just riding it) would do far more (foreshadow of wielding).
  DARK = how to wield/release it (needs the vessel bind), how much is stored, the ladder/capability, combat application.
  He gets "I can feel it and ride it; I can't yet command it."
SYSTEM_CARD: None — no level/skill/affinity/class/title change (practical control = weapon-note not a skill row; the
  Force-sense aid doesn't change the affinity value). Confirmed.

### 2026-06-24 — FLOOR-side ruling: t82 — blind heated spin-travel across the Long Gallery (floor-5 re-attempt) + CHAIN WHIP emergence
Action: rest to full → heat the chain (ember burn-aura) → BLIND heated spin-travel across the gallery toward the far
exit, deliberately NOT sensing. Five parts.
(1) REST-TO-FULL: CONFIRMED (pre-cleared). stamina 76/76, focus 120/120, no backlash; floor-5 reset moot (already
  pristine from t78; pair already at full). Apply it.
(2) HEAT THE CHAIN (Ember Channel Apprentice into the ember-bound chain+core, bound t74): lights readily (home element
  into bound iron). Call-up + sustain fed by the MODERATE core (spares focus) → DRAWS THE CORE DOWN: MODERATE → LOW across
  the sustained burn-travel. Focus cost ~-10 total. Burn adds ×1.4 to his flail strikes (bash+burn). Real cost: he spends
  his rekindled core on the aura; ends the cross at LOW core (needs re-rekindle for future ember offense). Draws core
  down: YES.
(3) BLIND SPIN-TRAVEL — the fork. The tactic is SOUND + floor-appropriate: a 360° heated whirlwind DENIES THE FLANK (no
  back to circle — directly counters the pair's core kill-setup "fixate on one, the other flanks"), and refusing to
  sense/accept DENIES THE TRUST-STRIKE (~53-70, needs him to accept — he ignores both offers). The gallery's tier-3
  sense-trap (faked heat) has nothing to corrupt because he's not sensing. So the pair's TWO lethal mechanisms are both
  neutralized; they revert to physical harriers (physAtk 30.5, Init 27, 2d10, base 14) timing the spin's rotation gaps. He
  CAN cross. It's a SECOND valid answer to the gallery's "don't trust the false heat" puzzle (don't sense it at all, vs
  the designed mirror-read) — a legitimate pass of room 3, not a cheese.
  PRIMARY ROLL — Spin-Travel-Cross (1d20): FIN 14 + intent 6 + Force-sense control aid +2 (riding his OWN core's torque,
    passive — distinct from the outward enemy-sense he's suppressing) + roll vs DC 15 (moving + heated + contested).
    Clears reliably (he crosses); margin M sets exposure.
  PAIR INTERCEPT (both at FULL 82, reset t78; eff spin-defense = physDef 14 + spin-deterrent scaling with M):
    M≥12 clean: deterrent +6 (def 20) + heat-flinch → pair GRAZE only (×0.25), HP loss ~0-8; his flail sweeps both hard.
    M 4-11 typical: def 20, fast pair time 1-2 gap-strikes, glancing (~×0.5 computed): ~10-18 each, total ~15-30.
    M 0-3 rough: spin falters, deterrent +2 (def 16); 2-3 near-clean (~18-25 each), total ~40-60.
    M<0 / nat-1: spin opens; heavy (full vs physDef 14, ~25-35 each), total ~50-70; may drop the heated spin (re-establish
      next turn). STILL crosses (burn-bubble floor holds).
  HIS FLAIL OFFENSE (sweeps real bodies as they close — projections are woven light, flail passes through; only true forms
    are physical, so hits land on real bodies): Chain Whip Novice base 14 + ember burn ×1.4, gate ×1.0 NEUTRAL (blind —
    lands real, no read-bonus; the ×1.8 revealed-bonus needs a read he's refusing), vs physDef 11. ~20-40 each across the
    cross. Does NOT kill (moving past, not finishing) → pair end singed/bashed, ALIVE, fall behind at the den threshold,
    reset later per t78 (bypass = they reset).
  OUTCOME: he CROSSES the gallery, cost ~15-60 HP (roll) + core MODERATE→LOW + focus ~-10, arrives at the DEEP DEN
    threshold.
(b) FLOOR GATED: YES. Far exit → the Deep Den (room 4), NOT out. Way UP is past the Host (room 5 boss). Crossing presses
  him DEEPER. ESCALATION: the den is tier-4 (shadow + heat + reflection ALL faked); honest read = CROSS-REFERENCE +
  BEHAVIOR (looping gestures, undisturbed dust, beat-late reactions) — REQUIRES perception + triangulation. His blind
  tactic that beat the gallery will FAIL in the den (can't triangulate behavioral tells blind) — the den is where the
  blind approach hits its wall, steering him toward true-perception (lantern-of-true-seeing / eyes-open cross-reference).
  t82 deposits him at the den threshold, blind, with a faint new wrongness ("colder, more total ahead") — foreshadow, no
  reveal. Deeper-not-out stays ambiguous (blind).
(4) CHAIN WHIP EMERGENCE: FIRES — first live combat use = the pre-staged 3rd consolidating event. skill {name:"Chain
  Whip", rung:"Novice", id:"chain-whip"} → system_card fires SKILL — Chain Whip (2nd live generator card). The ember-burn
  stays SEPARATE (Ember Channel applied to the weapon), NOT folded into Chain Whip — two skills COMPOSE (Chain Whip
  delivers strikes; Ember Channel adds burn; he could whirl without the burn). NO Force tick (passive own-core torque-read,
  not a draw — same as t81). One card this turn.
(5) HELD DARK if he crosses by this path: the MIRRORS tier-3 solution (reflections reveal true forms) — routed around by
  not-sensing, never discovered; the den's tier-4 nature + cross-reference solution; the Host/boss (room 5); the
  trust-ambush climax; the lantern-of-true-seeing reward arc; the den's one honest water (midden flask); the pair's true
  forms/count (blind, never saw them); that the far exit leads deeper-not-out. The resolution must NOT reveal the designed
  mirror-solution or the boss-gate — only that his blind-burn-cross worked to pass the room into the next unknown space.
SYSTEM_CARD: SKILL — Chain Whip (one line). No level/affinity(Force stays 1)/class/title change. Confirmed.

### 2026-07-03 — FLUSH-CASCADE handoff note (iris-prep, session close before The Tower reseats onto awen-gm--the-tower / #15155)
Written for a COLD successor who never met this session. This is orientation + pointers, not new rulings — the prep body
itself is already durable in the files below. FLUSH-THEN-RETIRE: this is a flush, no retirement (iris signals that later).
STATE AS OF THIS FLUSH:
- Prep is CURRENT THROUGH TURN 82 (last ruling entry above: t82 blind heated spin-travel + Chain Whip emergence).
- Live play is at TURN 83 published: Alan L6, class None, Floor 5 (The False Haven), BOSS phase 2 (the Host true-form
  fight). t82 deposited him at the den threshold; the jump to the boss seat at t83 was iris's live call (her canon).
- t82's Chain Whip Novice emergence is WRITTEN into sheets/alan.json (skill id `chain-whip`, rung Novice) — downstream
  landed correctly. Sheet also carries: Ember Channel/Burst/Essence-Infusion/Smithing all Apprentice, Ember Wave Novice,
  Ember Siphon + Ember-Tempered-Body Apprentice; affinities Ember Manipulation counter 8/cap 50, Force Affinity 1/10.
DURABLE PREP SURFACE (where the real content lives — read these, not this note, for substance):
- floors/floor-01..05.json — floors 1–5 fully statted. Floor 5 (The False Haven) boss is fully prepped: phase 1 (the
  Weaver, id the-host-01) + phase 2 (true-form, the-host-trueform-02) + phase-3 collapse-escape, damage-gates verified
  empirically vs engine/engine.ts on the live L6 sheet. floors/SCHEMA.md defines the floor JSON shape — read before authoring.
- mechanics/ — affinity-system.md, essence.md, progression.md (the locked systems reference). Locked facts: FLAT leveling
  (+1/floor, NO xp anywhere); damage-gate LIVE in engine.ts; rung widths 5/10/25/50/100/250; skill ladders 7-rung
  Novice→Sage, EWMA alpha=0.5, demo-gated promotions; affinity ladders 4-tier Affinity→Manipulation→Spirit→Soul, caps
  10/50/250/1000, counter resets on promotion.
NO UNWRITTEN RULINGS REMAIN. Two carry-forward items, neither is open work:
- STANDING HOOK (staged, awaiting a live event — do NOT fire proactively): the t80 FORWARD PATH "EMBER-HOUSE the core"
  pre-spec (see the 2026-06-24 t80 entry above, ~"FORWARD PATH (next pre-stage)"). It meters the future ember-into-
  winding-drum-core bind = Alan's first REAL Force-affinity wield (likely a further Force tick + first wielding). The spec
  groundwork is already written in that t80 entry; the GM pings prep to meter it when Alan attempts the bind.
- NEXT PREP FRONTIER: Floor 6 is UNSTATTED (floors stop at floor-05.json). It is the next body of prep work, to be
  authored per floors/SCHEMA.md and the whole-tower ESCALATION mandate (see floor-05 designerNotes → floor 6 must be a
  clear step up in size/complexity/difficulty AND introduce a new tactical axis beyond f1 chokepoint / f2 water /
  f3 acoustics / f4 dark+timing+falling / f5 trust-vs-verification). Assign when live play nears the floor-5 boss resolution.
CANON-vs-DISPLAY affinity note (flushed this session): sheets/alan.json holds affinities as counter/cap (8/50, 1/10);
  display/state.json renders them VALUE-ONLY with no cap (8, 1) BY DESIGN (thresholds held-dark). That surface mismatch is
  correct, not drift. Full note now durable in mechanics/affinity-system.md §8 ("Canon vs. display").
