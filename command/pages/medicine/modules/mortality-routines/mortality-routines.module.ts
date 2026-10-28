import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mortalityRoutines = {
  id: "01a18423-dc79-7570-882d-ffa20899d609",
  type: "page-type/module",
  slug: "mortality-routines",
  definition: "Alan's daily routines that move a cause of death, and the actions changing them",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A routine is read from Alan's answers on his page or from what his logs count.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A routine nobody has answered moves no factor and waits on Alan's answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Most routine factors move only with a change from Alan's current level, held in the baseline.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Fitness is read against a stated reference, since its source doses per MET.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A logged strength set counts 2.5 minutes, rest between sets included.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Factors the sources say overlap share a cluster, and only the larger effect counts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An action no verified figure can weigh is listed as not modelled, with why.",
    },
  ],
  createdAt: "2026-10-28T20:11:45.142Z",
  updatedAt: "2026-10-28T20:11:45.142Z",
} as const satisfies Module
