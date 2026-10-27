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
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An image a page names with no tag is written with the placeholder a deploy fills.",
    },
  ],
  createdAt: "2026-09-25T16:36:42.311Z",
  updatedAt: "2026-10-27T07:38:37.802Z",
} as const satisfies Module
