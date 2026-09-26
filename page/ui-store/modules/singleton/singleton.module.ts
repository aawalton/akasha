import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const singleton = {
  id: "01a05b69-455a-7d6e-96f9-f114dbc25c52",
  type: "page-type/module",
  slug: "singleton",
  definition: "the page store a browser tab holds",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A temper task's listing carries the progress rows filed beside that task.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A temper set's listing carries the bonus and icon rows filed beside that set.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A companion skill's listing carries the effect and condition rows beside it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A recipe list's listing carries the recipe rows filed beside that list.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other page type is listed without the rows filed beside its pages.",
    },
  ],
} as const satisfies Module
