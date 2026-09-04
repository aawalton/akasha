import type { Module } from "@akasha/code-system/module"

export const stepSoloTime = {
  id: "01a0686c-e937-7002-9900-baaa5cdbc2d0",
  pageTypeSlug: "module",
  slug: "step-solo-time",
  definition: "how long each step of a pipeline ran with nothing else running beside it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A step whose span is unreadable or ends before it starts holds no solo time.",
    },
    {
      invariantKind: "departure",
      statement: "Time counts as solo only where exactly one step is running.",
    },
    {
      invariantKind: "departure",
      statement: "A step that never ran alone holds zero rather than nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A step starting at the moment another ends leaves no solo gap between them.",
    },
  ],
} as const satisfies Module
