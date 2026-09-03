import type { Module } from "@akasha/code-system/module"

export const ciLaunchRefusal = {
  id: "01a06861-24c9-700f-b0fa-0a1ef0667fbc",
  pageTypeSlug: "module",
  slug: "ci-launch-refusal",
  definition: "recording why the cluster refused a step's launch and clearing the husk",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only a launch the cluster refused with an `OutOf` reason is recorded as refused.",
    },
    {
      invariantKind: "departure",
      statement: "A husk is deleted only once the refusal has been recorded on the step.",
    },
  ],
} as const satisfies Module
