import type { FolderShape } from "../folder-shape.page-type.ts"

export const aPageTypeWithItsParts = {
  id: "01a0626e-045c-71cf-8781-17811b8d9f9d",
  pageTypeSlug: "folder-shape",
  slug: "a-page-type-with-its-parts",
  definition:
    "the shape of a folder holding one page type, its parts and the pages and properties it declares",
  code: "ts",
  test: "ts",
  enabled: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The folder holds one page.",
    },
    {
      invariantKind: "departure",
      statement: "That page is a page type.",
    },
    {
      invariantKind: "departure",
      statement: "The folder may hold a workspace package beside that page type.",
    },
    {
      invariantKind: "departure",
      statement: "That workspace package is slugged the page type's plural slug.",
    },
    {
      invariantKind: "departure",
      statement: "A second page that is no such workspace package is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The page type names the folder.",
    },
    {
      invariantKind: "departure",
      statement: "The workspace package beside that page type names no folder.",
    },
    {
      invariantKind: "departure",
      statement: "The folder is named what that page calls its folder.",
    },
    {
      invariantKind: "departure",
      statement: "Every other file in the folder is a part the page states.",
    },
    {
      invariantKind: "departure",
      statement: "A file that workspace package states is a part of the folder too.",
    },
    {
      invariantKind: "departure",
      statement: "A subfolder named `modules` is a part of that page.",
    },
    {
      invariantKind: "departure",
      statement: "A subfolder named `pages` is a part of that page.",
    },
    {
      invariantKind: "departure",
      statement: "A subfolder named `properties` is a part of that page.",
    },
    {
      invariantKind: "departure",
      statement: "A subfolder named `scripts` is a part of that page.",
    },
    {
      invariantKind: "departure",
      statement: "A subfolder holding a page the page type declares a part is a part too.",
    },
    {
      invariantKind: "departure",
      statement: "A subfolder holding a page that workspace package declares a part is a part too.",
    },
    {
      invariantKind: "departure",
      statement: "A page is declared a part by its page type and slug together.",
    },
    {
      invariantKind: "departure",
      statement: "A subfolder holding no page the page type declares is refused.",
    },
    {
      invariantKind: "absence",
      statement: "What a part holds is judged where that part is judged.",
    },
  ],
} as const satisfies FolderShape
