import type { SelectProperty } from "@akasha/pages-system/select-property"

export const pipelineStatus = {
  id: "01a06950-236c-7d9d-b915-898e19853d9e",
  pageTypeSlug: "select-property",
  slug: "pipeline-status",
  propertySlug: "status",
  definition: "where a pipeline is between being minted and reaching its verdict",
  values: [
    "pending",
    "dispatching",
    "running",
    "passed",
    "failed",
    "answered-elsewhere",
    "overtaken",
  ],
} as const satisfies SelectProperty

export type PipelineStatus = (typeof pipelineStatus.values)[number]
