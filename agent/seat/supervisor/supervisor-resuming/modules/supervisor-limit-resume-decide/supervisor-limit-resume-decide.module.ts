import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorLimitResumeDecide = {
  id: "01a0686d-9d5e-7003-85f7-c26e7d26b125",
  type: "page-type/module",
  slug: "supervisor-limit-resume-decide",
  definition: "whether a seat whose turn died on a usage limit is nudged back into its work now",
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
} as const satisfies Module
