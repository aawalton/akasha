import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const wanSize = {
  id: "01a067f1-4e2c-7000-b3a1-6c2f9d4a8e10",
  type: "page-type/module",
  slug: "wan-size",
  definition: "the width and height asked of a render",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A size is two whole positive numbers parted by an x.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A size that does not read answers as nothing rather than raising.",
    },
  ],
} as const satisfies Module
