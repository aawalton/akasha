import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const questPortReading = {
  id: "01a11c7e-140b-71b6-8dad-778019d3816a",
  type: "page-type/module",
  slug: "quest-port-reading",
  definition:
    "the open journals, port presses and next-quest moves the world add-on captured, read back",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A capture is read here outside the game rather than inside the game.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A journal lists the focused quest first, and only the focused quest with its steps.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value the game left out reads as left out rather than as a guess.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A table with no capture reads back as nothing captured.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a file or calls the game.",
    },
  ],
  createdAt: "2026-10-08T17:09:47.146Z",
  updatedAt: "2026-10-08T17:09:47.146Z",
} as const satisfies Module
