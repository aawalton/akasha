import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const singleton = {
  id: "01a05b69-455a-7d6e-96f9-f114dbc25c52",
  type: "page-type/module",
  slug: "singleton",
  definition: "the page store a browser tab holds",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/gap",
      statement: "A supabase url and anon key are taken here and reach nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A temper task's listing carries the progress rows filed beside that task.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other page type is listed without the rows filed beside its pages.",
    },
  ],
} as const satisfies Module
