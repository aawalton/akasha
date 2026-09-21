import type { GameEntity } from "akasha/story/game/entity/game-entity.page-type.types.ts"

export const haremHotelAlan = {
  id: "01a0c662-f92c-763d-a838-e4bf42f057b7",
  type: "page-type/game-entity",
  slug: "harem-hotel-alan",
  title: "Alan",
  game: "game/harem-hotel",
  kind: "player",
  level: 2,
  attributes: [
    { attribute: "game-attribute/finesse", score: 15 },
    { attribute: "game-attribute/intellect", score: 18 },
    { attribute: "game-attribute/luck", score: 11 },
    { attribute: "game-attribute/might", score: 12 },
    { attribute: "game-attribute/perception", score: 12 },
    { attribute: "game-attribute/presence", score: 16 },
    { attribute: "game-attribute/vitality", score: 10 },
    { attribute: "game-attribute/will", score: 18 },
  ],
  traits: [
    {
      name: "Wild Variance",
      effect:
        "Fate runs swingy for him — he plays the variance rather than hiding from it (rollMode 1d20, the wide flat spread). High ceilings, real floors.",
    },
  ],
  equipment: [
    {
      name: "Letter-Knife",
      slot: "weapon",
      attack: 5,
      scaling: "game-attribute/finesse",
      note: "Slim plain letter-knife the Hotel seated inside the Doorward's keystone (its hidden solution-object). Won and used to make the floor-1 kill. Scales on FINESSE, needs no MIGHT — a precision blade, true to Alan's build. — keystone/seam — crit-affinity band when driven into a struck weak-point",
    },
  ],
  dice: "game-mechanic/one-d-twenty",
  unspentAttributePoints: 0,
  note: "Glass cannon of a MIND. Body toughening at L2 (VITALITY 10, up from a fragile starting 7 — the Doorward drew his first blood and he came out of it hardier), peak analysis (INTELLECT 18), roaring-when-regulated presence (16). Woke at the bottom of the Harem Hotel with no memory of arriving. Reads himself outside-in from his own tells. Commits fast; probes ceilings on purpose; wants the numbers true more than favorable. — No class yet. None is the ordinary base state (not an error) — a class is earned in play, not assigned at start. — Threshold",
} as const satisfies GameEntity
