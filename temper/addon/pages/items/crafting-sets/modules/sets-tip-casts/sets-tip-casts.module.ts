import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsTipCasts = {
  id: "01a06231-8f1e-7680-a91c-96672a2939c0",
  type: "page-type/module",
  slug: "sets-tip-casts",
  definition: "the narrowings the tooltip code puts on untyped controls and tables",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A tooltip control is probed for its methods rather than typed.",
    },
  ],
  createdAt: "2026-09-02T12:56:50.206Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
