import type { TemperAddon } from "akasha/temper/addon/temper-addon.page-type.types.ts"

export const temperAddonWorld = {
  id: "01a06269-2b19-7da5-9012-2ba4d1bba677",
  type: "page-type/temper-addon",
  slug: "temper-addon-world",
  definition:
    "the add-on pinning the world map and compass, keeping a minimap, and answering quest dialogue",

  addonManifest: "json",
  addonDdsFile: true,
  bindings: "xml",
  bundleEntry: "module/world-entry",
  parts: [
    "module/world-entry",
    "module/world-global",
    "module/world-names",
    "type-declaration/world-declarations",
    "domain/temper-addon-world-navigation",
    "domain/temper-addon-world-quests",
  ],
  interfaces: ["eso-interface/minimap-animations"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each feature the add-on carries is a domain under the add-on with its own modules.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One entry starts each feature once the game says the add-on has loaded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A saved variable keeps the name the old add-on wrote under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every saved variable a feature keeps is named in the one manifest.",
    },
  ],
} as const satisfies TemperAddon
