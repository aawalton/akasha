import type { CodeFileProperty } from "akasha/page/code-file-property/code-file-property.page-type.types.ts"

export const manifestCode = {
  id: "01a06da1-b338-79a7-bbb9-a0ac5a5a7170",
  type: "page-type/code-file-property",
  slug: "manifest-code",
  propertySlug: "code",
  definition: "the code a manifest is",
  extensions: ["ts"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Manifest code is written in TypeScript.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path this code spells is a path inside a container.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This code builds resources rather than applying those resources.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-04T18:15:08.856Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies CodeFileProperty
