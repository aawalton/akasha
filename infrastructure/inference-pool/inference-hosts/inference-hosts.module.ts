import type { Module } from "@akasha/code-system/module"

export const inferenceHosts = {
  id: "01a0685d-4b35-7002-9349-0c26e47c4b8f",
  pageTypeSlug: "module",
  slug: "inference-hosts",
  definition: "the machines inference services stand on and how to reach each one",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A host asked for by a name nothing declares raises rather than answering.",
    },
  ],
} as const satisfies Module
