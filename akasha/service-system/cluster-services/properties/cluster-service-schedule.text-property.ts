import type { TextProperty } from "@akasha/pages-system/text-property"

export type Schedule = string

export const clusterServiceSchedule = {
  id: "01a06587-c73c-74e9-8542-4de33139539f",
  pageTypeSlug: "text-property",
  slug: "cluster-service-schedule",
  propertySlug: "schedule",
  definition: "the times the cluster starts a workload",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The times are written as the five cron fields.",
    },
    {
      invariantKind: "departure",
      statement: "A workload the cluster starts on no schedule states none.",
    },
  ],
} as const satisfies TextProperty
