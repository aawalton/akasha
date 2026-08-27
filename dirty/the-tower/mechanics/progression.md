# Progression ladders — The Tower

Two advancement engines, **different by design** (Alan's "make different things different"). SKILLS are
*capability-gated* — you rise by demonstrating you can do harder things. AFFINITIES are *quantity-gated* —
you rise by accumulating element-events. They feel different on purpose: a skill is *what you can do*; an
affinity is *how much of the element is in you*.

Authority for all math: `engine/engine.ts`. Both ladders feed the engine through its **existing** inputs
(`skillBonus`, `intent`) — no engine change. Both player-side adds are verified small enough that they
**never break the damage-gate model** (floors/SCHEMA.md): the gate decides the fight; these tip a read.

**Character level — FLAT.** A third axis, distinct from both ladders below — the canonical rule lives in its
own section, **## Character level — flat leveling (CANONICAL)** just below: `level` advances **+1 per floor
cleared**, with **no XP**. Stated there in full so it is unmissable and carried forward by every re-run of
the GM migration.

> **Floor escalation curve:** see `floors/SCHEMA.md#escalation-mandate` (floor-design authority — single source).
> As Alan climbs, floors grow on two axes (novelty × magnitude); his rising skill/affinity power budget is what
> later floors are calibrated against. The curve lives in the floor schema, not here — this is just the pointer.

| | SKILLS | AFFINITIES |
|---|---|---|
| gate | capability (what you've shown you can do) | quantity (element-events accumulated) |
| structure | 7 rungs; the **displayed number is a within-rung level**, resets to 1 on promotion | 4 monolithic tiers, each its own counter |
| spacing | **growing rung widths 5/10/25/50/100/250** (Novice→Grandmaster; Sage open). Reaching a rung's width = promotion → next rung level 1 | **double-gap** counter caps {10,50,250,1000} |
| motion | EWMA roll-up (α=0.5) creeps the within-rung level; **resets** on promotion | accumulator ticks up; **resets** on tier promotion |
| engine hook | **rung** → `skillBonus` (+0…+6) — *level-independent* | tier → `intent` bias (+1…+4), clamped at 10 |
| number resets? | **yes — to 1 at every rung promotion** | **yes — to 1 at every tier promotion** |

---

## Character level — flat leveling (CANONICAL — Alan, 2026-06-24)

**The rule: character `level` advances +1 per floor cleared. There is no XP.** Leveling IS the floor-clear
ding — applied on chapter close at a floor boundary, one level per floor, no exceptions.

- **No XP, no curve, no `xp` / `xpMax`.** XP was removed by design: it was a fiction that added load without
  value, calibrated to deliver exactly one level per floor anyway, so the floor boundary is the honest unit.
  Nothing in the engine derives from xp/xpMax (audited 2026-06-24).
- **`level` drives stat growth.** Attribute points are granted on level-up; the floor-clear is the only event
  that raises `level`.
- **Distinct from the two ladders.** SKILLS (capability-gated) and AFFINITIES (quantity-gated) are separate
  axes that advance by use / accumulation, not by floor. Character level is the third, floor-gated axis.

## SKILLS — capability-gated (7 rungs)

The displayed number is a **within-rung level**, not a cumulative score. **Rungs grow wider as you climb** —
their widths are **5 / 10 / 25 / 50 / 100 / 250** for Novice→Grandmaster, with **Sage an open terminal**.
Reaching a rung's width **promotes** to the next rung and the level **resets to 1**. So a skill reads
`Rung Level` — e.g. *Apprentice 9* — and "9" means "9th level of Apprentice (width 10)," not "9 out of 1000."
This is Alan's correction (the number is *where you are inside the rung you've earned*; the **ladder gets
harder to climb the higher you go** — wider rungs take more to cross).

| # | rung | width | cumulative total to ENTER (level 1) | structural line | Ember Channel behavior (combat-skill, w/ Ali) |
|---|---|---|---|---|---|
| 0 | **Novice** | 5 | 1 | located, unentered | Knows essence can be pushed out as heat through the bar; has never made it happen. |
| 1 | **Apprentice** | 10 | 6 | **COUNTERFEIT band** | Recognizes when heat would help, coaxes a flicker when calm — but can't summon it when it counts. Recognition outruns production. *The dangerous rung:* reads as competence in the yard, collapses under live pressure. |
| 2 | **Journeyman** | 25 | 16 | generative threshold — **cued** | Reliably invokes AND sustains heat when he **sets himself to it**: a deliberate action he stops to perform, or the application he was drilled to use here. Sound but led — the move comes from the plan. |
| 3 | **Expert** | 50 | 41 | generative threshold — **derives unprompted** | GENERATES the application unbidden: reads a live opening **he** spotted and applies heat the moment calls for, no instruction, no stopping to deliberate. Part of how he fights now, and the move is **his**. Real capability begins here. **Integration tell (→ Grandmaster):** applying it to a foe it wasn't drilled for, or fusing it with footwork / another essence, reads as *strong* Expert — the natural sign he's reaching toward the original-technique rung. |
| 4 | **Master** | 100 | 91 | frontier — **find it** | Compressed the skill into his own principles (when heat beats edge, sustain-vs-burst Focus economy, what it fails against); can teach it; knows exactly where it stops working and why. |
| 5 | **Grandmaster** | 250 | 191 | frontier — **contribute to it** | The Expert's integration matured into invention: pushes the edge out with an ORIGINAL technique no master taught — flash-superheat to shatter a parry, a heat-feint, channeling into a grappled foe. Adds to the art. |
| 6 | **Sage** | open | 441 | frontier — **define it** | REFRAMES what the skill even is — turns a weapon-heating trick into a whole school, rewriting everyone's map of what heat-channeling can do. (Perfected terminal — no rung above, so no promotion ceiling; the level simply accumulates.) |

The **rung** is the capability tier (and the only thing the engine reads — see hook); the **level** (1…width)
is fine-grained progress *within* that tier. Promotion is gated (below), so the level climbs toward the rung's
**width** and waits there until the capability is demonstrated. **Cumulative thresholds** (total accumulated
levels → placement): Novice 1–5 · Apprentice 6–15 · Journeyman 16–40 · Expert 41–90 · Master 91–190 ·
Grandmaster 191–440 · Sage 441+. These are the single authority for re-bucketing a total into a rung+level.

**The three structural lines** (Ali's behavior ladder, mapped to craft rungs):
- **Apprentice = the counterfeit band.** Recognizes, can't reliably produce. The rung most likely to get
  him killed by over-trusting it — it looks like skill until live pressure.
- **Journeyman → Expert = the generative threshold.** Real capability begins at Expert. **The line is
  AUTHORSHIP, not speed** (Ali's sharpening): a drilled rotation can be lightning-fast and still Journeyman
  (it came from the drill, not from him); a thoughtful improviser who reads *this* opening and produces the
  answer nobody handed him is already Expert. Grade on the *origin* of the move (script vs. self), not tempo.
- **Master / Grandmaster / Sage = the frontier triple.** Find it / contribute to it / define it. Rare
  endgame (rungs 6–7 especially).

### Advancing a skill (per turn it's meaningfully used)
1. Judge the **rung the use demonstrated** — by the behavior ladder above, capped at what he's actually
   capable of. (You can't demonstrate Expert "unprompted" behavior on a move you stopped to set up — that's
   Journeyman. This *is* the capability gate, expressed as a ceiling on the judged rung.)
2. **Roll the within-rung level up** toward the rung's **width `W`** (Novice 5 · Apprentice 10 · Journeyman 25 ·
   Expert 50 · Master 100 · Grandmaster 250 · Sage open): `level += 0.5 × (W − level)`, round for display
   (Ali's α=0.5). A use at-or-above the current rung nudges the level; a clearly-below use doesn't. *(Wider
   rungs take proportionally more uses to cross — the ladder hardens as it climbs.)*
3. **Apply the demonstration gate** (below): the level **cannot reach `W` (promote)** until enough qualifying
   demonstrations have accrued — it clamps at **`W − 1`** until then.
4. **On promotion** (level would hit `W` *and* the gate is satisfied): **rung += 1, level resets to 1.**
   The rung **name** follows the new rung.

**Gain reporting — `sheet.delta.skills` is a gain MAGNITUDE, always positive.** It is *never* a continuous
diff and *never* `new − old`. The gain-panel **title** carries the absolute placement (rung · within-rung
level); `sheet.delta` carries **how far it moved this gain**:
- **In-rung roll-up:** magnitude = the within-rung **levels climbed this gain** (the α=0.5 roll, rounded for
  display). Apprentice 6→8 = **+2**; 8→9 = **+1**; a use that doesn't nudge the level = **+0** (no delta).
- **Promotion:** magnitude = **+1** — one discrete ceiling-crossing step. The reset-to-1 is **structural, not a
  −N loss**, so it is never reported as a negative. Because the demo-gate clamps `level` at `W − 1` until the
  gate is met (below), a single gain can never roll *through* a promotion — promotion is always its own +1.
- Magnitude is therefore **always ≥ 0**: the display's `(+N)` tag can never read as a loss and the renderer
  needs no sign-handling. Reporting convention only — it does **not** touch the roll-up math or the engine.

### The demonstration gate — each rung harder than the last (linear, Alan-approved)
Promotion out of a rung requires **N distinct qualifying demonstrations**, where **N = the index of the rung
you are crossing INTO**: Apprentice 1 · Journeyman 2 · Expert 3 · Master 4 · Grandmaster 5 · Sage 6. A
*qualifying* demonstration is a turn judged at (or above) that target rung's behavior — for the
Journeyman→Expert crossing, a self-authored heat application off an opening **he** spotted (the authorship
test). Procedure:
- Track a `qualifyingDemos` counter per skill, for the **next** rung up.
- **Until `qualifyingDemos` reaches N:** after each roll-up, **clamp `level = min(level, W − 1)`** (W = the
  rung's width) — it asymptotes one step under the rung top (the counterfeit-band feel, generalized to every
  boundary: the number *looks* one step from promotion and stalls there).
- **When `qualifyingDemos` reaches N:** the clamp lifts; the next qualifying use takes the promotion step —
  **rung += 1, level → 1**, and `qualifyingDemos` resets for the new next-rung target.

Because α=0.5 only moves halfway toward the ceiling AND the gate needs N genuine demonstrations, **one
brilliant turn can't teleport a rung** — and each rung is harder to leave than the one below it. Capability,
not grinding. **Never retroactively demote:** a skill already placed at a rung keeps it even if its past
demo-count wouldn't satisfy today's gate — the gate applies to the *next* crossing only.

### Engine hook — `skillBonus`
A skill's **rung** (not its within-rung level) sets the `skillBonus` it contributes to a relevant action
(`effectiveScore = attackPower + skillBonus + intent + roll`): **Novice +0 · Apprentice +1 · Journeyman +2 ·
Expert +3 · Master +4 · Grandmaster +5 · Sage +6.** The within-rung level is display granularity only — it does
**not** touch the engine; Apprentice 1 and Apprentice 9 both contribute +1. Verified gate-safe (see Engine
consistency): even +6 cannot rescue a gated brute line.

> **Placement blocks below are AS-OF-EMERGENCE SNAPSHOTS, not a live roster.**
> `sheets/alan.json` is the **sole live authority** for current skill/affinity placements (the coordinator
> writes it during play). The blocks here record each ladder's *shape and emergence*, frozen at the turn
> noted — do not read them as the current value, and do not hand-sync them to the sheet (freezing eliminates
> the drift class; iris-manager 2026-06-24).

### ★ Ember Channel — placement snapshot **Apprentice 9** *(as-of t39; sheet = live authority)*
Manifested deliberately (floor 1, turn 7); behaves at the **cued** capability ("does it when he sets himself to
it, not yet unprompted"). Use-ticked up across turns 15–16 (each a meaningful invocation). **Total accumulated
levels = 14** → under the corrected rung widths (Apprentice 6–15) this re-buckets to **Apprentice 9**
(previously mis-placed at Journeyman 4 under the retired uniform-5 widths). Sits at the **9th level of
Apprentice (width 10), one step under promotion**. **Demonstration gate:** crossing into **Journeyman (index
2)** needs **2 qualifying Journeyman-grade demos** — each a reliable cued channel he set himself to under real
conditions. Until both land, the level **clamps at 9** (`W − 1`); the 2nd lifts the clamp and the next
qualifying use promotes him → **Journeyman 1**.

> **Integration — graded, not a rung (iris, locked).** Alan locked the seven names; there is no 8th band.
> Ali's combos / novel-foe instinct is captured in the GRADING instead: applying Ember Channel to a foe it
> wasn't drilled for, or fusing it with footwork / another essence, reads as **strong Expert** and is the
> natural tell he's reaching toward **Grandmaster** (the "original technique" rung). Integration is an
> Expert→Grandmaster *behavior signal* (see the Expert/Grandmaster rows), not a new rung.

### ★ Ember Burst — placement snapshot **Apprentice 6** *(as-of emergence; held; sheet = live authority)*
A second emergent ember skill (live play). **Identity: outward AREA discharge / pulse** — an all-at-once
release into a zone, the counterpart to Ember Channel's focused conduction into a held weapon. **Total
accumulated levels = 11** → under the corrected rung widths (Apprentice 6–15) this re-buckets to **Apprentice
6** (previously mis-placed at Journeyman 1 under the retired uniform-5 widths). It climbs by the same rules:
use-ticks roll the level toward the rung width (Apprentice = 10); crossing into **Journeyman (index 2)** needs
**2 qualifying Journeyman-grade demos**.

> **✅ LOCKED (iris-approved 2026-06-24) — Ember Burst rung behavior (width-independent).**

| # | rung | structural line | Ember Burst behavior (area discharge / pulse) |
|---|---|---|---|
| 0 | **Novice** | located, unentered | Knows the essence can be let go all at once as an outward pulse; it only happens as an uncontrolled, panic release — no aim, no metering. |
| 1 | **Apprentice** *(← here, lvl 6)* | **counterfeit band** | Produces a metered pulse against a **static** target when calm and unhurried — yard-competent. But the control is rehearsal: it collapses against anything moving or under pressure. Recognition of *when* to burst outruns reliable production. *Dangerous* — looks like area control in the yard, fails live. |
| 2 | **Journeyman** | generative — **cued** | Reliably discharges a controlled area burst when he **sets himself to it** — on a lured or massed target, from dry stable ground, a deliberate pre-decided release. Sound but led: the pulse comes from the plan/setup, not invented in the moment. |
| 3 | **Expert** | generative — **derives unprompted** | DEVISES area denial unbidden: reads a live opening **he** spotted (a clustering, a chokepoint, a massed rush) and shapes / times / places the pulse to it mid-fight, no setup, no instruction. The burst is **his**, improvised to this moment. Real capability begins here. **Integration tell (→ GM):** bursting an undrilled formation, or fusing the pulse with footwork / another essence, reads as *strong* Expert. |
| 4 | **Master** | frontier — **find it** | Compressed the burst into his own principles — its Focus economy (an area release costs far more than a focused strike), radius/falloff, and **exactly where area fails** (spread foes, hard cover, open ground). Can teach it; knows its limits. |
| 5 | **Grandmaster** | frontier — **contribute to it** | Pushes the edge with an ORIGINAL area technique no master taught — a **directional cone**, a **delayed bloom** (set now, detonate a beat later), **chained pulses** that leap target to target. Adds to the art. |
| 6 | **Sage** | frontier — **define it** | REFRAMES what an essence-burst even *is* — turns a panic-release-turned-area-attack into a whole discipline of zone control, timing, and geometry, rewriting everyone's map of what a pulse can do. |

> Same growing-width rungs (5/10/25/50/100/250) / `skillBonus` (+0…+6, rung-driven) and demo-gate (N = target
> rung index) as every skill — only the per-rung *behavior* is Burst-specific.

### ★ Essence Infusion — placement snapshot **Apprentice 6** *(live total as-of t65; emerged t30; sheet = live authority)*
A third emergent skill — but a **different kind**. The ember skills are *self-source, transient, element-fixed*
(his own Ember, pushed into a held weapon, gone when he stops). **Essence Infusion is external-source,
persistent-binding, and element-NEUTRAL**: extract an essence from a raw source and bind it INTO a separate
object, imparting that essence's quality to the thing. A motor technique, not an element — so it has **no
matched affinity** and **takes no affinity `intent` bias** (the turn-30 cold-ichor imbue applied none —
wrong element for his Ember affinity). It still feeds `skillBonus` (+0…+6) like any skill. Capability-gated,
7-rung, α=0.5, same growing-width rungs (5/10/25/50/100/250; reset-per-rung) as the shared ladder.

> **✅ LOCKED (iris-approved 2026-06-24, turn 30; per-rung-level semantics applied) — Essence Infusion rung behavior. Live total 11 re-buckets to Apprentice 6 under the corrected widths (was Journeyman 1 on the retired uniform-5). Full ladder + polarity tax folded into alan.json's essence-infusion entry.**

The skill axis is **binding quality** — three coupled dials that all improve up the ladder: **stability**
(does the bind hold or slip under use/pressure), **persistence** (how long / how many uses before it bleeds
off), and **Focus economy** (what the imbue costs). Polarity is a cross-cutting tax (below).

| # | rung | structural line | Essence Infusion behavior (extract → bind into an object) |
|---|---|---|---|
| 0 | **Novice** | located, unentered | Can force a bind at all, but it's **crude and UNSTABLE** — bleeds off within a use or two, needs full deliberate effort and heavy Focus (~30 for the turn-30 opposite-pole imbue). No control over depth or duration. |
| 1 | **Apprentice** *(← here, lvl 6)* | **counterfeit band** | Binds a **compatible** essence into a **static** object when calm/unhurried, and it holds a short while — yard-competent. But the control is rehearsal: under live pressure, or with a resistant source, the bind slips. Recognition of *when* to imbue outruns reliable production. *Dangerous* — looks like enchanting in the yard, fails live. |
| 2 | **Journeyman** | generative — **cued** | Reliably binds an essence into an object when he **sets himself to it** — source in hand, a deliberate pre-decided imbue, time to work. The bind is **stable for the encounter** (holds through several uses). Sound but led: the imbue comes from prep, not invented mid-fight. |
| 3 | **Expert** | generative — **derives unprompted** | IMBUES on the fly — spots a source of essence and an object that wants a quality in the **live moment HE read**, and binds it mid-fight, no setup. The imbue is **his**, improvised to this fight. Stable, persistence extends past the encounter. **Integration tell (→ GM):** a clean opposite-pole bind under pressure, or chaining infuse→strike / infuse→throw into one motion, reads as *strong* Expert. |
| 4 | **Master** | frontier — **find it** | Owns the principles of binding — the Focus economy of persistence (cost scales with how long/stable a hold must be), the polarity curve, and exactly which source↔object pairs **won't take**. Binds last reliably beyond the fight; can teach it. |
| 5 | **Grandmaster** | frontier — **contribute to it** | ORIGINAL binding no master taught — a **permanent** imbue, a **composite** multi-essence bind, an essence-**battery** object that recharges, or binding a quality into a living target / himself. |
| 6 | **Sage** | frontier — **define it** | REFRAMES what infusion *is* — turns object-imbuing into a whole discipline of essence-craft (enchantment as a school), rewriting what can hold an essence, how deeply, and for how long. |

**Polarity tax — the "fights the grip" rider (eases up the ladder).** The matched/compatible essence is the
baseline; an **opposite-pole** essence (cold into a fire-wielder's grip, like turn 30) costs more and binds
shakier. The tax **shrinks each rung** as control deepens: **Novice** = heavy (≈+50% Focus, fastest bleed-off,
lowest stability) → **Journeyman** = noticeable (costlier + shorter persistence, but holds) → **Master** =
merely costlier, no longer destabilizing → **Sage** = polarity immaterial. Same growing-width rungs
(5/10/25/50/100/250) / `skillBonus` (+0…+6, rung-driven) / demo-gate (N = target rung index, clamp at `W − 1`
until met, never retro-demote) as every skill.

**Seed & gate state:** emerged **Novice 1** (turn 30); accumulated through t30–t65 to a **total of 11 levels**,
which under the corrected widths re-buckets to **Apprentice 6** (Apprentice spans totals 6–15). Sits **mid
counterfeit band**: reliable on a *compatible* essence into a *static* object when calm, but slips under live
pressure / a resistant source. **Next gate — Journeyman (index 2)** needs **2 qualifying demos** (each a stable
bind he set himself to under real conditions); the level climbs Apprentice 6→9 with use and **clamps at 9**
(`W − 1`, Apprentice width 10) until both demos land, then promotes → **Journeyman 1**.

---

## AFFINITIES — quantity-gated (4 monolithic tiers)

Each tier is a **categorical jump in INFLUENCE** over the element — not "more of the same," a different verb.
Each tier has its own counter that fills, promotes at its cap, and **resets** into the next tier (e.g. Ember
Affinity 10 → Ember **Manipulation** 1). Caps are the **double-gap** milestones.

| # | tier | counter cap | influence — the verb | bias (engine `intent`) |
|---|---|---|---|---|
| 1 | **Affinity** | 10 | **sense / resonance** — feel the element, bias matched actions | **+1** |
| 2 | **Manipulation** | 50 | **shape / direct** — move and form the element deliberately | **+2** |
| 3 | **Spirit** | 250 | **animate, at will** — the element acts as you wish, freely | **+3** |
| 4 | **Soul** | 1000 | **become; identity** — you and the element are one | **+4** |

### Advancing an affinity — event deposits + per-point escalation
**Event deposits** (into a per-affinity event pool): **+1** per matched-element event (a heat action that
lands, a channel, sensing the element to read a weakness); **+2** for a **draw** (absorbing a fresh seed of
the type). **Anti-farm: at most 3 events deposited per encounter** (draws count their 2 toward that cap).
The element must genuinely be *used*, not swung-at for credit.

**Per-point escalation — each successive counter point costs MORE events than the last** (Alan's direction;
unit = the per-point tick, NOT the tier — inter-tier spacing stays the 10/50/250/1000 cap ladder). The visible
counter must *visibly slow* as it climbs within a tier. A point `p` (within-tier index) advances only once the
pool holds `cost(p)` events; advancing consumes them.

> **✅ LOCKED schedule (Alan, 2026-06-24 — "fine with it for now, feels nice and slow"):** bounded stepped
> ramp on the within-tier point index `p`:
> | within-tier point `p` | events / point |
> |---|---|
> | 1–10 | 1 |
> | 11–25 | 2 |
> | 26–40 | 3 |
> | 41–50 | 4 |
> | 51+ | 4 (bounded — never higher) |
>
> **Totals to fill a tier** (and reachability): Affinity (10) = **10 events** (~4–7 enc); **Manipulation (50)
> = 125 events (~42 enc @3/enc, ~63 @2/enc)** — tens, not hundreds ✔; Spirit (250) = 925; Soul (1000) = 3925
> (tiers 3–4 are intentionally long/aspirational). Near a tier's top, a 4-events/point cost at the ≤3/enc cap
> makes the counter crawl ~1 point per ~1.3 encounters — the "visibly slows" feel.

- **At the cap:** promote — counter resets to **1**, tier advances; influence categorically upgrades, bias +1.

**Gain reporting — `sheet.delta.affinities` is a gain MAGNITUDE, always positive** (same convention as skills,
above). It is *never* `new − old`. The gain-panel **title** carries the absolute tier · counter; `sheet.delta`
carries the **counter increment this gain** = the **element-events accumulated** (the within-tier points the
deposit advanced this gain). On a **tier promotion** the delta is the positive **events/points gained** that
crossed the cap — the tier-**name** flip carries the reset; the counter's drop to 1 is structural, never
reported as a negative. Magnitude stays **≥ 0**, so the `(+N)` tag never reads as a loss. Reporting convention
only — it does not touch the deposit math, the escalation schedule, or the engine bias.

### Engine hook — bias
A matched-element action gets `intent += tier-index` (Affinity +1 … Soul +4), inside the resolver's existing
`intent` input and its **clamp at 10**, so bias can never run away. Intent-only — **an affinity grants NO
damage gate of its own** (floors/SCHEMA.md); it sweetens a correct read, never replaces one. It **stacks and
compounds** with an enemy's gate (player-side `intent` add × enemy-side `baseDamage` gate live at different
points in the formula).

### ★ Ember Affinity → **Ember Manipulation 3 / 50** *(placement snapshot as-of t34; sheet = live authority)*
The Affinity-tier counter filled to 10 and **promoted on the turn-22 Glut kill** — counter reset into **Ember
Manipulation 1** (tier 2, cap 50, **bias +2**, influence = *shape / direct* the element, not just sense it).
Display: `Ember Manipulation 3/50`. Counter at **3** (advanced t34) — **point 3 sits in the 1-event/point band
(points 1–10), consistent with the now-LOCKED schedule.** Climbing toward Spirit at 50 — early points come
fast, the counter slows as it nears the cap (the 41–50 band costs 4 events/point).

> Supersedes the eu (essence-unit) thresholds in `mechanics/affinity-system.md` §3/§9 — this tier counter is
> the canonical Ember advancement now (eu retired; that file points here, per iris 2026-06-24).

---

## Essence / affinity naming canon (ubiquitous-naming, iris-locked 2026-06-24)
Alan's fire affinity is **Ember** at **every mechanical layer** — System essence/affinity readouts, the
affinity name, and the sheet all say *Ember*. Established **turn 6** (`ESSENCE ABSORBED — Ember` /
`AFFINITY ACQUIRED — Ember`). Drift at **t33–34** (the rivet essence got labeled "heat," and Alan went
looking for a nonexistent "Heat Affinity") was caught and corrected — those System lines were relabeled back
to **Ember**.

**The rule going forward:**
- **"Ember" is the mechanical label.** Every System line, affinity name, and sheet field uses *Ember* —
  never "heat," never "warmth," never "flame" as a mechanical essence/affinity name.
- **"heat" / "warmth" are descriptive PROSE only.** Narrative beats may say a bar glows with heat or the air
  warms — that's flavor. The moment it's a *mechanical label* (an absorb readout, an affinity name, a sheet
  entry), it says **Ember**.
- **Same-pole essences all feed Ember.** Heat, flame, ember — any same-pole fire essence absorbs into and
  advances the one **Ember** affinity. There is no separate flame/heat affinity.
- **Opposite-pole "cold" stays lowercase-generic, by design.** Cold is **not** his affinity — it's handled
  *externally* via **Essence Infusion** (bound into objects, never absorbed into himself), so there is **no
  Cold affinity** and never will be. Leave it lowercase-generic in prose; it never gets a capitalized
  affinity label.

This is the Ubiquitous-Naming guarantee for the element: one name (*Ember*) across data, System, sheet, and
prose-as-mechanics, so turns stay consistent and Alan never hunts for an affinity that doesn't exist.

---

## Per-rung / per-tier reset (BOTH ladders read uniformly — Alan, 2026-06-24)
**The displayed number on either ladder is a *within-band position* that resets to 1 on promotion** — never a
running lifetime total:
- **Skills:** the number is the **within-rung level** (1…the rung's width `W`, where `W` ∈ 5/10/25/50/100/250).
  Reaching `W` promotes the **rung** and resets the level to 1. `Apprentice 9` = 9th level of Apprentice
  (width 10).
- **Affinities:** the number is the **within-tier counter**. Reaching the tier cap {10,50,250,1000} promotes
  the **tier** and resets the counter to 1. `Ember Manipulation 3/50` = 3rd point of Manipulation. *(This was
  already the locked affinity model — Alan's correction brings SKILLS into line with it.)*

So a reader never has to subtract a base to know where you stand: the rung/tier name says the band, the number
says the position inside it. Both reset; you read them the same way.

## The elegance (why the two strides)
Skills and affinities still grow at **different strides on purpose**: skills reset at **growing rung widths
5/10/25/50/100/250** (frequent and fine-grained low down, harder to cross as they climb — 7 rungs of
capability), affinities reset at **wide cumulative caps {10,50,250,1000}** (rare, coarse — 4 monolithic jumps
of quantity). The reset is shared; the **stride** is what says "these are different kinds of growth" — a skill
is *what you can do* (climbs in capability steps that lengthen with mastery), an affinity is *how much of the
element is in you* (accumulates in long quantity runs).

## Engine consistency (verified vs `derive()` / `resolveAction`)
- Both hooks ride the resolver's existing inputs; **no engine change, engine stays the authority.**
- **Gate stays dominant.** Sim (`/tmp/sim-hooks.ts`, Alan @ current state, floor-2 Sentry): a gated brute
  line (×0.4 frontal) stays a **~4.4–4.7-swing slog even at a hypothetical Sage `skillBonus +6`** — a
  player-side additive can't escape an enemy-side multiplier. On a correct read (×2 burning), skill +2 +
  affinity +1 move it only 0.9→0.8 swings: they **tip** a read, never make one. Both magnitudes confirmed safe.
- **Both 2026-06-24 curve changes (skill demo-gate, affinity per-point escalation) are slow-DOWN-only.** They
  delay *when* a rung/tier is earned; they change **no** hook magnitude (`skillBonus` +0…+6, bias +1…+4 are
  untouched). Re-ran `/tmp/sim-hooks.ts` with the identical hooks → identical gate-dominant result. Escalation
  cannot affect gate-safety because it never touches the resolver inputs.

## Coordinator — per-turn procedure (quick reference)
- **Skill used?** → judge demonstrated rung (capped at capability) → roll the within-rung **level** toward the
  rung's **width `W`** (5/10/25/50/100/250 for Novice→Grandmaster; Sage open): `level += 0.5×(W − level)` → if
  that would hit `W` (promote), allow only once `qualifyingDemos ≥ N` (N = target-rung index); else clamp
  `level` to **`W − 1`**. On promotion: **rung +1, level → 1**.
- **Element event?** → deposit events into the pool (+1; draw +2; ≤3/encounter) → advance a point when the pool
  holds `cost(p)` (escalation schedule); at the tier cap, reset counter to 1 + promote tier (bias +1).
- **Display (both reset on promotion):** skills as `Rung Level`, e.g. `Ember Channel — Apprentice 9`;
  affinities as `Element Tier counter/cap`, e.g. `Ember Manipulation 3/50`.
- **Live placements:** `sheets/alan.json` is **authority** — the per-skill/affinity blocks above are
  as-of-emergence snapshots, **not** live. Read the sheet for current values (don't hand-sync this doc).
- **Naming:** the fire element is **Ember** at every mechanical layer (System / affinity / sheet); "heat" is
  prose only; opposite-pole "cold" stays lowercase-generic (no Cold affinity — Infusion-only). See *Essence /
  affinity naming canon*.

## Rulings (iris, locked 2026-06-24)
1. **Held at 7 rungs** — no 8th band; Alan locked the seven names. Integration is folded into the GRADING
   instead (an Expert→Grandmaster behavior signal — see the Expert/Grandmaster rows).
2. **affinity-system.md defers here** — eu thresholds retired; that file points at this one as canonical.
3. **Curves kept** (+0…+6 skill / +1…+4 bias) — sim-confirmed gate-safe, no retune.
4. **Skill demonstration gate** (linear N = rung index) — locked; **affinity per-point escalation** — ✅
   LOCKED (Alan, schedule above: 1–10→1 / 11–25→2 / 26–40→3 / 41–50→4 / 51+→4; ~125 events to fill
   Manipulation; resets on promotion).
5. **Per-rung-reset display** (Alan, supersedes the continuous 0–1000 score) — the skill displayed number is a
   **within-rung level** that resets to 1 on promotion; the **rung** drives `skillBonus`, the level is
   display-only. Affinities already reset on promotion (no change; Ember Manipulation 3 stands).
6. **Growing rung widths — LOCKED (Alan, 2026-06-24; supersedes the uniform-5 spacing in Ruling 5's first
   draft).** Skill rungs are **not** uniform: widths **5 / 10 / 25 / 50 / 100 / 250** for Novice→Grandmaster,
   **Sage open** (the perfected terminal — no rung above it, so no finite width). Mapping settled from the
   ladder's structure: the six finite widths are the six finite climbs *out of* the first six rungs. The
   ladder therefore **hardens as it climbs** (a high rung takes far more to cross than a low one) — the
   inter-rung escalation now lives in *both* the widths and the demo-gate. **One-time downward recompute
   (total-preserving):** each live skill's total accumulated levels was re-bucketed under the new cumulative
   thresholds — Ember Channel 14→**Apprentice 9**, Ember Burst 11→**Apprentice 6**, Essence Infusion
   11→**Apprentice 6**, Ember Wave 3→**Novice 3**, Ember Siphon / Ember Tempered Body / Smithing 6→**Apprentice
   1** (each unchanged). The three Journeyman skills correctly drop one rung — the uniform-5 widths had
   promoted them too fast. iris applies these to `sheets/alan.json` (sole live authority).
   **Demo-gate banked-state on this downward recompute — RESET (Alan via iris-manager, locked).** A skill
   moved down does **not** carry its previously-earned crossing demos: `qualifyingDemos` resets to 0 at the
   new rung, and it must re-earn the N demos to re-cross. Re-grades capability against the corrected wider
   ladder (matches the "advanced too fast" intent). E.g. Ember Channel sits at Apprentice 9 (the `W − 1`
   clamp) and must land **2 fresh Journeyman-grade demos** to promote — its old Journeyman demos do not count.
   This is the one-time-recompute rule; the standing **"never retroactively demote"** gate behavior still
   governs ordinary play (the gate never drags a skill *down*; this was a deliberate top-level correction).

**✅ Within-rung roll-up target — LOCKED (iris, 2026-06-24; updated for growing widths): per-rung ceiling `W`.**
The EWMA climbs the level toward the **rung's width `W`** (`level += 0.5×(W − level)`). Inter-rung escalation
lives in **both** the widths (a wider rung takes proportionally more uses to traverse) **and** the demo-gate
(N demos to promote). The old per-rung anchors (3/7/15/33/65/150/500) stay **retired** — the width *is* the
ceiling now, so no separate within-band anchor is needed. No per-rung within-band anchor beyond `W` itself.
