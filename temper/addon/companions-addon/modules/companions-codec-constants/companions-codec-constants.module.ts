import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionsCodecConstants = {
  id: "01a0611d-84d0-7633-b29f-14f7be7fd63b",
  type: "page-type/module",
  slug: "companions-codec-constants",
  definition: "the bit widths the companion build codec reads a build hash by",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A width here is the width the codec on the other side reads.",
    },
  ],
} as const satisfies Module
