import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inferenceHosts = {
  id: "01a0685d-4b35-7002-9349-0c26e47c4b8f",
  type: "page-type/module",
  slug: "inference-hosts",
  definition: "the machines inference services are on and how to reach each one",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A host is read from its page rather than from a list in code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A host page stating no conda script is no inference host.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A host stating a conda script and not how to reach it raises.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A host asked for by a name nothing declares raises rather than answering.",
    },
  ],
} as const satisfies Module
