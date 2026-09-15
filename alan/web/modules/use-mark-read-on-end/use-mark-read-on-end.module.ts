import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useMarkReadOnEnd = {
  id: "01a0655d-dab9-72ea-9ecc-aad82b9431df",
  type: "page-type/module",
  slug: "use-mark-read-on-end",
  definition: "a chapter marked read once its narration reaches the end",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The native shell marks a chapter read exactly as the browser does.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A completion made with no network is not kept.",
    },
  ],
} as const satisfies Module
