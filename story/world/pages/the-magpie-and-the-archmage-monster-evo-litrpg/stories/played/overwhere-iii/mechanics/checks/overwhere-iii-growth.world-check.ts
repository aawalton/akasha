import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const overwhereIiiGrowth = {
  id: "01a0ed2c-910d-7e1b-bf7f-a8ea37e8e1d4",
  type: "page-type/world-check",
  slug: "overwhere-iii-growth",
  title: "Growth",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  definition: "the experience, levels and trait ranks one turn of Overwhere III earns Nala",
  description: "How much she grew this turn.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Growth is settled once a turn, after the turn's fights and feats are told.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A foe she defeats gives ten experience per level it has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A foe five or more levels under her gives only two per level.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A foe she only helped defeat gives half.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A quest completed or a great deed done gives twenty times her level.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hundred times her level in experience makes a level, and the rest carries on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Foes in order, then deeds, each settle at the level what came before them in the turn left.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A slain monster of Level 1 to 9 yields one glimmerstone, 10 to 19 two, 20 to 39 three, 40 up five.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A corrupted beast yields blightstones in place of glimmerstones.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Glimmerstones taken up go on her glimmerstone purse; the skill shop spends them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A trait or skill at its full potential goes to Rank 2 for 100 glimmerstones.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A telling use of Mana Weaver counts toward its next rank.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The trait leaves a rank after its rank-uses times that rank in telling uses.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "At Legend with its uses full the trait is at full potential and may go to Rank 2.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Training alone, with no real foe or need, is no telling use.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The System names each gain: `[Experience gained.]`, a level, or a trait's new rank.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here rolls the dice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading names `character`, `level`, `experience`, `rank` and `uses` as they stand.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "It adds `foes` as `{level, assisted}`, `deeds`, and `telling` uses this turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nala starts at Level 1, as a Human with no class.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At Level 10 a human may take a class at a Guild's advancement stone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Village folk run Level 5 to 15, city guards 30 to 55, Order mages 35 to 45.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A Pillar is past Level 100, and a very few old mages past 150.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each level raises her most health by three and her own mana by two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The System shows a level up as `[You've reached Level N.]`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An experience page's most is a hundred times the holder's level.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Experience never shows as a number; the System says only that it was gained.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An evolution or a change of body writes the new species held.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every change in level or experience is written with a line of its history.",
    },
  ],
} as const satisfies WorldCheck
