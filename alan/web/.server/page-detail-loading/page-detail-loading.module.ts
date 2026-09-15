import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageDetailLoading = {
  id: "01a0655e-d39b-7b16-9974-8d43261a1726",
  type: "module",
  slug: "page-detail-loading",
  definition: "what a page's detail route loads before it is drawn",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A key is asked of a page type only where that page type declares the key.",
    },
  ],
} as const satisfies Module
