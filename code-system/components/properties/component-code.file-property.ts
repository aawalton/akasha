import type { FileProperty } from "@akasha/pages-system/file-property"

export type ComponentCode = "tsx"

export const componentCode = {
  id: "01a071cb-913e-7640-a55f-ecae5999419f",
  pageTypeSlug: "file-property",
  slug: "component-code",
  propertySlug: "code",
  definition: "the code a component is",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This code is written in TSX because it draws something for a browser.",
    },
  ],
} as const satisfies FileProperty
