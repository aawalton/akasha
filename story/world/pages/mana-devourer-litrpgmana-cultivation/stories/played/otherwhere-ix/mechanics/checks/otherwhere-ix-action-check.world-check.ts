import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereIxActionCheck = {
  id: "01a0ea36-2cb0-7d7d-856c-681c348fb745",
  type: "page-type/world-check",
  slug: "otherwhere-ix-action-check",
  title: "Action Check",
  world: "world/mana-devourer-litrpgmana-cultivation",
  definition: "whether a declared act in Otherwhere IX comes off, and how well",
  description: "Whether something Nala tries comes off.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every act whose outcome is in doubt and matters is settled here, and nothing else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act that is sure, trivial or harmless to fail is told with no roll.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act is one twenty-sided die plus every bonus the act earns.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An easy act's target is 8, a standard act's 12, a hard act's 16, an extreme act's 20.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The band is picked from the fiction before the roll, never after.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bonus names what it comes from and runs from minus four to four.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act's bonuses add to at most six either way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act clearing its target by five or more comes off strongly.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act meeting its target comes off.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act short of its target by four or less comes off at a cost.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act short of its target by five or more fails, and the situation worsens.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A natural twenty comes off strongly and a natural one fails, whatever the margin.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A cost is a real price: hurt, lost time, noise, a lost thing or a worse position.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The attribute an act leans on adds minus one under 10, nought to 24, one to 49, two to 99.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That attribute adds three from 100 and four from 250.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill that fits adds one to level 9, two to 24, three to 49, and four from 50.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fitting tool, a plan using a weakness, help or preparation adds one to three.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A contest with a foe of a higher grade than hers is one band harder for each grade between.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A contest with a foe of a lower grade than hers is one band easier for each grade between.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A band harder than extreme stays extreme and costs four more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Nala's unfamiliar body costs two on bodily acts her first week and one the second.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Bare feet on glassgrass or stone cost one on acts of footing and speed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Pain, hunger, thirst, cold and want of sleep cost what the needs and harm say.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A beast that reads stance may be faced down: a bold stance is a fitting tool.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A foe's attack is settled as her act to dodge, block or turn it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blow that lands is then settled by the harm check.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Settled by `akasha story settle --story otherwhere-ix --check otherwhere-ix-action-check`, one d20.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: 'The reading is `{"band":"standard","bonuses":[{"from":"a stick","by":1}]}`.',
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The outcome is told as the roll answered it, never softened to save the scene.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No die, band, bonus or margin appears in the prose.",
    },
  ],
} as const satisfies WorldCheck
