import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const workloadWriting = {
  id: "01a0d96d-1ec7-7e4c-a8c6-48a00560c8be",
  type: "page-type/module",
  slug: "workload-writing",
  definition: "the manifests a cluster service is applied as, composed from what its pages state",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "What is composed is handed in whole, already read from the pages.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a page.",
    },
  ],
} as const satisfies Module
