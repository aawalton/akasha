import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const orphanResourceListing = {
  id: "01a0686c-fd2c-7004-911e-afd0ee7326f0",
  type: "module",
  slug: "orphan-resource-listing",
  definition: "the deployments, services and stateful sets a namespace is running",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A read asked for after the sweep's whole deadline has passed is refused unasked.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every read shares one deadline.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A slow cluster ends the sweep rather than the sweep running on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A resource names its manager or states nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A resource stating nothing is read as managed by nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A cluster answering anything but success ends the sweep rather than reading as an empty namespace.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "The credentials are read here rather than at cluster-api-reaching.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Cluster-api-reaching has the same three environment variables.",
    },
  ],
} as const satisfies Module
