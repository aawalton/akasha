import type { EsoAddon } from "../../code-system/eso-addons/eso-addon.page-type.ts"

export const temperLibDebugLogger = {
  id: "01a06061-408b-7657-add9-d2dfd959f9b9",
  pageTypeSlug: "eso-addon",
  slug: "temper-lib-debug-logger",
  definition: "the in-game log every other addon writes to and the errors the client raises",
  manifest: "json",
  addonManifest: "json",
  bundleEntrySlug: "debug-logger-main",
  partSlugs: [
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
  invariants: [
    {
      invariantKind: "departure",
      statement: "The log lives in memory and is written to the saved variables at logout.",
    },
    {
      invariantKind: "departure",
      statement: "An entry older than a day is dropped when the saved log is read back.",
    },
    {
      invariantKind: "departure",
      statement: "A time here is milliseconds from the epoch.",
    },
    {
      invariantKind: "departure",
      statement: "A time here is worked out from the game clock.",
    },
    {
      invariantKind: "constraint",
      statement: "Nothing here reaches a Date.",
    },
    {
      invariantKind: "departure",
      statement: "Another addon reaches this library only through the global name.",
    },
    {
      invariantKind: "departure",
      statement: "This library depends on no other addon.",
    },
  ],
} as const satisfies EsoAddon
