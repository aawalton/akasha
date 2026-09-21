import type { TemperAddon } from "akasha/temper/addon/temper-addon.page-type.types.ts"

export const temperLibDebugLogger = {
  id: "01a06061-408b-7657-add9-d2dfd959f9b9",
  type: "page-type/temper-addon",
  slug: "temper-lib-debug-logger",
  definition: "the in-game log every other addon writes to and the errors the client raises",

  addonManifest: "json",
  bundleEntry: "module/debug-logger-main",
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
      statement: "Another addon reaches this library only through the global name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This library depends on no other addon.",
    },
  ],
  library: true,
} as const satisfies TemperAddon
