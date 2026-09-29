import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const overwhereIiHarm = {
  id: "01a0ed2b-afab-77aa-8578-46e68e7f4d2b",
  type: "page-type/world-check",
  slug: "overwhere-ii-harm",
  title: "Harm",
  world: "world/sovereign-sight-progression-fantasy-cultivation",
  definition: "how much vigour a blow that lands takes from a character in Overwhere II",
  description: "How badly a blow that lands hurts.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A blow that lands rolls one six-sided die, plus its force.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Force runs light 0, solid 2, heavy 4, savage 7 and crushing 10.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fist or a dog's bite is light; a club or a wolf's is solid; a greymaw's heavy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A strong hit adds three; a hit landed at a cost deals half, rounded up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Ward is armour and refined skin, up to eight; Surface skin wards two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Might above six shrugs off one for every three.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every blow that lands deals at least one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A blow that would empty an ordinary foe's vigour leaves Nala downed at one, alive.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a deadly foe's blow can take Nala to nothing, and nothing is death.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A foe is deadly only when far beyond her and she chose to face it after being shown so.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Anyone else at nothing is dying, and dies within the hour untended.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Harm to Nala shows in the prose as pain and wounds, never as numbers.",
    },
  ],
} as const satisfies WorldCheck
