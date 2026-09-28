import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereViiNeeds = {
  id: "01a0ea33-111b-7d25-a863-e4f62d338133",
  type: "page-type/world-check",
  slug: "otherwhere-vii-needs",
  title: "Needs",
  world: "world/god-of-trash",
  definition:
    "how hard thirst, hunger, want of sleep and cold weigh on a character in Otherwhere VII",
  description: "How thirsty, hungry, tired and cold someone is.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Needs are settled once a turn for each character they weigh on, with no dice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading counts hours since a real drink, since a real meal, awake, and in the cold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nala came as if she had last drunk nine hours before, eaten eleven, and slept.",
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
      statement: "A night's sleep takes the waking hours to nought, and a nap takes back three.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A cold hour is one outdoors after dark, or in rain or wind, without fire, roof or warm clothes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Wet clothes or skin count each cold hour twice, and make a cool dawn hour count.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An hour by a fire, under a roof or in a blanket takes the cold hours back by three.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Well water and clear running water are safe; ditch, pond and marsh water bring a flux.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A flux doubles the thirst hours and costs one on every act for a day.",
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
      statement:
        "A Hunger Resist skill takes a step off the hunger stage for each ten of its level.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mage of Tier 2 or more feels no thirst, hunger, want of sleep or common cold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The prose shows a need as the body feels it, never as a stage or a number.",
    },
  ],
} as const satisfies WorldCheck
