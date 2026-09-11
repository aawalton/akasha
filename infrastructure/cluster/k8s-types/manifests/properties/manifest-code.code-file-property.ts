import type { CodeFileProperty } from "akasha/pages/code-file-properties/code-file-property.page-type.types.ts"

export const manifestCode = {
  id: "01a06da1-b338-79a7-bbb9-a0ac5a5a7170",
  type: "code-file-property",
  slug: "manifest-code",
  propertySlug: "code",
  definition: "the code a manifest is",
  extensions: ["ts"],
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
      statement: "This code builds resources rather than applying those resources.",
    },
  ],
  types: "ts",
} as const satisfies CodeFileProperty
