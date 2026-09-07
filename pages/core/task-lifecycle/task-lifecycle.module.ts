import type { Module } from "@akasha/code/module"

export const taskLifecycle = {
  id: "01a05b92-a9c7-7218-a6a2-fd22347d97b9",
  pageTypeSlug: "module",
  slug: "task-lifecycle",
  definition: "what a task carries once it is marked done",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A task marked done carries the instant of the marking.",
    },
    {
      invariantKind: "departure",
      statement: "A task holding a rule comes due again rather than reading as done.",
    },
    {
      invariantKind: "departure",
      statement: "A task anchored from completion comes round from the day of the marking.",
    },
    {
      invariantKind: "departure",
      statement: "Every other task comes round from the day that task was already due.",
    },
    {
      invariantKind: "departure",
      statement: "The day a completion is anchored on is Alan's day rather than the UTC date.",
    },
    {
      invariantKind: "departure",
      statement: "A task holding no rule reads as done from the day of the marking onward.",
    },
    {
      invariantKind: "absence",
      statement: "A temper task holds no key saying that task is done.",
    },
    {
      invariantKind: "departure",
      statement: "A temper task never reads as done.",
    },
    {
      invariantKind: "departure",
      statement: "The keys a completion touches are read from the page type marked.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a clock.",
    },
  ],
} as const satisfies Module
