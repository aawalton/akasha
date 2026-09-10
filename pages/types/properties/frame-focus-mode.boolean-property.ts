import type { BooleanProperty } from "../../boolean-properties/boolean-property.page-type.types.ts"

export type FrameFocusMode = boolean

export const frameFocusMode = {
  id: "01a0683a-620a-7c50-9431-5e9e2efdc3e9",
  pageTypeSlug: "boolean-property",
  type: "boolean-property",
  slug: "frame-focus-mode",
  propertySlug: "focus-mode",
  definition: "whether all but a page's body is put away while the page is read",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The parts put away come back the moment the reader asks for those parts.",
    },
  ],
} as const satisfies BooleanProperty
