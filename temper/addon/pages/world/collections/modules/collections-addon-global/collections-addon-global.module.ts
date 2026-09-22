import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const collectionsAddonGlobal = {
  id: "01a0624c-a660-708c-9324-7aa221750530",
  type: "page-type/module",
  slug: "collections-addon-global",
  definition: "the global another add-on reaches this one by",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Another add-on reaches this add-on through the global rather than through an import.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The global has this add-on's name, its version, and what its keybinds call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A keybind reaches the journal through this global rather than one the journal sets.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tracker's own global is published by that tracker's own package.",
    },
  ],
} as const satisfies Module
