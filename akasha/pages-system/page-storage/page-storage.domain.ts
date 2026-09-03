import type { Domain } from "@akasha/domain-system/domain"

export const pageStorage = {
  id: "01a06558-53dd-7ac7-8fdc-e45804c712aa",
  pageTypeSlug: "domain",
  slug: "page-storage",
  definition: "pages kept as files in a git repository",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Reading a page needs nothing but its repository.",
    },
    {
      invariantKind: "departure",
      statement: "A page's repository is on the workstation.",
    },
    {
      invariantKind: "departure",
      statement: "Both sides of a relation between pages land in one commit.",
    },
    {
      invariantKind: "departure",
      statement: "A page's history is its repository's history.",
    },
    {
      invariantKind: "departure",
      statement: "A page has one kind of deletion, and that deletion removes the file.",
    },
    {
      invariantKind: "departure",
      statement: "A value a page works out is in no file.",
    },
    {
      invariantKind: "departure",
      statement:
        "A value is in the page's own file unless the value is secret, uncommitted or a file property.",
    },
    {
      invariantKind: "departure",
      statement:
        "The page a relation names is found by what the files say rather than by what the files are called.",
    },
    {
      invariantKind: "gap",
      statement: "Reading a page's file and writing it back leaves the file unchanged.",
    },
  ],
} as const satisfies Domain
