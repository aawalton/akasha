import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gearReading = {
  id: "01a0e0a8-7160-7e48-98ca-a76cb2d40608",
  type: "page-type/module",
  slug: "gear-reading",
  definition: "the gear pages a character build reads, read and held with the skill catalogue",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every gear table a build reads is read from its pages rather than written in code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing here reads a file, so a browser and a server read gear alike.",
    },
  ],
} as const satisfies Module
