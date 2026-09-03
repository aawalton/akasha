import type { Module } from "@akasha/code-system/module"

export const orphanResourceListing = {
  id: "01a0686c-fd2c-7004-911e-afd0ee7326f0",
  pageTypeSlug: "module",
  slug: "orphan-resource-listing",
  definition: "the deployments, services and stateful sets a namespace is running",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A read asked for after the sweep's whole deadline has passed is refused unasked.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every read shares one deadline, so a slow cluster ends the sweep rather than the sweep running on.",
    },
    {
      invariantKind: "departure",
      statement:
        "A resource states what manages it, or states nothing and is read as managed by nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A cluster that answers anything but success ends the sweep rather than reading as an empty namespace.",
    },
    {
      invariantKind: "gap",
      statement:
        "The credentials are read here rather than at cluster-api-reaching, which holds the same three environment variables: that module sits in service-system, service-system already depends on this package, and it fixes one timeout where the sweep needs a shared deadline.",
    },
  ],
} as const satisfies Module
