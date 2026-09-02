import type { EsoAddon } from "@akasha/code-system/eso-addon"

export const temperCollectionsAddon = {
  id: "01a0624c-a660-70e0-bf26-d959d1027e91",
  pageTypeSlug: "eso-addon",
  slug: "temper-collections-addon",
  definition:
    "the add-on shipping the skyshard, lorebook, treasure, champion and item-set trackers as one",
  manifest: "json",
  addonManifest: "json",
  bindings: "xml",
  bundleEntrySlug: "collections-addon-entry",
  partSlugs: [
    "eso-interface/item-browser-layout",
    "eso-interface/lorebooks-report-layout",
    "eso-interface/lost-treasure-map-layout",
    "module/collections-addon-entry",
    "module/collections-addon-global",
    "module/collections-addon-loaded",
    "module/collections-addon-names",
    "type-declaration/collections-addon-declarations",
  ],
  interfaceSlugs: ["lorebooks-report-layout", "lost-treasure-map-layout", "item-browser-layout"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each tracker this add-on ships is a workspace package of its own.",
    },
    {
      invariantKind: "departure",
      statement: "This add-on starts each tracker and knows nothing else about that tracker.",
    },
    {
      invariantKind: "departure",
      statement: "A tracker publishes its own global rather than a member of this add-on's.",
    },
    {
      invariantKind: "departure",
      statement: "The three XML documents load after the Lua bundle.",
    },
    {
      invariantKind: "departure",
      statement: "The saved variables of all five trackers are named in the one manifest.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads what a tracker keeps.",
    },
  ],
} as const satisfies EsoAddon
