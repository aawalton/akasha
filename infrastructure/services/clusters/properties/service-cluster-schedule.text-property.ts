import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const serviceClusterSchedule = {
  id: "01a06587-c73c-74e9-8542-4de33139539f",
  type: "text-property",
  slug: "service-cluster-schedule",
  propertySlug: "schedule",
  definition: "the times the cluster starts a workload",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The times are written as the five cron fields.",
    },
    {
      invariantKind: "departure",
      statement: "A workload the cluster starts by hand carries no schedule.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
