import type { BooleanProperty } from "../../boolean-properties/boolean-property.page-type.types.ts"

export type FrameEdgeToEdge = boolean

export const frameEdgeToEdge = {
  id: "01a0683a-620a-782d-98a8-24d1f80e3ef8",
  pageTypeSlug: "boolean-property",
  type: "boolean-property",
  slug: "frame-edge-to-edge",
  propertySlug: "edge-to-edge",
  definition: "whether a page's body runs to the edges of the screen",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A body running to the edges leaves no room for a frame beside that body.",
    },
  ],
} as const satisfies BooleanProperty
