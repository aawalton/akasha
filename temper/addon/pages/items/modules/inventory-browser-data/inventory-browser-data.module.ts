import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryBrowserData = {
  id: "01a06258-b528-7be0-a890-a01ea7fe2fd5",
  type: "page-type/module",
  slug: "inventory-browser-data",
  definition: "the rows the cross-character browser shows, built from every saved location",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The fixed location views are written from the location view pages as the addon compiles.",
    },
  ],
} as const satisfies Module
