import type { GameEntity } from "akasha/story/game/entity/game-entity.page-type.types.ts"

export const theTowerAlan = {
  id: "01a0c68f-545d-7db4-b0c9-a404b66be267",
  type: "page-type/game-entity",
  slug: "the-tower-alan",
  title: "Alan",
  game: "game/the-tower",
  kind: "player",
  skills: [
    {
      name: "Ember Channel",
      progress: 9,
      effect:
        "Project Ember essence into held iron — tip or a longer span — lending a heat/ember quality to strikes. Reliable when set to it (Journeyman); not yet thrown unbidden mid-fight (that is Expert). Costs Focus to invoke and sustain (more metal lit = more drain); cold water quenches it fast. Engine hook: skillBonus +1 at Apprentice. Scales with use and with Ember Affinity tier.",
    },
    {
      name: "Ember Burst",
      progress: 8,
      effect:
        "Discharge Ember essence outward from the body in a wave — an area pulse of heat that sears and flings back what stands close; strong against a clustered swarm. Reliable now when set to it (Journeyman), proven under live pressure. Intensity + Focus cost scale with how much heat he releases (a max burst is a deep Focus pull); an uncontrolled all-out discharge risks backlash (the turn-17 panic version). Quenched fast by water — best thrown from dry ground at a lured, massed target. Engine hook: skillBonus +1 at Apprentice. Grows with use.",
    },
    {
      name: "Essence Infusion",
      progress: 6,
      effect:
        "Extract an essence from a raw source and bind it into a separate object, imparting that essence's quality to the item. At Novice the binding is crude and UNSTABLE — it weakens with use and does not last; opposite-pole essences (as here) fight the grip and cost heavily. Costs Focus (the essence drains the well while held in transit; ~30 for this first opposite-pole imbue). Scales with use; higher rungs bind deeper and more lastingly. POLARITY TAX: a compatible essence binds at baseline; an OPPOSITE-pole essence (cold into his fire-grip, as turn 30) costs more Focus and binds shakier, and the tax EASES per rung — heavy at Novice (~+50% Focus, fastest bleed-off, lowest stability) -> noticeable at Journeyman -> merely costlier at Master -> immaterial at Sage.",
    },
    {
      name: "ember-wave",
      progress: 3,
      effect:
        "Projects channeled Ember outward through a conduit (esp. the infused Burning Anger) as a wave/gout of flame. Form refines with rung (wave -> directed gout -> fireball at higher control). Focus-costly; amplified + cheapened when channeled through a charged infused weapon (spends the weapon's bound charge).",
    },
    {
      name: "ember-siphon",
      progress: 1,
      effect:
        "Draws ember/heat essence out of a SOURCE (object or creature) through a contact / struck point and INTO himself — feeds Ember affinity (absorption event). Bypasses a physical shell to reach the essence within. Risk: pulling from a dense/active source near his fire-capacity overflows and burns him; a cleanly-opened wound pulls deeper. Form/yield refine with rung.",
    },
    {
      name: "ember-tempered-body",
      progress: 1,
      effect:
        "BODY-FORGING path. Channels ember-essence (esp. siphoned/overfilled heat) into his own flesh to scour weakness and harden it. Ranks grant physical resilience; a clean high-margin temper can yield a permanent attribute gain (VIT/MIGHT) or maxHP. Gated by VITALITY (low VIT = more self-harm per temper) and by control precision (low roll = burns without hardening). NOT grindable by reps — each temper costs real essence + real HP + real risk.",
    },
    {
      name: "Smithing",
      progress: 1,
      effect:
        "Mundane metalworking — shaping, joining, and forge-welding metal with heat + hammer + quench. Ember provides reliable forge-heat. Quality of the product (integrity, balance, secure joins) scales with the skill + roll. Crude tools cap quality until better gear/anvil.",
    },
    {
      name: "Chain Whip",
      progress: 3,
      effect:
        "Novice: a spinning 360 sweep that neutralizes flank attempts (no exposed back) and bashes anything that enters the circle. Sustained by stamina. COMPOSES with Ember Channel (Ember run along the chain adds a x1.4 burning edge to its strikes -- a separate application, not part of the skill). Composes with the Force sense (passive: feeling the core's stored torque ride the spin steadies control, t81).",
    },
  ],
  affinities: [
    {
      name: "Ember Manipulation",
      type: "Ember / Heat",
      tier: "manipulation",
      counter: 9,
      effect:
        "Manipulation tier (shape / direct): no longer only senses the element — can move and form heat/ember deliberately, beyond drawing it through held metal. Engine hook: intent +2 (clamped at 10), stacks with enemy damage-gates, grants none of its own. At counter 50 it promotes to Spirit (animate at will). Retained through everything (loop-safe).",
    },
    {
      name: "Force Affinity",
      type: "Stored-Force / Tension",
      tier: "affinity",
      counter: 1,
      effect:
        "Affinity tier (SENSE): now senses the foreign stored-force deliberately (the t79 incidental torque-tell becomes a real sense -- no longer slides off). Cannot yet draw-and-keep or wield it: housing into ember flesh fails (wrong vessel); needs an EXTERNAL ember-housed vessel. Counter 1/10 toward Force Manipulation. Bias +1 per the ember-parallel ladder, LATENT until he has a vessel to act through.",
    },
  ],
  equipment: [
    {
      name: "Stalker hide cloak",
      slot: "armor",
      defense: 1,
      note: "The pale stalker hide tied loosely round his neck — a makeshift cloak. Uncrafted/loose, but turns a blow better than bare skin. +1 physDef (engine equipment.armor.def). TURN 66.",
    },
    {
      name: "Burning Anger",
      slot: "weapon",
      attack: 10,
      note: "Twin-headed ember maul — TURN 65 capstone forge (NAT-20 masterwork). Consolidated ALL his ember metal into one double-ended weapon: Burning Anger's haft + the Ember-bound iron rod (was Cold Revenge) fused into one ember shaft; the Furnace-heart set as a LIVING CORE, clad layer-on-layer with the fire-purged rivet + brazier-stand + Burning Anger's old steel head; the cored head welded to one end, the forge-bound iron hammer-head to the other. White-hot welds powered by pooled battery-charge. atk 10. His finest conduit: the core banks a deep charge and feeds flame-techniques from its own supply (spares his focus). Charged full. UNNAMED — his to christen. (Supersedes Burning Anger + Cold Revenge, both forged into it.)",
    },
    {
      name: "River-stone (cold-imbued)",
      note: "The smooth dark river-stone, turn 34 imbued with cold-essence transferred (half) out of the cold-bitten bar via Essence Infusion. An OPPOSITE-pole bind for him (cold against a fire-attuned grip): roll 2 + polarity tax = it HELD but CRUDE and unstable — a beginner's cross-pole knot that will bleed off unless the water keeps feeding it. Returned to the cistern to soak. A second cold-well, cruder than the bar.",
    },
    {
      name: "Stalker hide",
      note: "Light, tough, pale hide skinned from the dark-hunter — a raw crafting material (a wearable cloak, or worked into other gear). TURN 59: taken from the kill.",
    },
    {
      name: "Stalker eye-lens",
      note: "A clouded crystalline lens cut from the dark-hunter's eye — cold to the touch, and it seems to DRINK light rather than throw it back. A curiosity / crafting material. TURN 59: taken from the kill.",
    },
    {
      name: "Hooded lantern (lit)",
      note: "A dead climber's hooded iron lantern, claimed mid-shaft (t67) and lit with his ember. Directional — throws a controllable beam, shields his eyes. Burning steady.",
    },
    {
      name: "winding-drum core",
      note: "The broken Colossus's released winding-drum — dense, tension-wound iron, the heaviest and soundest crafting core he's pulled from the Tower yet; it holds residual heat he can read normally, and hums faintly with a stored force, like it has not finished unwinding. FELT OUT (t73): that humming force is REAL but FOREIGN to his senses — not ember, and not cold (it doesn't fight or bleed against his ember the way cold does); his ember-sense simply slides off it. Prime stock to work, but the stored force inside is beyond his grasp with the senses he has now. Crafting / affinity seed. FELT UNDER SPIN (t79): now affixed to Burning Anger's free chain-end as a flail counterweight; whirling the maul gave the first faint DIRECT sense of the stored force -- it torques and resists unlike dead iron, real and sealed -- confirming it is locked behind a bind he has not made. Usable only once bound the way his ember was. Still prime crafting stock. DREW (t80): detached from the chain and spun in his own hands; reached the stored force deliberately for the first time (the t79 torque-tell became a real sense) and CONTACTED it -- but pulling it into his own ember flesh FAILED (it would not set; sluiced through and out). Force Affinity emerged 0->1. Sensed now, not yet wieldable: needs an external ember-housed vessel, not his body. RE-RIGGED (t81): re-lashed to Burning Anger's chain-end as the dervish-flail's weight and driven in a tight-CoG whip (maul-head grip, core swung). Solid practical control achieved; his Force sense rides the core's stored torque to help time the swing (sense-only, no draw). Sensed and ridden, not yet wielded. BURNED (t82): whipped at the chain's end as the dervish-flail's weight and set alight (maul-core Ember run along the chain) for a burning spin-cross of the gallery; he felt its stored torque ride the spin and steady the whirl (passive sense, no draw). Sensed and ridden, not yet wielded.",
    },
    {
      name: "Snapped cold-iron blade",
      attack: 2,
      note: "A snapped length of cold iron — a prior climber's broken blade, sheared off at a third of its length, dragged out of the charnel pile beneath the haven's false feast. Pitted and real. A minor improvised weapon (atk 2) and good cold-iron forge stock. TURN 72 (floor-5 threshold salvage).",
    },
    {
      name: "Reclaimed den-metal (forge-stock)",
      note: "A double handful of sound metal salvaged from the Haven den's midden and fire-cleaned (t86): belt-buckles, a pitted eating-knife, a scatter of good nails, the iron clasp off a pack-frame. Raw forge-stock, no worked value yet. FORWARD THREAD: Burning Anger's core is a spent black coal (t84) — it 'warms from fire, not from sleep' and needs a forge he does not yet have; this stock is toward that repair/re-forge. 'Paid for by strangers' — pulled from the remains of everyone the haven ate.",
    },
    {
      name: "Clouded lens",
      note: "Palm-sized lens recovered from the wreck of the Host's seat (t88). Clear glass gone the grey-white of a blind eye, and cold — colder than stone, working to stay so. His ember-sense slides off it and takes no measure. Unidentified salvage.",
    },
    {
      name: "Woven-light mantle",
      note: "The Host's shed mantle, gathered from the seat-wreck (t88). The woven brightness of the haven's kind faces, gone slack and grey, shed in one piece and weightless; a ghost of warmth stirs where flame touches it. Unidentified glamour-stuff.",
    },
  ],
  dice: "game-mechanic/one-d-twenty",
  unspentAttributePoints: 3,
  note: "Glass cannon of a MIND. Fragile body, peak analysis, swingy fate (1d20), roaring-when-regulated charisma. D&D scale: 10 = average adult, 18 = human peak. — No class yet. None is the ordinary base state (not an error); a class is shaped by what you do. Display shows 'None', flat, no warning framing.",
} as const satisfies GameEntity
