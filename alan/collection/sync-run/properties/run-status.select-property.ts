import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const runStatus = {
  id: "01a06861-f664-743c-bf6b-31f5403c30b7",
  type: "page-type/select-property",
  slug: "run-status",
  propertySlug: "run-status",
  definition: "how a run ends",
  values: ["running", "success", "failed"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A pull left `running` by a process that died is settled as `failed`.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T17:47:25.668Z",
  updatedAt: "2026-10-30T15:14:37.491Z",
} as const satisfies SelectProperty
