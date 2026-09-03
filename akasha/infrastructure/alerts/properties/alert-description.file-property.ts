import type { FileProperty } from "@akasha/pages-system/file-property"

export type AlertDescription = "txt"

export const alertDescription = {
  id: "01a06755-0778-7275-8076-4aec6002693b",
  pageTypeSlug: "file-property",
  slug: "alert-description",
  propertySlug: "description",
  definition: "what to check once an alert is raised",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A runbook is prose rather than a rule anything runs.",
    },
    {
      invariantKind: "departure",
      statement: "A runbook outlives the deployment gap the alert it belongs to sits in.",
    },
  ],
} as const satisfies FileProperty
