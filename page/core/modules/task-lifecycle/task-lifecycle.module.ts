import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const taskLifecycle = {
  id: "01a05b92-a9c7-7218-a6a2-fd22347d97b9",
  type: "module",
  slug: "task-lifecycle",
  definition: "what a task has once it is marked done",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A task marked done has the instant of the marking.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A task with a rule comes due again rather than reading as done.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A task anchored from completion comes round from the day of the marking.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every other task comes round from the day that task was already due.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The day a completion is anchored on is Alan's day rather than the UTC date.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An anchor written as the text `true` is read as true.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A completion captured earlier comes round from the clock rather than from itself.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A task with no rule reads as done from the day of the marking onward.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every page type here has a key saying the task is done.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The keys a completion touches are read from the page type marked.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rule that will not parse leaves the due date alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Taking a completion back clears every key that completion set.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a clock.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A second marking on the day of the first leaves the due date where the first put it.",
    },
  ],
} as const satisfies Module
