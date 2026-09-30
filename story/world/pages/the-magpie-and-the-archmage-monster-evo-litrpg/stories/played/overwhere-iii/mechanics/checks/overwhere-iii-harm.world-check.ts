import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const overwhereIiiHarm = {
  id: "01a0ed2c-910d-7504-bd71-77611e48cf44",
  type: "page-type/world-check",
  slug: "overwhere-iii-harm",
  title: "Harm",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  definition: "how much harm a blow that landed in Overwhere III deals, and what is left",
  description: "How badly a blow that landed hurts.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A blow is settled only once an act or a working has landed it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Harm is one six-sided die plus the blow's force, less the ward it meets.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A light blow adds nothing, a solid one two, a heavy one five, a crushing one ten.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A working's force is what the working check answers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blow landed strongly adds three, and one landed at a cost deals half.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A ward runs from nought to eight: hide or leather two, mail four, a mage's shield six.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blow that lands deals at least one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blow on Nala leaves her at least 1 health, unless the foe is far beyond her.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A foe is far beyond her only where the game showed her so before she chose to fight.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nala left at 1 is spent; anyone else left at nought is down.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading names `target`, `health`, `force`, `landed`, and `ward` or `beyond` where due.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nala's most health is 30 at Level 1, and three more for each level after.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A townsman or a common beast has 8 to 15; a seasoned fighter 20 to 40.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A monster has about three times its level; a boss or a blighted guardian twice that.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Health falls only as this check answers, or as a working's strain costs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At 1 Nala is spent: out of the fight until she rests or is healed, and alive.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Anyone else at nought is down: dead if the foe meant it, else out of the fight.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An hour's rest gives back three health; a night's sleep gives back all of it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A low potion gives back 10, a good one 25, and a pure one all of it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The System names health as Unhurt, Scrapped, Wounded or Critical, by thirds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every change in health is written with a line of its history.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Health never shows as a number; the prose shows it as pain, blood and weariness.",
    },
  ],
} as const satisfies WorldCheck
