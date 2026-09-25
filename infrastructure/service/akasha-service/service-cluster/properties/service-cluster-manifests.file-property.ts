import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const serviceClusterManifests = {
  id: "01a0d5de-00bb-7b79-b406-ab80aed2c8f4",
  type: "page-type/file-property",
  slug: "service-cluster-manifests",
  propertySlug: "manifests",
  definition: "the resources a cluster service is applied as, written from its pages",
  extensions: ["yaml"],
  generated: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The `manifests-writing` change generator writes this file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The file is committed, so what a deploy applies is read in the change landing it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cluster service stating this names no manifest page.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
