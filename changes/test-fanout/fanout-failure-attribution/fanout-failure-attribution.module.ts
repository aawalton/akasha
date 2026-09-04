import type { Module } from "@akasha/code-system/module"

export const fanoutFailureAttribution = {
  id: "01a0685e-023f-7018-a249-6bd19da4007f",
  pageTypeSlug: "module",
  slug: "fanout-failure-attribution",
  definition: "the one line saying which workspace, file and test a fan-out failure is charged to",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A run that executed no test is reported as a refusal before any fail line is read.",
    },
    {
      invariantKind: "departure",
      statement:
        "A fail line no workspace can be found for says so and says how to find the owner by hand.",
    },
    {
      invariantKind: "departure",
      statement:
        "A log holding neither a fail signal nor a refusal is said not to explain the exit.",
    },
    {
      invariantKind: "departure",
      statement:
        "A log that cannot be read leaves the failure unattributed rather than ending the run.",
    },
  ],
} as const satisfies Module
