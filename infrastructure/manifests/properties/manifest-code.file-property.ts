import type { FileProperty } from "@akasha/pages-system/file-property"

export type ManifestCode = "ts"

export const manifestCode = {
  id: "01a06da1-b338-79a7-bbb9-a0ac5a5a7170",
  pageTypeSlug: "file-property",
  slug: "manifest-code",
  propertySlug: "code",
  definition: "the code a manifest is",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Manifest code is written in TypeScript.",
    },
    {
      invariantKind: "departure",
      statement: "A path this code spells is a path inside a container.",
    },
    {
      invariantKind: "departure",
      statement: "This code builds resources rather than applying them.",
    },
  ],
} as const satisfies FileProperty
