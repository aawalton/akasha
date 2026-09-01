import type { FolderShape } from "../folder-shape.page-type.ts"

export const pagesOfTheTypeAbove = {
  id: "01a05f26-edf0-78fe-b79b-4b1b278b55f2",
  pageTypeSlug: "folder-shape",
  slug: "pages-of-the-type-above",
  definition: "the shape of a folder named pages holding the pages of the page type above it",
  code: "ts",
  test: "ts",
  enabled: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The folder is named `pages`.",
    },
    {
      invariantKind: "departure",
      statement: "The folder above holds one page type and that page type says what belongs here.",
    },
    {
      invariantKind: "departure",
      statement: "A page sitting in the folder is of that page type.",
    },
    {
      invariantKind: "departure",
      statement: "A page carrying files of its own has a subfolder to itself.",
    },
    {
      invariantKind: "departure",
      statement: "Each subfolder holds one page of that page type.",
    },
    {
      invariantKind: "absence",
      statement: "What else a subfolder holds is judged where that subfolder is judged.",
    },
    {
      invariantKind: "departure",
      statement: "A folder named `pages` above which no page type sits is refused.",
    },
  ],
} as const satisfies FolderShape
