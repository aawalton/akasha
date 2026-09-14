import type { FolderShape } from "akasha/checks/code-checks/pages/folder-matches-a-shape/folder-shapes/folder-shape.page-type.types.ts"

export const aDomainWithItsParts = {
  id: "01a0626e-045b-72ad-a6c9-9d13fba7fbda",
  type: "folder-shape",
  slug: "a-domain-with-its-parts",
  definition: "the shape of a folder with one domain, its modules and the parts it declares",
  code: "ts",
  test: "ts",
  enabled: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The folder has one page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That page is a page of a type at or beneath domain.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type is beneath domain and has a shape of its own, so it is refused here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No folder takes this shape and that one at once.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The folder takes the name that page gives its folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A second page in the folder is one the folder answers for beside the domain.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every other file in the folder is a part one of those two pages states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The folder every other folder in the workspace sits under takes this shape.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "That folder takes the name of the checkout rather than the name its domain gives.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subfolder named `modules` is a part of that page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subfolder named `scripts` is a part of that page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subfolder with a page the domain declares a part is a part too.",
    },

    {
      invariantKind: "invariant-kind/departure",
      statement: "A subfolder with no page the domain declares is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subfolder with a second page that is no domain of the first is no part.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A subfolder a file this page's own property names sits under is a part of that page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subfolder this page's own folder property names is a part of that page.",
    },
  ],
} as const satisfies FolderShape
