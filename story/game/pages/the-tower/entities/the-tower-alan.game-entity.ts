import type { GameEntity } from "akasha/story/game/entity/game-entity.page-type.types.ts"

export const theTowerAlan = {
  id: "01a0c68f-545d-7db4-b0c9-a404b66be267",
  type: "page-type/game-entity",
  slug: "the-tower-alan",
  title: "Alan",
  game: "game/the-tower",
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
  note: "Glass cannon of a MIND. Fragile body, peak analysis, roaring-when-regulated charisma. D&D scale: 10 = average adult, 18 = human peak. — No class yet. None is the ordinary base state (not an error); a class is shaped by what you do. Display shows 'None', flat, no warning framing.",
} as const satisfies GameEntity
