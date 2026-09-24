import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const probePath = {
  id: "01a0d5db-7609-7888-b66e-21339db7508c",
  type: "page-type/text-property",
  slug: "probe-path",
  propertySlug: "probe-path",
  definition: "the path a workload's container answers whether it is alive and ready at",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One path answers both whether the container is alive and whether it is ready.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The path is asked over HTTP on the workload's container port.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
