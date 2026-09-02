import type { Module } from "@akasha/code-system/module"

export const eventsAddonEntry = {
  id: "01a06157-835b-7e24-b78f-3cc7b42cbcf1",
  pageTypeSlug: "module",
  slug: "events-addon-entry",
  definition: "where the transpiler starts this add-on's one Lua file",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Nothing here runs before the game says this add-on has loaded.",
    },
  ],
} as const satisfies Module
