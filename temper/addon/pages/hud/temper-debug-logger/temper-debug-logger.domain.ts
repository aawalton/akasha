import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperDebugLogger = {
  id: "01a0c75b-4193-72c9-9d92-412f19aa2148",
  type: "page-type/domain",
  slug: "temper-debug-logger",
  definition: "the in-game log every other addon writes to and the errors the client raises",
  parts: [
    "module/debug-logger-api",
    "module/debug-logger-callbacks",
    "module/debug-logger-casts",
    "module/debug-logger-compatibility",
    "module/debug-logger-constants",
    "module/debug-logger-global",
    "module/debug-logger-log-handler",
    "module/debug-logger-main",
    "module/debug-logger-settings",
    "module/debug-logger-startup",
    "module/debug-logger-state",
    "module/debug-logger-tagged-logger",
    "module/debug-logger-types",
    "type-declaration/debug-logger-declarations",
    "type-declaration/debug-logger-saved-variables",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The log lives in memory and is written to the saved variables at logout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry older than a day is dropped when the saved log is read back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A time here is milliseconds from the epoch.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A time here is worked out from the game clock.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Nothing here reaches a Date.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Another add-on reaches the log only through the global name.",
    },
  ],
} as const satisfies Domain
