import type { TemperAddon } from "akasha/temper/addon/temper-addon.page-type.types.ts"

export const temperAddonCollections = {
  id: "01a0624c-a660-70e0-bf26-d959d1027e91",
  type: "page-type/temper-addon",
  slug: "temper-addon-collections",
  definition:
    "the add-on shipping the skyshard, lorebook, treasure, champion and item-set trackers as one",

  addonManifest: "json",
  addonIconsFolder: true,
  bindings: "xml",
  bundleEntry: "module/collections-addon-entry",
  parts: [
    "eso-interface/item-browser-layout",
    "eso-interface/lorebooks-report-layout",
    "eso-interface/lost-treasure-map-layout",
    "module/collections-addon-entry",
    "module/collections-addon-global",
    "module/collections-addon-loaded",
    "module/collections-addon-names",
    "type-declaration/collections-addon-declarations",
    "module/treasure-api",
    "module/treasure-book-ids",
    "module/treasure-build-data",
    "module/treasure-casts",
    "module/treasure-constants",
    "module/treasure-icons",
    "module/treasure-data",
    "module/treasure-pins-data",
    "module/treasure-pins-data-00",
    "module/treasure-pins-data-01",
    "module/treasure-pins-data-02",
    "module/treasure-pins-data-03",
    "module/treasure-types",
  ],
  interfaces: [
    "eso-interface/lorebooks-report-layout",
    "eso-interface/lost-treasure-map-layout",
    "eso-interface/item-browser-layout",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each tracker the add-on ships is a workspace package of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This add-on starts each tracker and knows nothing else about that tracker.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tracker publishes its own global rather than a member of this add-on's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The three XML documents load after the Lua bundle.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The saved variables of all five trackers are named in the one manifest.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the data a tracker keeps.",
    },
  ],
} as const satisfies TemperAddon
