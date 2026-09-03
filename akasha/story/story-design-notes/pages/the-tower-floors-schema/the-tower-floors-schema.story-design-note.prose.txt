# Floor ground-truth schema

The shape every `floor-NN.json` follows. Ground truth is **pre-decided** here so live play reads, never invents. Floor-01 is the worked reference; this codifies its shape. The engine (`engine/engine.ts`) is the math authority — every enemy's derived stats fall out of its formulas, never hand-written.

## Top-level object

| field | type | meaning |
|---|---|---|
| `floor` | number | floor index (1-based) |
| `name` | string | the floor's in-story name |
| `theme` | string | sensory establishing read — what Alan perceives entering. Player-facing prose. |
| `exits` | string[] | floor-level egress (e.g. the ascending stair). Note seal conditions in the string. |
| `rooms` | Room[] | every room, in the order encountered. |
| `encounters` | Encounter[] | every combat, keyed to a trigger. |
| `designerNotes` | string | COORDINATOR-ONLY. Difficulty intent, the winning read, fail-state warnings. May reference the loop. Never shown to Alan. |

## Room

| field | type | meaning |
|---|---|---|
| `id` | string | kebab-case stable id (`ember-chamber`). Used by triggers/exits. |
| `name` | string | in-story room name. |
| `desc` | string | player-facing room read on entry. |
| `searchables` | Searchable[] | pre-decided contents (see below). LOCK everything a player reliably tries. |
| `water` | string | water ground truth — present/absent, pooled vs damp, whether it can douse/drink/throw. Decide it so "is there water?" never confabulates. |
| `light` | string | (optional) light source + what is lit vs dark. Affects PER reads. |
| `otherExits` | string | non-floor-level exits from this room (doors to other rooms, sealed slabs, etc.). |
| `exhausted` | string | anti-farming note: what a SECOND search yields (almost always "nothing better"). Prevents the room being mined repeatedly. |

## Searchable

The core anti-confabulation unit. Each thing a player might look for is decided ahead.

| field | type | meaning |
|---|---|---|
| `thing` | string | what it is, and where (`"fallen masonry chunks (along the walls)"`). |
| `use` | string | the honest mechanical use — including `"none"` when it's a dead end. State the bonus/penalty (`"+4 Atk"`, `"cover"`). |
| `status` | string | (optional) live state: `"TAKEN (turn N)"`, `"INTACT"`. Mutable during play. |
| `note` | string | (optional) coordinator guidance — intent steering, what reaching it costs, what it hints. |

### What to lock
Pre-decide the things players reliably reach for, so the answer is ground truth not narrative convenience:
- **water / fire sources** (douse, drink, ignite, throw) — decide presence AND whether it's exploitable.
- **weapons / improvised weapons** (with `atk` value).
- **cover** (masonry, pillars, furniture).
- **levers / mechanisms / locks** (and what actually moves them).
- **exits** (every door + seal condition).
- **light** (what's lit, what's dark, what a torch costs).
- **dead ends** — explicitly `use: "none"`, so a search that finds nothing is DECIDED, not improvised.

## Encounter

| field | type | meaning |
|---|---|---|
| `id` | string | matches the enemy sheet filename stem (`sheets/<id>.json`). |
| `trigger` | string | what starts it (`"first movement past the iron door"`). |
| `enemy` | EnemySheet | full sheet, inline (see below). |
| `reward` | { xp, drop } | xp number + drop string. |

### Inline EnemySheet
Matches `engine.ts`'s `Sheet` shape plus combat-tuning fields. Computable by `derive()`.

| field | type | meaning |
|---|---|---|
| `name` | string | enemy name. |
| `kind` | `"enemy"` | always. |
| `level` | number | enemy level. |
| `class` | string | flavor class. |
| `attributes` | Attributes | all 8 on the 3–18 scale, ROLLED/chosen deliberately. |
| `rollMode` | (optional) | `"2d10"` default; `"1d20"` for swingy enemies. |
| `equipment` | { weapon:{atk}, armor:{def} } | feeds physAtk/physDef. |
| `baseDamage` | number | damage base before margin scaling (engine `baseDamage`). |
| `intentTypical` | number | the enemy's own typical intent 0–10 (most are dumb: 1–3). |
| `readableTrait` | string | THE WEAKNESS, reasoning-discoverable. Alan's INT 18 wins by READING this, not noticing it. Phrase so a player who correctly reasons about it earns a high intent score. **MUST carry at least one explicit DAMAGE-GATE MULTIPLIER** (see "Damage-gate model" below) — a `×M` the coordinator applies to the attacker's `baseDamage` for engaging (or failing to engage) the weakness. State each gate inline (`×0.25 to non-keystone hits`, `×3 to a clean keystone strike`). |
| `hpNote` | string | sanity check: `"VIT8+MIGHT2 = N HP"` — must match `derive().hpMax`. |

## Derived-stat formulas (the authority — do not hand-write derived stats; compute from attributes)
```
HP    = VIT×8 + MIGHT×2
Stam  = VIT×4 + FIN×2
Focus = INT×4 + WILL×2
Init  = PER + FIN
physAtk = MIGHT×1.5 + FIN + weapon.atk
physDef = (VIT + FIN)/2 + armor.def
mentDef = WILL×1.5 + INT×0.5
```
Mental attack power (when an enemy/PC attacks `ment`): `INT×1.2 + WILL`.

## Damage-gate model (CANONICAL — every floor inherits this)

**Why it exists.** Alan's physAtk (33.5 with the bar) overwhelms raw enemy physDef, so the engine's `margin` balloons and damage scales huge on stats alone. The flat `intent` add (0–10) is too small to matter against that — a brute swing and a clever one land within a few points. Left unchecked, **brute force trivializes every enemy and "read the weakness" becomes cosmetic**, contradicting DESIGN.md's "reading wins" and floor-01's own narrative gating (scatter the ash = nothing; strike the core = the kill). The gate is the fix that makes reading load-bearing.

**What it is.** Every enemy's `readableTrait` carries one or more **gate multipliers `×M`**. The gate is an **enemy-side multiplier the coordinator applies to the *attacker's* `baseDamage` BEFORE the engine's margin scaling** — i.e. pass a gated `baseDamage` into `resolveAction`:

```
gatedBase = baseDamage × M            // M chosen from whether the player engaged the weakness
damage    = gatedBase × (1 + margin/12)   // the engine does the rest, unchanged
```

The gate multiplies the *whole* scaled result (it sits inside the engine's own `baseDamage × (1+margin/12)`), so a ×0.25 makes a connecting hit a chip and a ×3 makes a correct read decisive — regardless of how big the margin already is. **No engine change; the engine stays the authority.** The coordinator assigns `M` the same way it assigns `intent` — by judging whether the described action actually engaged the weakness.

**Standard gate bands (the shared vocabulary — floors reuse these).**

| band | `M` | meaning |
|---|---|---|
| hard-mitigated / wrong read | **×0.25–0.4** | armored front, body of a keystone construct, swarm in its element, predator in the dark. A connecting hit is a chip; brute-forcing here is a **losing line** (slog while the enemy kills you). |
| neutral | **×1.0** | an ordinary hit with no weakness engaged either way. |
| correct read | **×1.5–×2.0** | flanked / exposed joint / stranded out of element / lit / burning. The reward for reading — fast, clean damage. |
| decisive weak-point | **×3.0** | the single load-bearing point (keystone, release-pawl) struck precisely (INT-read + FIN-placed, **not** MIGHT). One or two land it ends the fight. |

These are conventions, not hard limits — a floor may set a bespoke `M` when the fiction calls for it, but state it explicitly in the `readableTrait` and keep it inside this rough range so the curve stays legible.

**Gates ≠ affinity bias — they STACK and compound.** A gate is an **enemy-side `baseDamage` multiplier**; an **affinity bias** (mechanics/affinity-system.md) is a **player-side `intent` add** (+N for a rank-N matched element, clamped at 10). They live at different points in the formula, so they compound cleanly: an Ember-affine player exploiting a heat weakness gets the bigger margin (bias) **and** the ×M (gate) — the strongest line in the game. **Guardrail: an affinity grants NO gate of its own.** Only an enemy's `readableTrait` carries gates; the affinity sweetens a correct read, it can never substitute for one. Brute-forcing with an affinity is still a slog.

**Catalogue (floors 1–4, for reference — keep new floors consistent with this shape).**

| floor | enemy | gates |
|---|---|---|
| 1 | Ashling | narrative: scatter the ash ≈ nothing; strike the core = the kill (the model's origin, pre-numbers) |
| 2 | Drowned Sentry | frontal **×0.4** · back/joint **×1.5** · burning (brazier **or** Ember Channel) **×2** · water no-op |
| 2 | The Glut | in the flood **×0.3** · stranded on dry stone **×1.0** + fire-recoil herding |
| 3 | Hollow Cantor | direct body-hit **×0.4** · scales with bronze plates standing · halved/nullified in the dead alcove (`ment` attacker) |
| 3 | Plinth Golem | non-keystone **×0.25** · clean keystone strike **×3** |
| 4 | Gloomward Stalker | in darkness **×0.3** (+ lethal turn-one ambush) · lit/cornered **×1.8** |
| 4 | Counterweight Colossus | non-pawl **×0.25** · clean pawl strike **×3** (optional over-tension setup: pawl at intent +2, unmitigated) |
| 5 | The Welcomer / Welcomers (pair) | presented glamour **×0.25** · revealed true form **×1.8** (+ trust-ambush opener ~54 from a dropped guard; the pair also flanks) |
| 5 | The Host — P1 Weaver | decoy **×0.25** (+ ~69 counter per wrong strike) · confirmed true-Host **×3** (CRACKS the haven → P2, does not kill) · Ember-flare reveal = intent +2 unmitigated |
| 5 | The Host — P2 True Form | light-pinned **×1.5** (~2 clean hits drop it) · reaches shadow **×0.5** (re-cloaks); acts first (Init 33), ~91/hit INTO Alan — a real kill-risk fight |

## Escalation mandate (CANONICAL — every floor inherits this; Alan, 2026-06-24)

**The tower must ESCALATE.** As Alan climbs, floors get **larger, more complex, and/or more difficult.** Do not settle into a repeating template — vary the SHAPE as well as the axis. Each new floor is measured on two independent axes; a floor should advance on BOTH, and at minimum must never regress on either.

**Axis 1 — NOVELTY (a distinct tactical axis each floor).** Already the house style: f1 chokepoint · f2 water · f3 acoustics · f4 dark+vertical+timing+falling · f5 trust/verification. Every floor introduces a NEW thing the player must reason about. Keep doing this — but novelty ALONE is not enough.

**Axis 2 — MAGNITUDE (scale + difficulty ramp).** The newer mandate. Later floors should be genuinely *bigger and harder*, not just *different*:
- **SIZE** — more rooms / more interacting systems. (f4 = 3 rooms → f5 = 5 rooms.)
- **COMPLEXITY** — layered or COMPOUNDING mechanics, not one static gimmick. A mechanic that *evolves* across the floor (e.g. f5's verification ladder: the deception learns to fake each tell that beat it, forcing the player up a rung of proof room by room) beats a single weak-point repeated.
- **THREAT STRUCTURE** — vary it: single warden → coordinated MULTI-THREAT (a flanking pair) → STAGED multi-phase boss (identify → fight → escape). Avoid "one warden + one gimmick" as the standing shape.
- **DIFFICULTY** — the power budget grows with the player (level, gear, affinities, companions), so the floor's lethality must grow to match. A later boss should carry a REAL kill-risk phase (f5's true-form acts first and ~2-shots Alan), not just a bigger HP bar.

**Avoid the template trap.** The seductive default is `scout → light/solve → one boss-via-readable-weakness`. That was right for f1–f4; from f5 on, deliberately break it — multi-phase bosses, identification puzzles (not just placement puzzles), multi-threat encounters, environmental climax beats, staged objectives. Reading-beats-brute-force stays the spine; the SHAPE around it must keep changing.

**The whole-tower curve (design target, not a hard table).** Each floor ≈ the previous in size/complexity/difficulty, plus one meaningful step:

| floor band | size | mechanic shape | threat shape | boss |
|---|---|---|---|---|
| f1–f4 (done) | 1–3 rooms | one tactical axis, mostly static | single warden + gimmick | one weak-point strike |
| f5 (this floor) | 5 rooms | compounding ladder (axis that evolves) | single → flanking pair → staged | 3-phase: identify → fight → escape |
| f6–f8 (target) | 5–7 rooms | 2+ interacting systems | multi-threat as default; mixed enemy roles | multi-phase, with a real survival phase |
| f9+ (target) | 7+ / branching | compounding + interacting + time pressure | coordinated groups, mixed threat types | multi-phase + environmental + objective |

Calibrate each floor's lethality to Alan's CURRENT sheet (read `sheets/alan.json` before statting — his level, gear, affinities, and any companions move the budget). The damage-gate bands stay the vocabulary; the difference is that later floors stack more gated decisions, more simultaneously, with less margin for a wrong read. **Verify every escalation against the engine** (a boss that "should be hard" must be shown hard on the live sheet — see floor-5's verification), never assert difficulty narratively.

**Bake-forward rule.** When you design a floor, leave the NEXT floor a clear step to take — note in its `designerNotes` what axis is still unused and where the magnitude should go next, so F+1 keeps growing instead of resetting.

## Consistency rule (coordinator)
Floors must be reproducible run-to-run: a second pass matches the first (layout, searchables, enemy sheets). Build once, lock it. Re-decide nothing mid-play that was decided here.

## Retreat & combat persistence (CANONICAL — tower-wide; iris-manager ratified, 2026-06-24; origin iris-prep t78 floor-5 ruling)

**The rule.** A **true-form / essence kill is permanent.** A **retreat from a merely-wounded enemy resets that enemy to full** on the player's return. This closes the chip-and-rest-grind exploit (retreat → rest → return would otherwise trivialize any floor by attrition) while still honoring earned kills. It reframes a floor's real progress gate as *"can you kill a true form in one sustained push"* rather than *"can you grind it down across rests."*

**The load-bearing asymmetry: information persists, HP does not.** Across a retreat the player KEEPS everything he learned — the verification ladder, the tells, the weak-point reads, the floor layout. What he loses is the damage he dealt to anything he didn't finish. That asymmetry is what makes the rule read as fair rather than punishing: it rewards the sustained push and the learning, and denies only the attrition.

**Granularity is PER-ENEMY, not per-floor.** Permanence tracks each kill individually. Floor-5 is the template: The Welcomer (true-form killed t75) stays dead on return; the merely-hurt pair re-cloak, reposition, and re-heal to full. A floor with three wardens where the player kills one and flees keeps that one dead and resets the other two.

**Flavor is PER-FLOOR.** Same mechanic, different fiction:
- **Illusion / construct floors** (e.g. f5's False Haven glamour) **re-weave to pristine** — instant and total, native to an illusion. The hurt pair re-cloak, the heat-jam re-arms, tells reset fresh. No constraint: the illusion re-weaves regardless of how brief the player's breather was.
- **Physical / organic floors** recover via **elapsed rest-time** — a wounded warden that healed while the player was gone. Constrained by fiction: the heal must be carried by genuine time passing during a real rest. A brief threshold-breather is NOT a full reset for a physical enemy — partial at most; a long, genuine recovery is. The reset must have a legible in-world cause.

**Shared rest-clock (why #3 can't be gamed).** On a physical floor the player's own pool-restore and the enemy's reheal run off **one clock** — the same "did a real full rest happen" gate (interlocks with the rest model: full sleep on a cleared safe floor = full pool restore). A genuine full rest restores HIM fully AND reheals the wounded physical enemy fully; a brief threshold-breather does neither. So the safe-rest point and the enemy-recovery are the same beat: he cannot buy his own full restore without also granting the enemy theirs, and half-resting buys neither. **Glamour / construct floors deliberately DECOUPLE this** — the re-weave is free, independent of his rest — which is exactly why the illusion reset feels eerier and the physical reset feels fair.

**Amendment license.** The core rule and the per-enemy permanence are FIXED tower-wide. The per-floor flavor and the physical-reset guardrail may be amended for a specific floor whose fiction needs it — note the deviation in that floor's `designerNotes`.
