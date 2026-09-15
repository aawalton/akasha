import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mountainDay = {
  id: "01a05c77-31e7-7659-86c4-340d070e0baf",
  type: "module",
  slug: "mountain-day",
  definition: "the day an instant falls on for someone living on a Denver clock",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A morning day starts at six in the morning.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An evening day turns at six in the evening rather than at midnight.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day steps back on the wall clock rather than by a whole day of elapsed time.",
    },
  ],
} as const satisfies Module
