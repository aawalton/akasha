import type { EsoAddon } from "@akasha/code-system/eso-addon"

export const temperEventsAddon = {
  id: "01a06157-835b-787b-bc13-9bd25c3742cd",
  pageTypeSlug: "eso-addon",
  slug: "temper-events-addon",
  definition: "the add-on counting down world content the game gates behind a timer",
  manifest: "json",
  addonManifest: "json",
  bindings: "xml",
  bundleEntrySlug: "events-addon-entry",
  partSlugs: [
    "module/events-addon-names",
    "module/events-addon-global",
    "module/next-boss-declarations",
    "module/next-boss-colors",
    "module/next-boss-constants",
    "module/next-boss-state",
    "module/next-boss-global",
    "module/next-boss-ui-strings",
    "module/next-boss-saved-variables",
    "module/next-boss-data",
    "module/next-boss-timers",
    "module/next-boss-events",
    "module/next-boss-gui",
    "module/next-boss-menu",
    "module/next-boss-init",
    "module/events-addon-loaded",
    "module/events-addon-entry",
    "eso-interface/next-boss-layout",
  ],
  interfaceSlugs: ["next-boss-layout"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One add-on holds the timers rather than one add-on for each timer.",
    },
    {
      invariantKind: "departure",
      statement: "The Imperial City boss round is the first thing this add-on tracks.",
    },
    {
      invariantKind: "departure",
      statement: "A tracker shares nothing with another tracker.",
    },
    {
      invariantKind: "departure",
      statement: "The XML document loads after the Lua bundle.",
    },
    {
      invariantKind: "constraint",
      statement: "Nothing here reaches a Date.",
    },
  ],
} as const satisfies EsoAddon
