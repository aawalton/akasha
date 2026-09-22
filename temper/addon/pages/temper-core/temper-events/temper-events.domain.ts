import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperEvents = {
  id: "01a0c707-922d-70f9-b966-db2fb4bd8cf7",
  type: "page-type/domain",
  slug: "temper-events",
  definition: "world content the game gates behind a timer, counted down",
  parts: [
    "module/events-addon-loaded",
    "module/next-boss-colors",
    "module/next-boss-constants",
    "module/next-boss-data",
    "module/next-boss-events",
    "module/next-boss-global",
    "module/next-boss-gui",
    "module/next-boss-init",
    "module/next-boss-menu",
    "module/next-boss-saved-variables",
    "module/next-boss-state",
    "module/next-boss-timers",
    "module/next-boss-ui-strings",
    "type-declaration/next-boss-declarations",
    "type-declaration/next-boss-global-declarations",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One feature has the timers rather than a feature for each timer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The Imperial City boss round is the first thing tracked here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tracker shares nothing with another tracker.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The XML document loads after the Lua bundle.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Nothing here reaches a Date.",
    },
  ],
} as const satisfies Domain
