import type { TextProperty } from "@akasha/pages-system/text-property"

export type ManifestCode = string

export const clusterServiceManifestCode = {
  id: "01a05b26-f8b6-7d7a-b580-8d91b5a2207a",
  pageTypeSlug: "text-property",
  slug: "cluster-service-manifest-code",
  propertySlug: "manifest-code",
  definition: "the file emitting a cluster service's manifests",
  max: 200,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The file is named from the repository root.",
    },
  ],
} as const satisfies TextProperty
