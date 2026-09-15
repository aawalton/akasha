import type { FolderShape } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/folder-shape.page-type.types.ts"

export const pagesOfTheTypeAbove = {
  id: "01a05f26-edf0-78fe-b79b-4b1b278b55f2",
  type: "page-type/folder-shape",
  slug: "pages-of-the-type-above",
  definition: "the shape of a folder named pages with the pages of the page type above it",
  code: "ts",
  test: "ts",
  enabled: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The folder is named `pages`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The folder above has one page type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That page type says which pages belong here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page sitting in the folder is of that page type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The folder has page files alone or page folders alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The folder has no file beside a page file.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A file held uncommitted beside a page is no file beside that page here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Each subfolder has one page of that page type or one page that page type declares a part.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Anything else a subfolder holds is judged where that subfolder is judged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder named `pages` above which no page type sits is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file that is neither a page nor a file beside a page is refused.",
    },
  ],
} as const satisfies FolderShape
