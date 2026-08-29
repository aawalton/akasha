import type { PagePropertyType } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"

export type Needs = "path" | "file"

export const needs = {
  id: "01a04bc4-7e86-7284-851d-f858c3ef2f69",
  pageTypeSlug: "page-property-type",
  slug: "needs",
  definition: "how much of a changed file a check is handed to judge it",
  extendsSlug: null,
  kind: "text",
  max: 10,
  nameFormatSlug: null,
  design: [
    {
      invariantKind: "departure",
      statement:
        "A check needing only the path is not handed the body, so a rename is judged without a read.",
    },
    {
      invariantKind: "departure",
      statement:
        "A check needing only the path is handed a path the change takes away, and told that it is being taken away, so a removal is judged rather than passed over.",
    },
    {
      invariantKind: "departure",
      statement:
        "A check needing the file is passed over where the change takes the path away, because there are no bytes to hand it and it can judge nothing without them.",
    },
    {
      invariantKind: "departure",
      statement:
        "Nothing hands a check the tree; what it must know beyond its file, it asks the index.",
    },
  ],
} as const satisfies PagePropertyType
