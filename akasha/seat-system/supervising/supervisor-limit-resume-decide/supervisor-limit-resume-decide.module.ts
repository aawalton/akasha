import type { Module } from "@akasha/code-system/module"

export const supervisorLimitResumeDecide = {
  id: "01a0686d-9d5e-7003-85f7-c26e7d26b125",
  pageTypeSlug: "module",
  slug: "supervisor-limit-resume-decide",
  definition: "whether a seat whose turn died on a usage limit is nudged back into its work now",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A turn that did not die on a usage limit decides nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A seat nudged inside the floor window is not nudged again.",
    },
    {
      invariantKind: "departure",
      statement:
        "An eligible account pool nudges only once it has read eligible for the whole eligibility hold.",
    },
    {
      invariantKind: "departure",
      statement: "An exhausted pool nudges once the earliest account reset has arrived.",
    },
  ],
} as const satisfies Module
