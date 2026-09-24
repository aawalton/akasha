import type { GameEncounter } from "akasha/story/game/encounter/game-encounter.page-type.types.ts"

export const theTowerCounterweightColossus01 = {
  id: "01a0c664-93cf-75f2-8de3-a76946f92568",
  type: "page-type/game-encounter",
  slug: "the-tower-counterweight-colossus-01",
  title: "Counterweight Colossus (the Warden)",
  game: "game/the-tower",
  location: "place/the-tower-floor-04",
  characters: ["character-other/the-tower-counterweight-colossus-01"],
  readableTrait:
    "A seated colossus of fused stone and iron, 152 HP, slow (Initiative 14 — Alan's 24 always acts first, like the floor-3 Golem). GATE: the body is armored stone-and-iron — coordinator applies x0.25 to any blow that is NOT aimed at the pawl. Pounding the torso or limbs is nearly futile (152 HP at quarter-damage = an unwinnable slog while its 22-base hammer-blows — ~90 avg, max 160+ — kill VIT-6 Alan in ONE or TWO connects). THE weakness is the MECHANISM, not brute force: the central counterweight chain is wound around its core drum under enormous tension, held by a single iron release-PAWL at its waist. A precise strike to the pawl (INT to read the mechanism — the note names it; the chain's tension is visible; FIN to place the shot — explicitly NOT a MIGHT contest, Alan's weak MIGHT is irrelevant, his peak INT + good FIN is the whole answer) releases the drum: the stored tension of the entire counterweight system unwinds through the Colossus at once. Coordinator applies x3 to a clean pawl strike, and a solid pawl hit triggers the unwinding — a stagger or one-shot-stage collapse (the chain tears it apart and the slabs below fall still). A reader who identifies the pawl and places the shot wins with Alan's actual build. SECOND, OPTIONAL read: because it IS the counterweight, sending a rising slab up hard against it (riding the beat, using the chain's slack from the flights) can momentarily over-tension and EXPOSE the pawl (coordinator: a turn where the pawl strike is at intent +2 and cannot be mitigated) — a clever environmental setup that rewards reading the whole shaft, not just the boss. Brute force CANNOT win this fight in time — that is the point, same as the floor-3 Golem. The lethal trap is engaging it in the dark (unlit, can't read the pawl, intent capped low) or fighting it on a sinking slab (on a clock, fall risk) — a reader lights up, fights from the stable gantry, and drops it via the pawl FAST.",
  trigger: "approaching the exit-stair / the headworks gantry, or striking the seated Colossus",
  experience: 240,
  drop: "the released winding-drum core (a dense tension-wound iron drum — the heaviest mechanism-core yet; equipment/crafting seed, a 'stored-force' affinity seed) and the Warden's chain-length (a usable heavy flail/tether, atk 5, OR crafting material — Alan likely crafts rather than wields it)",
  gates: [
    {
      name: "struck anywhere but the pawl",
      multiplier: 0.25,
      note: "The body is fused stone and iron, so pounding the torso or the limbs is nearly futile.",
    },
    {
      name: "placed on the release pawl",
      multiplier: 3,
      note: "One iron pawl at its waist holds the wound counterweight drum. Reading it is intellect and placing it is finesse, never a contest of might, and a solid hit unwinds the whole system through it.",
    },
  ],
} as const satisfies GameEncounter
