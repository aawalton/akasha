import type { Module } from "../../../code-system/module/module.page-type.ts"

export const pageFileName = {
  id: "01a04e3b-cd68-7be9-bd0f-a4ff61fa0c05",
  pageTypeSlug: "module",
  slug: "page-file-name",
  definition: "what a file's name says about the page it holds or stands beside",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A name is read as its last three dotted parts. A stem carrying a dot stays the stem, and the tail and what the file holds follow it.",
    },
    {
      invariantKind: "departure",
      statement:
        "Whether a tail names a page type or a file property is answered against the sets handed in, never from the name alone.",
    },
    {
      invariantKind: "departure",
      statement: "A name tailed by a page type but not a TypeScript file is no page.",
    },
    {
      invariantKind: "departure",
      statement:
        "What a property's file holds is read as it is written. A property stands in whatever kind of file suits it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page and a file standing beside it answer the same page. The two are matched without either being read.",
    },
    {
      invariantKind: "departure",
      statement:
        "The name a property's file stands under is built here as well as read here. What `heldIn` takes apart and what `besideAt` puts together stay one rule.",
    },
    {
      invariantKind: "departure",
      statement: "A path that is no TypeScript file is refused rather than answered.",
    },
    {
      invariantKind: "departure",
      statement:
        "The tail `uncommitted` is reserved. A file carrying it holds the uncommitted values of the page it stands beside, and is never a property's file nor a page.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing here reads the index or the disk. A name that answers a page is a name shaped like one, whether or not that page stands.",
    },
  ],
} as const satisfies Module
