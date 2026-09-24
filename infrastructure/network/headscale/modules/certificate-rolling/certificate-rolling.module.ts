import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const certificateRolling = {
  id: "01a0d5aa-d50a-72b9-ae1f-efccf11ac492",
  type: "page-type/module",
  slug: "certificate-rolling",
  definition: "the job rolling a workload whose certificate was renewed since the workload started",
  code: "ts",
  allowsTmpPaths: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The job stamps the certificate's checksum on the workload, so an apply after it rolls nothing again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The job reaches only the one secret and the one workload in their own namespace.",
    },
  ],
} as const satisfies Module
