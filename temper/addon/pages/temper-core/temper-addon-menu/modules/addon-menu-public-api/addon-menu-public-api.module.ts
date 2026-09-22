import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonMenuPublicApi = {
  id: "01a06100-0000-7000-8000-000000000007",
  type: "page-type/module",
  slug: "addon-menu-public-api",
  definition: "the two global names assigned once every module here has loaded",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every widget module is imported for the side effect of registering its factory.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The two globals are assigned after all imports have run.",
    },
  ],
} as const satisfies Module
