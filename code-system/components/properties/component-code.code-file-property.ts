import type { CodeFileProperty } from "@akasha/pages/code-file-property"

export type ComponentCode = "tsx"

export const componentCode = {
  id: "01a071cb-913e-7640-a55f-ecae5999419f",
  pageTypeSlug: "code-file-property",
  slug: "component-code",
  propertySlug: "code",
  definition: "the code a component is",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This code is written in TSX.",
    },
  ],
} as const satisfies CodeFileProperty
