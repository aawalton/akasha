import type { FolderShape } from "../folder-shape.page-type.ts"

export const propertyPagesOnly = {
  id: "01a04e70-3e92-796f-b5e9-ce47ee249c71",
  pageTypeSlug: "folder-shape",
  slug: "property-pages-only",
  definition: "the shape of a folder holding property pages and nothing else",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The folder is named `properties`.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page is a property by the page type that page states extending `page-property` however far above that page type `page-property` stands rather than by what the page's file is named.",
    },
    {
      invariantKind: "departure",
      statement:
        "A property page's page type says what kind of value that property page carries rather than which page owns that property page.",
    },
    {
      invariantKind: "departure",
      statement:
        "The pages here are of several types and that is the shape rather than a fault in it.",
    },
    {
      invariantKind: "absence",
      statement: "Which page the pages here are properties of is not judged here.",
    },
    {
      invariantKind: "absence",
      statement: "The folder above says which page these are properties of.",
    },
    {
      invariantKind: "departure",
      statement: "A folder holding no file at all takes this shape rather than failing it.",
    },
  ],
} as const satisfies FolderShape
