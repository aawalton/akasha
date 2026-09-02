import type { Module } from "@akasha/code-system/module"

export const addonDataTarget = {
  id: "01a062a9-3f10-7de2-9a05-71c8bb3e4f27",
  pageTypeSlug: "module",
  slug: "addon-data-target",
  definition: "the module a rendered table lands as, and how many parts it lands as",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A part slug is written with no fewer than two digits.",
    },
    {
      invariantKind: "departure",
      statement: "A part slug is written with as many digits as the highest part index needs.",
    },
    {
      invariantKind: "departure",
      statement: "How wide a part slug is written is worked out from how many parts there are.",
    },
    {
      invariantKind: "absence",
      statement: "No row states how wide its part slugs are written.",
    },
  ],
} as const satisfies Module
