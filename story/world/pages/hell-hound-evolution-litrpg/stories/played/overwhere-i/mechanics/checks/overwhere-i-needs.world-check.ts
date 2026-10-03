import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const overwhereINeeds = {
  id: "01a0ed26-0a4e-77c4-ad84-ae5250411878",
  type: "page-type/world-check",
  slug: "overwhere-i-needs",
  title: "Needs",
  world: "world/hell-hound-evolution-litrpg",
  definition: "how hard thirst, hunger, weariness and cold weigh on a character in Overwhere I",
  description: "How thirsty, hungry, weary and cold someone is.",
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
      statement: "Nala woke as if she had last drunk two hours before, eaten four, and slept well.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A full drink takes the thirst hours to nought, and a few mouthfuls back by two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A real meal takes the hunger hours to nought, and a scrap of food back by two.",
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
      statement: "Wet clothes count each cold hour twice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An hour by a fire, under a roof or in a cloak takes the cold hours back by three.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Fire drawn from her reserves warms her as a fire does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Thirst weighs from 6 hours, and harder from 12.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Hunger weighs from 12 hours, and harder from 36.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Weariness weighs from 18 hours awake, and harder from 26.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Cold weighs from 1 hour, and harder from 3.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each need costs minus one on every act, and minus two once it weighs harder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No need costs more than minus two, however long it goes unmet.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No need takes health or kills her in ordinary play; it wears her down.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Settled by `akasha story settle --story overwhere-i --check overwhere-i-needs`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        'The reading is `{"character":"...","sinceDrink":2,"sinceMeal":4,"awake":1,"coldHours":0}`.',
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The prose shows a need as the body feels it, never as a stage or a number.",
    },
  ],
} as const satisfies WorldCheck
