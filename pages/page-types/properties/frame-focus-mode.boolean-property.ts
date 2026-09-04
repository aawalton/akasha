import type { BooleanProperty } from "../../boolean-properties/boolean-property.page-type.ts"

export type FrameFocusMode = boolean

export const frameFocusMode = {
  id: "01a0683a-620a-7c50-9431-5e9e2efdc3e9",
  pageTypeSlug: "boolean-property",
  slug: "frame-focus-mode",
  propertySlug: "focus-mode",
  definition: "whether all but a page's body is put away while the page is read",
  invariants: [
    {
      invariantKind: "departure",
      statement: "What is put away comes back the moment the reader asks for it.",
    },
  ],
} as const satisfies BooleanProperty
