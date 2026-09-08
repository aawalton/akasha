import type { Module } from "@akasha/code/module"

export const preparationProvisioning = {
  id: "01a0815d-fec1-74ae-87c1-4b280eed2df1",
  pageTypeSlug: "module",
  slug: "preparation-provisioning",
  definition: "the steps laying a pipeline's toolchain onto the store its steps share",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A toolchain already laid down at the version wanted is left as it is.",
    },
    {
      invariantKind: "departure",
      statement:
        "A version is written last, so another pod reads it only once the tools are there.",
    },
    {
      invariantKind: "departure",
      statement: "A file is written beside its name and moved onto it, never written in place.",
    },
    {
      invariantKind: "departure",
      statement: "The shell a later step runs is laid down before the toolchain needing it.",
    },
  ],
} as const satisfies Module
