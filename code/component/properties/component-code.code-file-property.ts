import type { CodeFileProperty } from "akasha/page/code-file-property/code-file-property.page-type.types.ts"

export const componentCode = {
  id: "01a071cb-913e-7640-a55f-ecae5999419f",
  type: "page-type/code-file-property",
  slug: "component-code",
  propertySlug: "code",
  definition: "the code a component is",
  extensions: ["tsx"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This code is written in TSX.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-05T13:39:21.534Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies CodeFileProperty
