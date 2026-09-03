import type { Module } from "@akasha/code-system/module"

export const workloadCensus = {
  id: "01a06977-65e4-7fe1-86eb-b5c80ca5d400",
  pageTypeSlug: "module",
  slug: "workload-census",
  definition: "every workload the cluster runs that no cluster service page claims",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "What the cluster runs is asked of the cluster rather than read from a page.",
    },
    {
      invariantKind: "departure",
      statement: "A kind kubectl will not list stops the census rather than shortening it.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here changes what the cluster runs.",
    },
  ],
} as const satisfies Module
