import type { SelectProperty } from "@akasha/pages-system/select-property"

export const layout = {
  id: "01a0680d-4d00-7003-9c58-7b4e2a6d4104",
  pageTypeSlug: "select-property",
  slug: "layout",
  propertySlug: "layout",
  definition: "the arrangement a view draws its pages in",
  values: ["cards", "gallery", "list", "notes", "table"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A layout is how the answer is shown rather than part of the question.",
    },
  ],
} as const satisfies SelectProperty

export type Layout = (typeof layout.values)[number]
