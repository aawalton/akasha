import type { FolderShape } from "../folder-shape.page-type.ts"

export const pageTypeWithItsParts = {
  id: "01a05f26-edf0-768f-823e-e5442db4f971",
  pageTypeSlug: "folder-shape",
  slug: "page-type-with-its-parts",
  definition:
    "the shape of a folder named for a page type's plural slug and holding that page type",
  code: "ts",
  test: "ts",
  enabled: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The folder holds one page and that page is a page type.",
    },
    {
      invariantKind: "departure",
      statement: "The folder is named that page type's plural slug.",
    },
    {
      invariantKind: "departure",
      statement: "A subfolder named `modules` is a part of that page type.",
    },
    {
      invariantKind: "departure",
      statement: "A subfolder named `pages` is a part of that page type.",
    },
    {
      invariantKind: "departure",
      statement: "A subfolder named `properties` is a part of that page type.",
    },
    {
      invariantKind: "departure",
      statement:
        "A subfolder named for the plural slug of the page type inside that subfolder is a part too.",
    },
    {
      invariantKind: "departure",
      statement: "A subfolder holding a domain page is a part too.",
    },
    {
      invariantKind: "absence",
      statement: "A domain states no plural slug.",
    },
    {
      invariantKind: "absence",
      statement: "A domain's folder is judged by no plural slug.",
    },
    {
      invariantKind: "absence",
      statement: "What a part holds is judged where that part is judged.",
    },
    {
      invariantKind: "departure",
      statement: "A folder holding no page type is refused.",
    },
  ],
} as const satisfies FolderShape
