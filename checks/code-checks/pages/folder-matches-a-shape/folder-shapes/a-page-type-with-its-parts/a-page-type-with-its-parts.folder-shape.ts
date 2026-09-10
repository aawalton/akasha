import type { FolderShape } from "../folder-shape.page-type.types.ts"

export const aPageTypeWithItsParts = {
  id: "01a0626e-045c-71cf-8781-17811b8d9f9d",
  pageTypeSlug: "folder-shape",
  type: "folder-shape",
  slug: "a-page-type-with-its-parts",
  definition:
    "the shape of a folder with one page type, its parts and the pages and properties it declares",
  code: "ts",
  test: "ts",
  enabled: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The folder has one page.",
    },
    {
      invariantKind: "departure",
      statement: "That page is a page type.",
    },
    {
      invariantKind: "departure",
      statement: "The folder may have a second page beside that page type.",
    },
    {
      invariantKind: "departure",
      statement: "That second page is a workspace package or a domain of the page type's slug.",
    },
    {
      invariantKind: "departure",
      statement: "Any other second page is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The page type names the folder.",
    },
    {
      invariantKind: "departure",
      statement: "That second page names no folder.",
    },
    {
      invariantKind: "departure",
      statement: "The folder has the name that page calls its folder.",
    },
    {
      invariantKind: "departure",
      statement: "Every other file in the folder is a part the page states.",
    },
    {
      invariantKind: "departure",
      statement: "A file that second page states is a part of the folder too.",
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
      statement: "A subfolder with a page the page type declares a part is a part too.",
    },
    {
      invariantKind: "departure",
      statement: "A subfolder with a page that second page declares a part is a part too.",
    },

    {
      invariantKind: "departure",
      statement: "A subfolder with no page the page type declares is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A subfolder with a second page that is no workspace package or domain of the first is no part.",
    },
    {
      invariantKind: "departure",
      statement: "A subfolder named `workstation-services` is a part of that page.",
    },
    {
      invariantKind: "departure",
      statement:
        "A subfolder a file this page's own property names sits under is a part of that page.",
    },
  ],
} as const satisfies FolderShape
