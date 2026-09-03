import type { Module } from "@akasha/code-system/module"

export const ciInfraSignature = {
  id: "01a06861-24c9-7010-9d22-5981ab90ff97",
  pageTypeSlug: "module",
  slug: "ci-infra-signature",
  definition: "the kind of infrastructure fault a failed step's log is charged to",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only a step that has already failed is charged with an infrastructure fault.",
    },
    {
      invariantKind: "departure",
      statement: "A log matching no signature is charged to nothing rather than to a default.",
    },
  ],
} as const satisfies Module
