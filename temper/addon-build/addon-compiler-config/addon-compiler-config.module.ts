import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const addonCompilerConfig = {
  id: "01a060ed-2e23-72af-af9e-fc35df5b70c3",
  pageTypeSlug: "module",
  type: "module",
  slug: "addon-compiler-config",
  definition: "the transpiler settings a build reads for an addon whose folder has no tsconfig",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An addon folder with a tsconfig is built from the tsconfig held there.",
    },
    {
      invariantKind: "departure",
      statement:
        "An addon folder with no tsconfig is built from settings written into the build output.",
    },
    {
      invariantKind: "departure",
      statement: "The written settings name the module the addon page says the bundle starts from.",
    },
    {
      invariantKind: "departure",
      statement: "The written settings reach every module code file the addon folder has.",
    },
    {
      invariantKind: "departure",
      statement: "The written settings reach every declaration the addon folder has.",
    },
    {
      invariantKind: "departure",
      statement:
        "The written settings reach every declaration an addon this addon depends on holds.",
    },
    {
      invariantKind: "departure",
      statement: "The addons an addon depends on are the ones the game's own manifest names.",
    },
    {
      invariantKind: "departure",
      statement: "An addon depended on is found by the name that addon's own manifest states.",
    },
    {
      invariantKind: "departure",
      statement:
        "The addons an addon depends on are walked through to the end rather than a single level deep.",
    },
    {
      invariantKind: "departure",
      statement: "A dependency no addon in the checkout carries is left out of the compile.",
    },
    {
      invariantKind: "departure",
      statement:
        "The written settings reach every declaration a temper folder that is no addon holds.",
    },
    {
      invariantKind: "departure",
      statement: "A folder holding an addon page keeps its declarations to that addon.",
    },
    {
      invariantKind: "departure",
      statement: "The game's own names are described by the akasha folders of declarations.",
    },
    {
      invariantKind: "departure",
      statement: "The written settings say TypeScript emits nothing and the Lua is written anyway.",
    },
    {
      invariantKind: "departure",
      statement: "A reach spelled from the repository root down carries the file's own extension.",
    },
    {
      invariantKind: "absence",
      statement: "No setting here rewrites an extension.",
    },
    {
      invariantKind: "departure",
      statement: "An addon page naming no bundle entry answers that nothing can be built.",
    },
    {
      invariantKind: "constraint",
      statement: "An addon page naming a bundle entry the folder does not hold refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "A slug naming a page drops the page type spelled ahead of the slug.",
    },
    {
      invariantKind: "departure",
      statement: "Every module name in the bundle is worked out from the repository root down.",
    },
  ],
} as const satisfies Module
