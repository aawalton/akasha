import type { Module } from "@akasha/code-system/module"

export const wanSize = {
  id: "01a067f1-4e2c-7000-b3a1-6c2f9d4a8e10",
  pageTypeSlug: "module",
  slug: "wan-size",
  definition: "the width and height a render is asked for",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A size is two whole positive numbers parted by an x.",
    },
    {
      invariantKind: "departure",
      statement: "A size that does not read answers as nothing rather than raising.",
    },
  ],
} as const satisfies Module
