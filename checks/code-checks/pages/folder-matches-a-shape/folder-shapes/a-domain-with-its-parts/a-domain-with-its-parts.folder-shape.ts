import type { FolderShape } from "../folder-shape.page-type.ts"

export const aDomainWithItsParts = {
  id: "01a0626e-045b-72ad-a6c9-9d13fba7fbda",
  pageTypeSlug: "folder-shape",
  slug: "a-domain-with-its-parts",
  definition: "the shape of a folder holding one domain, its modules and the parts it declares",
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
      statement: "That page is a page of a type at or beneath domain.",
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
      statement: "A subfolder named `modules` is a part of that page.",
    },
    {
      invariantKind: "departure",
      statement: "A subfolder named `scripts` is a part of that page.",
    },
    {
      invariantKind: "departure",
      statement: "A subfolder holding a page the domain declares a part is a part too.",
    },
    {
      invariantKind: "departure",
      statement: "A page is declared a part by its page type and slug together.",
    },
    {
      invariantKind: "departure",
      statement: "A subfolder holding no page the domain declares is refused.",
    },
    {
      invariantKind: "absence",
      statement: "What a part holds is judged where that part is judged.",
    },
  ],
} as const satisfies FolderShape
