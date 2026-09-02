import type { Module } from "@akasha/code-system/module"

export const libSetsDropTipDropmechanicTooltipsIndex = {
  id: "01a061d6-3e43-7f81-96b3-af30733ec6c4",
  pageTypeSlug: "module",
  slug: "lib-sets-drop-tip-dropmechanic-tooltips-index",
  definition: "one import that runs the drop mechanic tooltip install",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This file holds a single import and declares nothing.",
    },
  ],
} as const satisfies Module
