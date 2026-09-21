import type { GameEncounter } from "akasha/story/game/encounter/game-encounter.page-type.types.ts"

export const theTowerPlinthGolem01 = {
  id: "01a0c664-93a2-7309-bd03-dc8f109a3589",
  type: "page-type/game-encounter",
  slug: "the-tower-plinth-golem-01",
  title: "Plinth Golem (the Warden)",
  game: "game/the-tower",
  location: "game-location/the-tower-floor-03",
  entities: ["game-entity/the-tower-plinth-golem-01"],
  readableTrait:
    "A seated stone colossus, 142 HP and slow (Initiative 12 — Alan's 24 means he ALWAYS acts first). GATE: the body is solid stone — coordinator applies x0.25 to any blow that is NOT aimed at the keystone. Pounding the torso/limbs is nearly futile (142 HP at quarter-damage = an unwinnable slog before its 20-base hammer-blows grind Alan down). THE keystone plinth at its sternum is the single load-bearing block: a precise, placed strike there (INT to read it, FIN to place it — explicitly NOT a MIGHT contest; Alan's weak MIGHT is irrelevant, his peak INT + good FIN is the whole answer) takes x3 and a clean keystone hit can stagger or one-shot-stage the collapse. A reader who identifies the plinth (the wall-note names it; an INT read finds it) and places shots there wins with Alan's actual build. Brute force CANNOT win this fight in time — that is the point. Its hammer-blows hit ~30+ and would kill VIT-6 Alan in 2–3 connects, so he must drop it FAST via the keystone, ideally before/separately from the Cantor (fighting both at once with Focus already drained is the lethal trap).",
  trigger: "approaching the archway / the dais, or striking the seated Golem",
  experience: 220,
  drop: "the cracked keystone (a dense rune-cut block — equipment/crafting seed, the heaviest 'core' yet) and the Warden's stone gauntlet (armor def 3, OR a heavy improvised fist-weapon atk 7 for a MIGHT build — Alan likely sells/crafts it)",
} as const satisfies GameEncounter
