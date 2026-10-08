import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const assistantEntry = {
  id: "01a060e7-1bec-7cd5-876c-cef3639abf2a",
  type: "page-type/module",
  slug: "assistant-entry",
  definition: "what the assistant keybinds do as the game loads them",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Keybind names are made again whenever a collectible changes.",
    },
  ],
  createdAt: "2026-09-02T06:55:53.836Z",
  updatedAt: "2026-09-22T05:50:40.000Z",
} as const satisfies Module
