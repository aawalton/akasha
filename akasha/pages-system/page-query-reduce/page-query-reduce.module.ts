import type { Module } from "@akasha/code-system/module"

export const pageQueryReduce = {
  id: "01a06876-e5ea-7002-83a9-4885bf20bd04",
  pageTypeSlug: "module",
  slug: "page-query-reduce",
  definition: "the one number a page query's rows add up to, and why they add up to none",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A query naming no function and no target reduces to nothing over nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A property declared as anything but a number is reduced over no row.",
    },
    {
      invariantKind: "departure",
      statement: "A row whose value is no finite number is passed over rather than counted as nil.",
    },
    {
      invariantKind: "departure",
      statement: "A mean is the sum over the count of the rows that carried a number.",
    },
    {
      invariantKind: "departure",
      statement: "Why a reduction found nothing is said apart from the reduction itself.",
    },
  ],
} as const satisfies Module
