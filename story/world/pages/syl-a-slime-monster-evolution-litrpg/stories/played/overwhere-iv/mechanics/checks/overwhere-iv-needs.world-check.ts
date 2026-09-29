import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const overwhereIvNeeds = {
  id: "01a0ed29-ec74-7b90-a5ea-800106e5a473",
  type: "page-type/world-check",
  slug: "overwhere-iv-needs",
  title: "Needs",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  definition: "how hunger, thirst, weariness and cold weigh on a character in Overwhere IV",
  description: "How much a body's needs are dragging on it.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Needs are settled with no dice when a turn passes an hour or more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Under six hours since a meal she is fed, under twelve peckish, under a day hungry.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Under four hours since a drink she is quenched, under ten thirsty, under a day parched.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Under sixteen hours awake she is rested, under twenty tired, under thirty weary.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Hungry, parched or weary takes one from her acts; starving, failing or spent two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cold night without shelter takes one more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The penalty from needs is one bonus named needs, and never passes minus four.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Brook water is clean to drink; the common's grass and slimes are no food for her.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Her bare feet cut and bruise on stone roads; a day barefoot on them costs two health.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No need ever takes her health below one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        'The reading is `{"hoursSinceMeal":6,"hoursSinceDrink":2,"hoursAwake":8,"cold":false}`.',
    },
  ],
} as const satisfies WorldCheck
