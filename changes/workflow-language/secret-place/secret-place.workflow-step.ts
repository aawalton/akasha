import type { WorkflowStep } from "../workflow-steps/workflow-step.page-type.ts"

export const secretPlace = {
  id: "01a0766a-aa3b-7108-8175-48f3340e7e25",
  pageTypeSlug: "workflow-step",
  slug: "secret-place",
  definition: "a step saying a resource's Secret from its pages and applying it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A step names the resource it places rather than a file to decrypt.",
    },
    {
      invariantKind: "departure",
      statement: "What a resource holds is read from the pages placing a value in it.",
    },
    {
      invariantKind: "departure",
      statement: "The yaml is judged by a dry run before the same yaml is applied.",
    },
    {
      invariantKind: "departure",
      statement: "This step replaces the one decrypting a whole Secret manifest.",
    },
  ],
} as const satisfies WorkflowStep
