import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const dayActiveCalories = {
  id: "01a06972-ba96-7000-9539-60cc6079f306",
  type: "page-type/module",
  slug: "day-active-calories",
  definition:
    "a day's active calories, recomputed from the health samples and written onto the day",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A run of this file writes the four days ending today.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day's samples arrive after the day does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day is filled in over several arrivals rather than at once.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The calorie reader takes four days in one run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day already written is written again on a later run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day with no sample keeps the calories that day already carried.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day that throws leaves the other days to land.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run that landed nothing exits 2.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The calories are due when the samples of one of the four days ending today change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Samples changing on a day write that day and the days either side of it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No day is written before that day has come.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Samples changing within five seconds of each other are written in one round.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The watch writes the four days ending today as it starts.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Importing this file writes nothing.",
    },
  ],
  createdAt: "2026-09-03T22:45:21.686Z",
  updatedAt: "2026-10-18T15:30:13.954Z",
} as const satisfies Module
