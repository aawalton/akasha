import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const taskLifecycle = {
  id: "01a05b92-a9c7-7218-a6a2-fd22347d97b9",
  type: "page-type/module",
  slug: "task-lifecycle",
  definition: "what a page has once it is marked done",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A task marked done has the instant of the marking.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A task with a rule comes due again rather than reading as done.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A task anchored from completion comes round from the day of the marking.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other task comes round from the day that task was already due.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The day a completion is anchored on is Alan's day rather than the UTC date.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An anchor written as the text `true` is read as true.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A completion captured earlier comes round from the clock rather than from itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A task with no rule reads as done from the day of the marking onward.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A task reads as done where the task has the key saying so.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A completion shape is declared for a page type rather than for each type below it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page type takes the completion shape of the nearest page type it extends that has one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A to-do, a temper task and a collection each have a completion shape.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A collection reads as done where its own progress reaches its own length.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A collection with no length of its own reads as done where it has a completion instant.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Marking a collection done carries its own progress to its own length.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Marking a collection done gives it the instant of the marking as its completion.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Taking a collection's completion back puts its own progress back at nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule that will not parse leaves the due date alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Taking a task's completion back clears every key that completion set.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a clock.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A second marking on the day of the first leaves the due date where the first put it.",
    },
  ],
} as const satisfies Module
