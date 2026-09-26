import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionReading = {
  id: "01a0de5e-5d53-7849-a7f3-771339fee9bf",
  type: "page-type/module",
  slug: "companion-reading",
  definition: "every companion a player may take along, read from the rows of their pages",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The companions are put in order by the build-hash place each states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A companion whose stated place is not its place in that order is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing here reads a page, so a browser and a server read companions alike.",
    },
  ],
} as const satisfies Module
