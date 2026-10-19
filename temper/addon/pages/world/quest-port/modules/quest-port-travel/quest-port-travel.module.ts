import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const questPortTravel = {
  id: "01a11cf4-ae34-77f5-97fd-67671ce0f801",
  type: "page-type/module",
  slug: "quest-port-travel",
  definition: "the reading of travel points and the port to one, shared by every port keybind",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every port keybind reads travel points and ports through this module.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An owned house is ported to outside rather than inside.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A dungeon, trial or arena is ported into through its way in, by recall like a wayshrine.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A wayshrine is out of reach only while the game blocks recall outright.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every refusal and every port is said in chat and written into the press.",
    },
  ],
  createdAt: "2026-10-08T19:19:19.859Z",
  updatedAt: "2026-10-19T18:21:07.960Z",
} as const satisfies Module
