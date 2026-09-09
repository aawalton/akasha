import type { Domain } from "../../domains/domain.page-type.ts"

export const temperAddonBuild = {
  id: "01a06038-2cc1-7116-80a1-184fa5a8f3f6",
  pageTypeSlug: "domain",
  slug: "temper-addon-build",
  definition: "what building temper's ESO addons out of TypeScript needs to know",
  parts: [
    "module/lua-build-command",
    "module/addon-load-order",
    "module/addon-metadata-copy",
    "module/addon-compiler-config",
    "module/addon-metadata-files",
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
      statement: "An addon folder with no tsconfig is built from settings a build writes.",
    },
    {
      invariantKind: "departure",
      statement:
        "An addon whose source is in akasha is transpiled from where akasha has the source.",
    },
    {
      invariantKind: "gap",
      statement: "The transpiler is a checkout beside akasha rather than a package inside akasha.",
    },
    {
      invariantKind: "constraint",
      statement: "A build runs on the workstation with the transpiler rather than in the cluster.",
    },
    {
      invariantKind: "gap",
      statement:
        "Every Temper addon is exercised against a real ESO client with nobody at a keyboard.",
    },
  ],
} as const satisfies Domain
