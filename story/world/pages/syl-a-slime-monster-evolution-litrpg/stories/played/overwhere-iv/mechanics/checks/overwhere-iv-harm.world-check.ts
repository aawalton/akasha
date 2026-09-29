import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const overwhereIvHarm = {
  id: "01a0ed25-39ec-7bd3-8f78-ff33d0f43690",
  type: "page-type/world-check",
  slug: "overwhere-iv-harm",
  title: "Harm",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  definition: "how much harm a blow that landed in Overwhere IV deals, and what it leaves",
  description: "How badly a blow that landed hurts.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A blow is settled only once an act has landed it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Harm is one six-sided die plus the blow's force, less the ward it meets.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A light blow adds nothing, a solid one two, a heavy one four, a crushing one eight.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fist, a slime or a small beast is light; a blade, club or wolf's bite solid.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A great beast or a strong spell is heavy; a monster of a high tier crushing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A Rift Rend is rending: it adds twelve and no ward stops it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blow landed strongly adds three, and one landed at a cost deals half.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A ward runs from nought to six: hide or leather one to two, mail three, plate five.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blow that lands deals at least one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nala is spared against every foe but one the game master named mortal before.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A spared character is beaten back at one health, never downed by the blow.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Beaten back is a real setback: she is driven off, captured, robbed or shamed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A foe is mortal only where it is far beyond her and she chose to face it anyway.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Before she faces a mortal foe, the scene plainly shows her it could kill her.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A lasting injury is written as a condition, and heals as rest and healing allow.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The health left is written on the character's health page before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        'The reading is `{"force":"solid","landed":"success","ward":0,"health":30,"spared":true}`.',
    },
  ],
} as const satisfies WorldCheck
