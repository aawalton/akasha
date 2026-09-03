import type { SelectProperty } from "@akasha/pages-system/select-property"

export const workflowKind = {
  id: "01a06810-7000-7000-8c46-5a1d7b9e7101",
  pageTypeSlug: "select-property",
  slug: "workflow-kind",
  propertySlug: "workflow-kind",
  definition: "which stage of a run a workflow belongs to",
  values: ["preparation", "foundation", "apps", "checks"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The stages run in the order they stand here.",
    },
    {
      invariantKind: "departure",
      statement: "A workflow waits on every workflow it names before it starts.",
    },
  ],
} as const satisfies SelectProperty

export type WorkflowKind = (typeof workflowKind.values)[number]
