import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const image = {
  id: "01a05b26-f8b6-73e6-aedb-75b88fac6b4b",
  type: "page-type/text-property",
  slug: "image",
  propertySlug: "image",
  definition: "the container image a workload's pods run",
  maxLength: 253,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The image is named as the cluster's own registry hands the image out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A workload running more than one container states the image of the container the workload is for.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-01T04:07:55.830Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies TextProperty
