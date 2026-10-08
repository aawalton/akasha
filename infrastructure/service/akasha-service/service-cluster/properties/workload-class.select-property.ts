import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const workloadClass = {
  id: "01a0d5db-7609-762b-bbb3-3c592212a5db",
  type: "page-type/select-property",
  slug: "workload-class",
  propertySlug: "workload-class",
  definition: "the class of node a workload's pods are placed on",
  values: ["control", "database", "build", "serve", "workers", "ci", "eso-rig"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A pod is placed only on a node carrying the class this names.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-24T23:58:44.745Z",
  updatedAt: "2026-09-24T23:59:07.000Z",
} as const satisfies SelectProperty
