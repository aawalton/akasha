import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatStatedParentRefusal = {
  id: "01a0686d-9d5e-7013-b269-67c3e7b3038a",
  type: "page-type/module",
  slug: "seat-stated-parent-refusal",
  definition: "the refusal of a seat command that has a parent flag",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The seat above a new seat is the seat running the call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That seat is read from the environment.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What this reads is the refusals the one reader gave rather than the call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A parent stated as a flag and a parent stated with an equals sign are both refused.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A flag merely opening with those same letters is no stated parent.",
    },
  ],
} as const satisfies Module
