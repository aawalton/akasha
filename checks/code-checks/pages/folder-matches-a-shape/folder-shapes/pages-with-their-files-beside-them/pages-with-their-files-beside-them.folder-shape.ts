import type { FolderShape } from "../folder-shape.page-type.ts"

export const pagesWithTheirFilesBesideThem = {
  id: "01a08874-72ab-76c8-9f07-6b11e2dd3755",
  pageTypeSlug: "folder-shape",
  type: "folder-shape",
  slug: "pages-with-their-files-beside-them",
  definition:
    "the shape of a folder named pages with the pages of the page type above it and their files",
  code: "ts",
  test: "ts",
  enabled: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The folder is named `pages`.",
    },
    {
      invariantKind: "departure",
      statement: "The folder above has one page type.",
    },
    {
      invariantKind: "departure",
      statement: "That page type says which pages belong here.",
    },
    {
      invariantKind: "departure",
      statement: "Every page in the folder is of that page type.",
    },
    {
      invariantKind: "departure",
      statement: "A page has its files beside the page rather than in a folder of its own.",
    },
    {
      invariantKind: "departure",
      statement: "Every file in the folder is a page here or a file a page here states.",
    },
    {
      invariantKind: "absence",
      statement: "A file beside a page is judged where that page is judged.",
    },
    {
      invariantKind: "departure",
      statement: "The folder holds no folder.",
    },
    {
      invariantKind: "absence",
      statement: "A folder named `pages` holding page folders is judged by another shape.",
    },
    {
      invariantKind: "departure",
      statement: "A file that is neither a page nor a file beside a page is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A folder named `pages` above which no page type sits is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A folder named `pages` holding no page is refused.",
    },
  ],
} as const satisfies FolderShape
