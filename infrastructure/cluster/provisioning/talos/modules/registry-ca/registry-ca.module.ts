import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const registryCa = {
  id: "01a06813-7b0f-77e9-b7be-7c10f95506c1",
  type: "page-type/module",
  slug: "registry-ca",
  definition: "the registry CA certificate's path and the bytes at it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Where the cluster's authority sits is asked of the index rather than spelled.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That authority is reached by the id its page carries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The certificate's file name is read from the property holding that certificate.",
    },
  ],
} as const satisfies Module
