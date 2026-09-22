import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const secretChecksum = {
  id: "01a06735-dd9c-700b-a47e-9fe485b96dbb",
  type: "page-type/module",
  slug: "secret-checksum",
  definition: "the hash a secret's contents are summed to",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A secret akasha places is summed from its pages, and one a controller mints from the cluster.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A dot in a key the cluster is read for names the key rather than a field under a field.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call naming no key sums every key the secret pages place into that secret.",
    },
  ],
} as const satisfies Module
