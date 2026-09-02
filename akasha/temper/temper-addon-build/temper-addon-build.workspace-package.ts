import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const temperAddonBuild = {
  id: "01a06038-2cc1-7116-80a1-184fa5a8f3f6",
  pageTypeSlug: "workspace-package",
  slug: "temper-addon-build",
  definition: "what building temper's ESO addons out of TypeScript needs to know",
  manifest: "json",
  partSlugs: [
    "module/lua-build-command",
    "module/addon-tstl-config",
    "module/global-name-dependents",
    "module/consolidation-migrations",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An addon reaches the game as Lua transpiled from TypeScript.",
    },
    {
      invariantKind: "departure",
      statement: "A global name the game or another addon reads cannot be renamed freely.",
    },
    {
      invariantKind: "departure",
      statement: "An addon folded into another carries the absorbed addon's saved variables over.",
    },
    {
      invariantKind: "departure",
      statement: "An addon folder carrying no tsconfig is built from settings a build writes.",
    },
    {
      invariantKind: "gap",
      statement: "Running the transpiler waits on the Lua machine reaching akasha.",
    },
  ],
} as const satisfies WorkspacePackage
