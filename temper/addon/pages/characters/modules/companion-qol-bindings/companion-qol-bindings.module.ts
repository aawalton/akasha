import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionQolBindings = {
  id: "01a0611d-84c3-76da-bd79-5f0adf6ca49f",
  type: "page-type/module",
  slug: "companion-qol-bindings",
  definition: "the keybind names the quality-of-life code adds to the game",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A keybind name is added as a game string rather than declared in the manifest.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every companion the game ships has a keybind action written in the bindings.",
    },
    {
      decisionKind: "decision-kind/upkeep",
      statement: "A companion the game adds is written into the bindings before it can be bound.",
    },
  ],
} as const satisfies Module
