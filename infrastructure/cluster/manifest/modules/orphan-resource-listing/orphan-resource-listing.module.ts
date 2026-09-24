import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const orphanResourceListing = {
  id: "01a0686c-fd2c-7004-911e-afd0ee7326f0",
  type: "page-type/module",
  slug: "orphan-resource-listing",
  definition: "the deployments, services and stateful sets a namespace is running",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A read asked for after the sweep's whole deadline has passed is refused unasked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every read shares one deadline.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slow cluster ends the sweep rather than the sweep running on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A resource names its manager or states nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A resource stating nothing is read as managed by nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A cluster answering anything but success ends the sweep rather than reading as an empty namespace.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The credentials are read at cluster-api-reaching.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sweep missing a credential ends as a sweep that could not run.",
    },
  ],
} as const satisfies Module
