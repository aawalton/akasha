import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperAddonBuild = {
  id: "01a06038-2cc1-7116-80a1-184fa5a8f3f6",
  type: "domain",
  slug: "temper-addon-build",
  definition: "what building temper's ESO addons out of TypeScript needs to know",
  outputDirectory: true,
  parts: [
    "module/addon-bundling",
    "module/addon-compiler-config",
    "module/addon-compiling",
    "module/addon-load-order",
    "module/addon-metadata-copy",
    "module/addon-metadata-files",
    "module/addon-placing",
    "module/build-output",
    "module/consolidation-migrations",
    "module/global-name-dependents",
    "module/lua-build-command",
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An addon reaches the game as Lua transpiled from TypeScript.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A global name the game or another addon reads cannot be renamed freely.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An addon folded into another carries the absorbed addon's saved variables over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An addon folder with no tsconfig is built from settings a build writes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An addon whose source is in akasha is transpiled from where akasha has the source.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A build runs on the workstation with the transpiler rather than in the cluster.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A landing runs the addon typecheck.",
    },

    {
      invariantKind: "invariant-kind/gap",
      statement:
        "Every Temper addon is exercised against a real ESO client with nobody at a keyboard.",
    },
  ],
} as const satisfies Domain
