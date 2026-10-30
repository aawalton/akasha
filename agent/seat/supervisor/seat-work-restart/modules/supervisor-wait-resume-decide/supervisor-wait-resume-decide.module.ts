import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorWaitResumeDecide = {
  id: "01a0686d-9d5e-7004-9169-e4d983fea9db",
  type: "page-type/module",
  slug: "supervisor-wait-resume-decide",
  definition: "when a supervisor sends a notice to a seat that waits after errors",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn that did not end in a death decides nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat that died and was never nudged is nudged without waiting.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The wait doubles with each death past the second and stops at the maximum wait.",
    },
  ],
  createdAt: "2026-09-03T18:00:09.310Z",
  updatedAt: "2026-10-30T14:48:31.790Z",
} as const satisfies Module
