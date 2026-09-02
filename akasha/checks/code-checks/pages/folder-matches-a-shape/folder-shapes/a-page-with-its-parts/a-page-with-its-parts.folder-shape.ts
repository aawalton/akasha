import type { FolderShape } from "../folder-shape.page-type.ts"

export const aPageWithItsParts = {
  id: "01a05f26-edf0-768f-823e-e5442db4f971",
  pageTypeSlug: "folder-shape",
  slug: "a-page-with-its-parts",
  definition: "the shape of a folder named for the one page it holds, beside that page's parts",
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
      statement: "The folder is named what that page calls its folder.",
    },
    {
      invariantKind: "departure",
      statement: "Every other file in the folder is a part the page states.",
    },
    {
      invariantKind: "departure",
      statement: "Which files are parts is read off the file properties the page states.",
    },
    {
      invariantKind: "departure",
      statement: "A part whose name the property page states is a part under that name.",
    },
    {
      invariantKind: "departure",
      statement:
        "The secrets and the uncommitted values held beside the page are parts of the page.",
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
      statement: "A subfolder named anything else is no part of that page.",
    },
    {
      invariantKind: "absence",
      statement: "What a part holds is judged where that part is judged.",
    },
    {
      invariantKind: "departure",
      statement: "A folder holding no page is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A folder holding more than one page is refused.",
    },
  ],
} as const satisfies FolderShape
