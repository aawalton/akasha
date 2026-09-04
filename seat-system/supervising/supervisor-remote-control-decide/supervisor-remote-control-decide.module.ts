import type { Module } from "@akasha/code-system/module"

export const supervisorRemoteControlDecide = {
  id: "01a0686d-9d5e-7006-ba17-a047d0b1fdbc",
  pageTypeSlug: "module",
  slug: "supervisor-remote-control-decide",
  definition: "whether a seat spawns under remote control",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat is under remote control exactly where it is not headless.",
    },
    {
      invariantKind: "departure",
      statement: "A batch answers each seat under its own question and keeps the seat's name.",
    },
  ],
} as const satisfies Module
