import type { GameEncounter } from "akasha/story/game/encounter/game-encounter.page-type.types.ts"

export const theTowerGloomwardStalker01 = {
  id: "01a0c664-93b9-73dd-a1ef-49659a34231d",
  type: "page-type/game-encounter",
  slug: "the-tower-gloomward-stalker-01",
  title: "Gloomward Stalker",
  game: "game/the-tower",
  location: "game-location/the-tower-floor-04",
  entities: ["game-entity/the-tower-gloomward-stalker-01"],
  readableTrait:
    "A long, low predator built for the dark — high FINESSE (16) and PERCEPTION (16), Initiative 32 (it acts before anyone, even Aura). It hunts by warmth and sound up the shaft and strikes from unlit gaps you never see coming. GATE — LIGHT is the whole fight. In DARKNESS it is effectively unhittable (coordinator applies x0.3 to any blow struck at it in the dark — Alan's weak PERCEPTION cannot find it, and swinging at a shape you can't see is near-useless) AND it gets a lethal AMBUSH first strike (coordinator: its opening attack from concealment is at intent 6 and the player is flat-footed — ~50+ to Alan's ~70 HP, a near-kill on turn one if he climbs into the dark unlit). In LIGHT (the lantern-oil lit, the hooded lantern aimed, a thrown burning brand) its concealment is STRIPPED: it loses the ambush entirely, it recoils from the flame (forced back a step, cannot close to strike that turn), and a lit, pinned, or cornered Stalker takes x1.8 and Alan's INT read of its lunge-lines lands clean (intent 8+). It is FRAGILE once seen (98 HP but no armor, low WILL) — the danger is ENTIRELY the dark. The wrong read — climbing up unlit, fighting it on the moving slabs in the black, trying to out-spot it (his weak axis) — gets Alan ambushed and likely killed before he acts. The right read — claim and LIGHT the lantern first, fight from a stable flight, let the light deny it the dark — turns a lethal predator into a fast kill. Note: it will try to bait Alan off stable footing into the open dark (where its FINESSE and the fall both favor it); a reader stays lit and grounded.",
  trigger:
    "moving up past the first broken flight in the dark, OR any sound/warmth carried up the shaft while unlit",
  experience: 180,
  drop: "a Stalker's eye-lens (a dark-affinity / night-sight seed — clouded crystal that drinks light; crafting/affinity seed) and its hide (light, tough — a wearable cloak, armor def 1, OR a crafting material)",
} as const satisfies GameEncounter
