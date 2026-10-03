import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const overwhereIiNeeds = {
  id: "01a0ed2b-afab-7b33-a55a-48dd18c34ff0",
  type: "page-type/world-check",
  slug: "overwhere-ii-needs",
  title: "Needs",
  world: "world/sovereign-sight-progression-fantasy-cultivation",
  definition:
    "how hard thirst, hunger, want of sleep and cold weigh on a character in Overwhere II",
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
      statement: "Nala woke as if she had last drunk eleven hours before and eaten twelve.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nala woke rested, and counts one cold hour on her first turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A full drink takes the thirst hours to nought, and a few mouthfuls back by two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A real meal takes the hunger hours to nought, and a crust or an apple back by two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A night's sleep takes the waking hours to nought, and a nap takes back three.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A cold hour is one outdoors in thaw wind, rain or dark without fire, roof or warm clothes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Water cycling in Nala halves the cold hours she counts while she is awake.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Her shirt and tights are no warm clothes; wet ones count each cold hour twice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An hour by a fire, under a roof or wrapped in a blanket takes the cold hours back by three.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Well and fell-stream water is safe; the tarn's water is bitter with salt.",
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
      statement: "Failing thirst takes one vigour an hour, dying thirst three, and freezing two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading's dry hours take each hour's vigour at the thirst stage it falls in, rounded up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Bare feet on stony lanes sting but, on her toughened soles, never cut.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The prose shows a need as the body feels it, never as a stage or a number.",
    },
  ],
} as const satisfies WorldCheck
