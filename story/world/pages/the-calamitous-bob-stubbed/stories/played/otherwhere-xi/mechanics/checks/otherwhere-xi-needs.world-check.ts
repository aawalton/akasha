import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereXiNeeds = {
  id: "01a0ea6c-e6a7-7e95-8c3b-933b7870992d",
  type: "page-type/world-check",
  slug: "otherwhere-xi-needs",
  title: "Needs",
  world: "world/the-calamitous-bob-stubbed",
  definition:
    "how hard thirst, hunger, want of sleep and cold weigh on a character in Otherwhere XI",
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
      statement:
        "Nala came as if she had last drunk three hours before, eaten five, and been awake one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Nala came wet at the knees from the dew, and counts one cold hour on her first turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A full drink takes the thirst hours to nought, and a few mouthfuls back by two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A real meal takes the hunger hours to nought, and a crust or a handful of berries back by two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A night's sleep takes the waking hours to nought, and a nap takes back three.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A cold hour is one outdoors after dark, or in rain or hill wind, without fire, roof or warm clothes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Her shirt and tights are no warm clothes; wet ones count each cold hour twice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An hour by a fire, under a roof or wrapped in a blanket or cloak takes the cold hours back by three.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A dry hollow out of the wind, in bracken or straw, halves the cold hours counted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Running hill-stream and well water is safe; bog and stock-pond water bring a flux.",
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
        "Bare feet on road stones and stubble bruise after two hours and cut after four, costing one health.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Wrapped feet, clogs, sandals or boots end what bare feet cost.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The prose shows a need as the body feels it, never as a stage or a number.",
    },
  ],
} as const satisfies WorldCheck
