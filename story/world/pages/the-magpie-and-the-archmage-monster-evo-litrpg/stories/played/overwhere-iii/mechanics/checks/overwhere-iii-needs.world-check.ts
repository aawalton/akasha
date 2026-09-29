import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const overwhereIiiNeeds = {
  id: "01a0ed2e-ad2e-7834-a187-032e5fc99dbf",
  type: "page-type/world-check",
  slug: "overwhere-iii-needs",
  title: "Needs",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  definition: "what hunger, sleep, cold and bare feet cost Nala in one turn of Overwhere III",
  description: "What going without is costing her.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Needs are settled once a turn where a want of food, sleep or warmth could tell.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Eight hours without a meal is Hungry; a day is Starving.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Eighteen hours awake is Tired; thirty is Exhausted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A winter night out without cloak or fire is Chilled; wet as well, Freezing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Four miles walked barefoot is Sore Feet, until she is shod and a night has passed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each mild want takes one from her acts, and each grave one two, at most four in all.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Wants make her slower and duller; they never harm her health.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A meal, a night's sleep, a fire or boots ends the want it answers.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here rolls the dice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading names `character`, `hoursFed`, `hoursAwake`, `cold` and `barefootMiles`.",
    },
  ],
} as const satisfies WorldCheck
