import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionsConstants = {
  id: "01a0611d-84d2-779b-a879-d2363a90342d",
  type: "page-type/module",
  slug: "companions-constants",
  definition: "the add-on's name and the shape its saved variables start out as",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The add-on name is the one key every saved variables read and every event name is built from.",
    },
  ],
} as const satisfies Module
