import type { FolderShape } from "../folder-shape.page-type.ts"

export const aDomainWithItsParts = {
  id: "01a0626e-045b-72ad-a6c9-9d13fba7fbda",
  pageTypeSlug: "folder-shape",
  type: "folder-shape",
  slug: "a-domain-with-its-parts",
  definition: "the shape of a folder with one domain, its modules and the parts it declares",
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
      statement: "That page is a page of a type at or beneath domain.",
    },
    {
      invariantKind: "departure",
      statement: "The folder takes the name that page gives its folder.",
    },
    {
      invariantKind: "departure",
      statement: "Every other file in the folder is a part the page states.",
    },
    {
      invariantKind: "departure",
      statement: "A subfolder named `modules` is a part of that page.",
    },
    {
      invariantKind: "departure",
      statement: "A subfolder named `scripts` is a part of that page.",
    },
    {
      invariantKind: "departure",
      statement: "A subfolder with a page the domain declares a part is a part too.",
    },

    {
      invariantKind: "departure",
      statement: "A subfolder with no page the domain declares is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A subfolder with a second page that is no workspace package or domain of the first is no part.",
    },
    {
      invariantKind: "departure",
      statement:
        "A subfolder a file this page's own property names sits under is a part of that page.",
    },
  ],
} as const satisfies FolderShape
