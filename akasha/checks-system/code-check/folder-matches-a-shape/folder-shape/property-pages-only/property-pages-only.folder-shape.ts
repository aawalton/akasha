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
      statement:
        "A page is a property by the page type it states extending `page-property` however far above it that stands rather than by what its file is named.",
    },
    {
      invariantKind: "departure",
      statement:
        "A property page's page type says what kind of value it carries rather than which page owns it.",
    },
    {
      invariantKind: "departure",
      statement:
        "The pages here are of several types and that is the shape rather than a fault in it.",
    },
    {
      invariantKind: "absence",
      statement: "Which page these are properties of is not judged here.",
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
