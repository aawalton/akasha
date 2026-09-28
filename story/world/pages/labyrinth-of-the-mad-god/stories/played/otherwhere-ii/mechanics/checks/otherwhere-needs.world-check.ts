import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereNeeds = {
  id: "01a0e993-be67-7db9-998f-26e3ccb4f5f9",
  type: "page-type/world-check",
  slug: "otherwhere-needs",
  title: "Needs",
  world: "world/labyrinth-of-the-mad-god",
  definition: "how hard thirst, hunger and want of sleep weigh on a character in Otherwhere",
  description: "How thirsty, hungry and tired someone is.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Needs are settled once a turn for each character they weigh on, with no dice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading counts hours since a real drink, since a real meal, and awake.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An hour in the open sun between noon and three counts twice toward thirst.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nala came to as if she had last drunk, eaten and slept four hours before.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A few mouthfuls of water take the thirst hours back by two, and a full drink to nought.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A handful of fruit takes the hunger hours back by four, and a real meal to nought.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A night's sleep takes the waking hours to nought, and a nap takes back three.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Thirst runs slaked, thirsty, parched, failing and dying, from 6, 12, 20 and 30 hours.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Hunger runs fed, hungry, weak and starving, from 12, 36 and 96 hours.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Want of sleep runs rested, tired, exhausted and spent, from 18, 26 and 40 hours.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each need's stage is a named bonus against every act, from nought to minus four.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Failing thirst takes one health an hour, and dying thirst three.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A trait lessening a character's needs lightens every weight by its share.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The prose shows a need as the body feels it, never as a stage or a number.",
    },
  ],
} as const satisfies WorldCheck
