import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperAsync = {
  id: "01a0c73e-7a05-7fa6-8a83-d404a41bacc5",
  type: "page-type/domain",
  slug: "temper-async",
  definition: "a shared scheduler running other addons' work a slice at a time across frames",
  parts: [
    "module/async-api",
    "module/async-casts",
    "module/async-constants",
    "module/async-global",
    "module/async-lua-truthy",
    "module/async-main",
    "module/async-saved-vars",
    "module/async-scheduler",
    "module/async-scheduler-manager",
    "module/async-state",
    "module/async-task-callstack",
    "module/async-task-class",
    "module/async-task-loops",
    "module/async-task-sort",
    "module/async-task-timer",
    "module/async-types",
    "type-declaration/async-saved-vars-declarations",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Work handed in is run in slices rather than in a single call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slice is bounded by a share of the frame the game is drawing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A time here is seconds read from the game's own frame and update clocks.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Nothing here reaches a Date.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Nothing here reaches the Lua `os` table.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A task has a callstack of steps rather than a Lua coroutine.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Another add-on reaches the scheduler only through the global name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The debug logger is used where the debug logger is loaded and skipped otherwise.",
    },
  ],
} as const satisfies Domain
