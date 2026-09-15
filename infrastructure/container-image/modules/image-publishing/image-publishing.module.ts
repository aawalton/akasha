import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const imagePublishing = {
  id: "01a08da4-6ca4-798c-84fd-af4b515703c5",
  type: "module",
  slug: "image-publishing",
  definition: "a built image put in the cluster's registry by the cluster's builder",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An image the registry already holds under its tag is built again by nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A build is refused where an input differs from the commit HEAD is at.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The Dockerfile is written outside the checkout, because a build made it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The builder runs in the cluster and the workstation only asks it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Each thing a publish wrote outside the checkout is named as soon as it is written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An image already in the registry is named where a later image throws.",
    },
  ],
} as const satisfies Module
