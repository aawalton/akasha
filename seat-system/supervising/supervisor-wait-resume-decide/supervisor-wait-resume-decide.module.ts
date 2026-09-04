import type { Module } from "@akasha/code-system/module"

export const supervisorWaitResumeDecide = {
  id: "01a0686d-9d5e-7004-9169-e4d983fea9db",
  pageTypeSlug: "module",
  slug: "supervisor-wait-resume-decide",
  definition: "whether a seat whose turn keeps dying is nudged now, and how long the next wait is",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A turn that did not end in a death decides nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A seat that died and was never nudged is nudged without waiting.",
    },
    {
      invariantKind: "departure",
      statement: "The wait doubles with each death past the second and stops at the maximum wait.",
    },
  ],
} as const satisfies Module
