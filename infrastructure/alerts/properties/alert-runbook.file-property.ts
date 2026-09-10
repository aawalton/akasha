import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export type AlertRunbook = "txt"

export const alertRunbook = {
  id: "01a06755-0778-7275-8076-4aec6002693b",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "alert-runbook",
  propertySlug: "runbook",
  definition: "what to check once an alert is raised",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A runbook is prose rather than a rule anything runs.",
    },
    {
      invariantKind: "departure",
      statement: "A runbook outlives the deployment gap the alert that runbook belongs to sits in.",
    },
  ],
} as const satisfies FileProperty
