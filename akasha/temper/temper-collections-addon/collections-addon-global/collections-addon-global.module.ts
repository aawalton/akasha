import type { Module } from "@akasha/code-system/module"

export const collectionsAddonGlobal = {
  id: "01a0624c-a660-708c-9324-7aa221750530",
  pageTypeSlug: "module",
  slug: "collections-addon-global",
  definition: "the global another add-on reaches this one by",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Another add-on reaches this one through the global rather than through an import.",
    },
    {
      invariantKind: "departure",
      statement: "The global carries this add-on's name and version and nothing else.",
    },
    {
      invariantKind: "departure",
      statement: "A tracker's own global is published by that tracker's own package.",
    },
  ],
} as const satisfies Module
