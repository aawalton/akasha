import type { SelectProperty } from "@akasha/pages-system/select-property"

export const workflowRunKind = {
  id: "01a06950-236c-72c4-81ef-bad6f58c2562",
  pageTypeSlug: "select-property",
  slug: "workflow-run-kind",
  propertySlug: "kind",
  definition: "which group of work a workflow belongs to",
  values: ["foundation", "preparation", "checks", "apps", "cleanup"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The groups run in the order they are named here.",
    },
    {
      invariantKind: "gap",
      statement: "This and `workflow-kind` name one idea twice, and differ by the `cleanup` group.",
    },
  ],
} as const satisfies SelectProperty

export type WorkflowRunKind = (typeof workflowRunKind.values)[number]
