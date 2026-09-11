import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const serviceClusterConfig = {
  id: "01a07c92-3daf-72f1-8010-749415723ba4",
  type: "file-property",
  slug: "service-cluster-config",
  propertySlug: "config",
  definition: "the settings a workload's own program reads",
  extensions: ["yaml"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The settings are the program's own rather than the cluster's.",
    },
    {
      invariantKind: "departure",
      statement:
        "A cluster service the cluster configures through its manifest alone states no config.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
