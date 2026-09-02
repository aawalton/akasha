import type { Module } from "@akasha/code-system/module"

export const addonTstlConfig = {
  id: "01a060ed-2e23-72af-af9e-fc35df5b70c3",
  pageTypeSlug: "module",
  slug: "addon-tstl-config",
  definition: "the transpiler settings a build reads for an addon whose folder holds no tsconfig",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An addon folder holding a tsconfig is built from the tsconfig held there.",
    },
    {
      invariantKind: "departure",
      statement:
        "An addon folder holding no tsconfig is built from settings written into the build output.",
    },
    {
      invariantKind: "departure",
      statement: "The written settings name the module the addon page says the bundle starts from.",
    },
    {
      invariantKind: "departure",
      statement: "The written settings reach every module code file the addon folder holds.",
    },
    {
      invariantKind: "departure",
      statement: "An addon page naming no bundle entry answers that nothing can be built.",
    },
    {
      invariantKind: "departure",
      statement: "Every module name in the bundle is worked out from the repository root down.",
    },
  ],
} as const satisfies Module
