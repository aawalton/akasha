import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const sleepReading = {
  id: "01a069b3-8f5a-7bff-bb12-ccc087280c99",
  type: "page-type/module",
  slug: "sleep-reading",
  definition: "the hours Alan slept, taken from his day and kept on the sleep readout",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The reading is taken on the workstation with the checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The hours are kept beside the readout the hours were taken for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The day is reached through the one module saying where a day is kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The day read is the day Alan opened rather than the day on the clock.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day moved into akasha is read from akasha.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The question to ask and how to read the answer are on the readout's own page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day with no sleep is no reading rather than a reading of zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day's sleep hours are a sum over that day's stretches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sum over no stretches is absent rather than zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day that could not be read is a refusal rather than an absent reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run of this file takes a reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The root read is the root the environment states or the folder the call was made in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty value in the environment states no root.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The readout is the one whose page names this module as serving it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The hours themselves are never printed.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Importing this file takes no reading.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here decides when a reading is due.",
    },
  ],
} as const satisfies Module
