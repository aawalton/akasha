import type { Module } from "@akasha/code-system/module"

export const memoryReaping = {
  id: "01a0686a-7a57-73d2-a05d-06bd52f76154",
  pageTypeSlug: "module",
  slug: "memory-reaping",
  definition: "the largest agent supervisor tree killed under host memory pressure",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "It stands outside the fleet it polices.",
    },
    {
      invariantKind: "departure",
      statement: "Every agent supervisor tree running as uid 1000 is watched.",
    },
    {
      invariantKind: "departure",
      statement: "A tree is killed only under host memory pressure.",
    },
    {
      invariantKind: "departure",
      statement: "The tree killed is the single largest by subtree total.",
    },
    {
      invariantKind: "departure",
      statement: "One tree goes per kill.",
    },
    {
      invariantKind: "departure",
      statement: "A kill is followed by a recovery window in which nothing else is killed.",
    },
    {
      invariantKind: "departure",
      statement: "What it is configured with is stated when it starts.",
    },
    {
      invariantKind: "departure",
      statement: "A tick that throws is reported and the loop goes on.",
    },
    {
      invariantKind: "departure",
      statement: "It runs until stopped, and a stop ends the loop at its next boundary.",
    },
  ],
} as const satisfies Module
