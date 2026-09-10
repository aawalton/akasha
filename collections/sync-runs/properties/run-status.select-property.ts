import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export const runStatus = {
  id: "01a06861-f664-743c-bf6b-31f5403c30b7",
  pageTypeSlug: "select-property",
  type: "select-property",
  slug: "run-status",
  propertySlug: "run-status",
  definition: "how a pull ended",
  values: ["running", "success", "failed"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A pull left `running` by a process that died is settled as `failed`.",
    },
  ],
} as const satisfies SelectProperty

export type RunStatus = (typeof runStatus.values)[number]
