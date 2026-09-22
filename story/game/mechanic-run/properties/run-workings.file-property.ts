import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const runWorkings = {
  id: "01a0c952-501c-7817-a9d1-3c36070b1986",
  type: "page-type/file-property",
  slug: "run-workings",
  propertySlug: "workings",
  definition: "what a mechanic was handed and what that mechanic answered, whole",
  extensions: ["json"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "What a mechanic takes and gives is that mechanic's shape rather than one shape.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This file is what the hash of the next run is taken over.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
