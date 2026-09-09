import type { FolderShape } from "../folder-shape.page-type.ts"

export const aPageWithItsParts = {
  id: "01a05f26-edf0-768f-823e-e5442db4f971",
  pageTypeSlug: "folder-shape",
  slug: "a-page-with-its-parts",
  definition: "the shape of a folder named for the one page it has, beside that page's parts",
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
      statement: "The folder's name is the name that page gives its folder.",
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
      statement:
        "A subfolder named `sections` is a part of that page, and `sections-of-the-book-above` judges it.",
    },
    {
      invariantKind: "departure",
      statement: "A subfolder named anything else is no part of that page.",
    },
    {
      invariantKind: "absence",
      statement: "The paths a part has are judged where that part is judged.",
    },
    {
      invariantKind: "departure",
      statement: "A folder with no page is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A folder holding more than one page is refused.",
    },
  ],
} as const satisfies FolderShape
