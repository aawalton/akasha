import type { FileProperty } from "@akasha/pages-system/file-property"

export type Styles = "css"

export const styles = {
  id: "01a05b01-48b2-7b95-9b72-f48b799f4e5c",
  pageTypeSlug: "file-property",
  slug: "styles",
  propertySlug: "styles",
  definition: "the rules a browser dresses a thing by",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Rules are written in CSS.",
    },
  ],
} as const satisfies FileProperty
