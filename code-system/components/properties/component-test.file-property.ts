import type { FileProperty } from "@akasha/pages-system/file-property"

export type ComponentTest = "tsx"

export const componentTest = {
  id: "01a071cb-913e-712f-ae34-97ed4fde93c2",
  pageTypeSlug: "file-property",
  slug: "component-test",
  propertySlug: "test",
  definition: "what proves a component's code",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A test proving code written in TSX is written in TSX too.",
    },
  ],
} as const satisfies FileProperty
