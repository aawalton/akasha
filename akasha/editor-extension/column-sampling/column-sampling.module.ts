import type { Module } from "../../code-system/modules/module.page-type.ts"

export const columnSampling = {
  id: "01a0686b-bfe9-7eea-9240-9c8c57aeb34f",
  pageTypeSlug: "module",
  slug: "column-sampling",
  definition: "one sweep of this window's terminals, recorded as an observation and remembered",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A sweep reading no process rows answers nothing and records nothing.",
    },
    {
      invariantKind: "departure",
      statement: "Every column a seat was seen in is remembered before anything is recorded.",
    },
    {
      invariantKind: "departure",
      statement: "The sweep is recorded against the bound the process reading was given.",
    },
    {
      invariantKind: "departure",
      statement: "How many seat terminals stand here and how many sit in a group are recorded.",
    },
    {
      invariantKind: "departure",
      statement: "The trigger that started the sweep is recorded with it.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here draws a row.",
    },
  ],
} as const satisfies Module
