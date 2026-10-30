import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorLimitResumeDecide = {
  id: "01a0686d-9d5e-7003-85f7-c26e7d26b125",
  type: "page-type/module",
  slug: "supervisor-limit-resume-decide",
  definition: "whether a supervisor sends a notice to a seat that waits on a limit",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn that did not die on a usage limit decides nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat nudged inside the floor window is not nudged again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An eligible account pool nudges only once the pool has read eligible for the whole eligibility hold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An exhausted pool nudges once the earliest account reset has arrived.",
    },
  ],
  createdAt: "2026-09-03T18:00:09.310Z",
  updatedAt: "2026-10-30T14:42:52.326Z",
} as const satisfies Module
