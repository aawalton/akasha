import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereXiActionCheck = {
  id: "01a0ea7e-7704-7721-9f59-05aea7ab71b6",
  type: "page-type/world-check",
  slug: "otherwhere-xi-action-check",
  title: "Action Check",
  world: "world/the-calamitous-bob-stubbed",
  definition: "whether a declared act in Otherwhere XI comes off, and how well",
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
        "A cost is a real price: hurt, lost time, noise, a lost thing, a worse position or a bad name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The stat an act leans on adds minus one under 10, nought to 19, one to 29, two to 39.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That stat adds three from 40 and four from 50.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Power is for force, Finesse for deftness and speed, Endurance for bearing strain.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Focus is for holding and shaping, Acuity for noticing and reasoning, Willpower for resolve.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A fitting skill adds one at Novice or Beginner, two at Apprentice or Intermediate.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fitting skill adds three at Expert and four at Master.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fitting tool, a plan using a weakness, help or preparation adds one to three.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A contest with a foe of a higher step than hers is one band harder for each step between.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A contest with a foe of a lower step than hers is one band easier for each step between.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nala has no step; a person with no path counts as step nought.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A beast's step is read off its danger to her: not dangerous one, not very two, dangerous four.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A lethal beast counts as step six against her.",
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
      statement: "Bare feet on stone, gorse or stubble cost one on acts of footing and speed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Speaking unbidden to Viziman men not her kin makes her social acts with them a band harder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That burden lifts once she is known to them, or known to cast.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Pain, hunger, thirst, cold and want of sleep cost what the needs and harm say.",
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
        "Settled by `akasha story settle --story otherwhere-xi --check otherwhere-xi-action-check`.",
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
