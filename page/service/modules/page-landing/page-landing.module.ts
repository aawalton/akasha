import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageLanding = {
  id: "01a0e462-a5b3-7aee-8d37-10b75c5357ee",
  type: "page-type/module",
  slug: "page-landing",
  definition: "the thread every write arriving over HTTP is composed and landed on",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "One landing thread composes and lands every write, append, placing and increment.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The thread that listens composes nothing and lands nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The landing thread runs the code the service was started from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The landing thread keeps reads out through the memory the reading threads share.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each landing the thread makes is told to the thread that listens.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A write arriving while the landing thread is not running is a fault of the service.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A landing thread that is lost answers what it held as a fault of the service.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A landing thread that is lost is started again a second later.",
    },
  ],
} as const satisfies Module
