import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const temperSavedVariables = {
  id: "01a06053-3633-77f0-8acd-df36807c5f6c",
  pageTypeSlug: "workspace-package",
  slug: "temper-saved-variables",
  definition: "the Lua file the game writes an add-on's own state into",
  manifest: "json",
  partSlugs: [
    "module/lua-parser",
    "module/lua-serializer",
    "module/account-wide",
    "module/lua-array",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A saved-variables file is read here without any Lua being run.",
    },
    {
      invariantKind: "departure",
      statement: "The game is the only writer of a saved-variables file.",
    },
    {
      invariantKind: "constraint",
      statement: "What the game wrote is taken as written rather than corrected.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A read of a saved-variables file is as old as the game's last write of that file.",
    },
    {
      invariantKind: "constraint",
      statement:
        "The game writes a saved-variables file on a reload or a quit rather than as an addon acts.",
    },
  ],
} as const satisfies WorkspacePackage
