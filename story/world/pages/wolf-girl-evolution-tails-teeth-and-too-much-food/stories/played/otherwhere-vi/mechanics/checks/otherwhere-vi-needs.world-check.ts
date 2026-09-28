import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereViNeeds = {
  id: "01a0ea41-69a6-754c-8d34-1f7d3835efea",
  type: "page-type/world-check",
  slug: "otherwhere-vi-needs",
  title: "Needs",
  world: "world/wolf-girl-evolution-tails-teeth-and-too-much-food",
  definition:
    "how hard thirst, hunger, want of sleep and cold weigh on a character in Otherwhere VI",
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
        "Nala came as if she had last drunk three hours before, eaten four, and woken fourteen.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nala came wet from the moss, and counts one cold hour on her first turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A full drink takes the thirst hours to nought, and a few mouthfuls back by two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A real meal takes the hunger hours to nought, and a handful of berries back by two.",
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
      statement: "Her shirt and tights are no warm clothes; wet ones count each cold hour twice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An hour by a fire, under a roof or wrapped in a blanket or fur takes the cold hours back by three.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A dry cleft out of the wind, curled in dry moss or needles, halves the cold hours counted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Running stream water is safe; bog and still pond water bring a flux.",
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
      statement: "Failing thirst takes one HP an hour, dying thirst three, and freezing two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Bare feet on rough ground bruise after two hours and cut after four, costing one HP.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Wrapped feet, bark sandals or boots end what bare feet cost.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Deathcaps, bog water and spoiled meat poison as the System's poison lines show.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The prose shows a need as the body feels it, never as a stage or a number.",
    },
  ],
} as const satisfies WorldCheck
