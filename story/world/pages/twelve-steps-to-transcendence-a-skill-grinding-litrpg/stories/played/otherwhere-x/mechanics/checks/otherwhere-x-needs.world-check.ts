import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereXNeeds = {
  id: "01a0ea6c-1fce-7d90-8f4e-df93006e8d77",
  type: "page-type/world-check",
  slug: "otherwhere-x-needs",
  title: "Needs",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  definition:
    "how hard thirst, hunger, want of sleep and cold weigh on a character in Otherwhere X",
  description: "How thirsty, hungry, tired and cold someone is.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The game master settles needs with no dice, once a turn for each character, before telling it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading counts hours since a real drink, since a real meal, awake, and in the cold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Nala came as if she had last drunk three hours before, eaten five, and just slept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A full drink takes the thirst hours to nought, and a few mouthfuls back by two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A real meal takes the hunger hours to nought, and a scrap of food back by four.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A Tier 1 body or higher counts half the hours since a meal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A night's sleep takes the waking hours to nought, and a nap takes back three.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A cold hour is one outdoors after dark without fire, shelter or clothes fit for the night.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A thin shirt, tights and bare feet are not clothes fit for an autumn night.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Wet clothes or skin count each cold hour twice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An hour by a fire, under a roof or in a blanket takes the cold hours back by three.",
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
      statement: "Cold runs warm, chilled, shivering and freezing, from 1, 3 and 6 hours.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each need's stage is a named bonus against every act, from nought to minus four.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Failing thirst takes one health an hour, dying thirst three, and freezing two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The prose shows a need as the body feels it, never as a stage or a number.",
    },
  ],
} as const satisfies WorldCheck
