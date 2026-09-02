import type { Module } from "@akasha/code-system/module"

export const antiquitiesAddonGlobal = {
  id: "01a06274-b08a-7cab-9448-75cbe305e5e4",
  pageTypeSlug: "module",
  slug: "antiquities-addon-global",
  definition: "the name another add-on reaches this one by",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Another add-on reaches this one through the global rather than an import.",
    },
    {
      invariantKind: "departure",
      statement: "The global carries the add-on's name and version and nothing else.",
    },
  ],
} as const satisfies Module
