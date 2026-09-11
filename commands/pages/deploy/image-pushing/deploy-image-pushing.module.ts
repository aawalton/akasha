import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const deployImagePushing = {
  id: "01a08df4-ab5c-7ba2-beb9-acbb8bf0d944",
  type: "module",
  slug: "deploy-image-pushing",
  definition: "a container recipe built and put in the registry under the hash of its inputs",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A recipe the registry already holds under its tag is built again by nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A recipe naming no repository is refused rather than built.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing is applied to the cluster here.",
    },
    {
      invariantKind: "departure",
      statement: "The recipe and the context are read from the tree pinned at the commit.",
    },
  ],
} as const satisfies Module
