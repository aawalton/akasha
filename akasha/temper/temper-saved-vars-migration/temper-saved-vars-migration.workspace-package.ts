import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const temperSavedVarsMigration = {
  id: "01a06072-5abb-776e-b9a1-6393d03e042b",
  pageTypeSlug: "workspace-package",
  slug: "temper-saved-vars-migration",
  definition: "carrying a player's saved variables over when addons are renamed or folded together",
  manifest: "json",
  partSlugs: [
    "module/saved-vars-blocks",
    "module/saved-vars-migration",
    "module/bundle-member-saved-vars",
  ],
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The game writes a player's saved variables as a Lua file of global assignments.",
    },
    {
      invariantKind: "constraint",
      statement: "The game deletes a saved variables file once no addon claims that file.",
    },
    {
      invariantKind: "departure",
      statement: "A migration runs before the game next loads rather than inside the game.",
    },
    {
      invariantKind: "departure",
      statement: "A migration that already ran is never run twice.",
    },
    {
      invariantKind: "departure",
      statement: "A file about to be overwritten is copied aside first.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here deletes the file a migration read from.",
    },
  ],
} as const satisfies WorkspacePackage
