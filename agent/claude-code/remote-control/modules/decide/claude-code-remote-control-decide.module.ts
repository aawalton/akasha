import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const claudeCodeRemoteControlDecide = {
  id: "01a0686d-9d5e-7006-ba17-a047d0b1fdbc",
  type: "page-type/module",
  slug: "claude-code-remote-control-decide",
  definition: "whether a seat spawns under remote control",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat is under remote control exactly where that seat is not headless.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A batch answers each seat under its own question and keeps the seat's name.",
    },
  ],
} as const satisfies Module
