import type { Module } from "@akasha/code-system/module"

export const healthSamplesBody = {
  id: "01a05b54-a90a-7911-bee0-2578b8352aa6",
  pageTypeSlug: "module",
  slug: "health-samples-body",
  definition: "the body the health samples route takes",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A sample naming a metric this system does not keep is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A sample stating a unit that is not its metric's own is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A sample that ends before that sample starts is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A body carrying no sample is refused.",
    },
    {
      invariantKind: "constraint",
      statement: "One body carries a thousand samples at the most.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a sample down.",
    },
  ],
} as const satisfies Module
