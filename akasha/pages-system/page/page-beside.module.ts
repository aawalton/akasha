import type { Module } from "../../code-system/module/module.page-type.ts"

export const pageBeside = {
  id: "01a04ea7-b2ea-7d22-ac4c-78cd0b3eaa92",
  pageTypeSlug: "module",
  slug: "page-beside",
  definition: "the files standing beside a page, as they stand on disk",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A file stands beside a page when it carries the page's whole name and one part more, so a page whose name merely begins with another's stands beside nothing of it.",
    },
    {
      invariantKind: "departure",
      statement:
        "The folder is read, never the index, so a file that stands is answered whether or not anything filed it and whether or not the page states it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path that is no TypeScript file holds no page, so nothing is answered as standing beside it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A folder that is not there holds no file, which is an answer rather than a failure to read one.",
    },
    {
      invariantKind: "departure",
      statement:
        "What is answered is sorted, so what stands beside a page reads the same however the folder was listed.",
    },
    {
      invariantKind: "departure",
      statement:
        "One part more is a property's file whatever the property is called, so a file property added elsewhere is seen here without this being changed.",
    },
    {
      invariantKind: "departure",
      statement:
        "What stands beside several paths is answered once, sorted, holding none of the paths themselves, so every command carrying a file along takes the same files with it.",
    },
    {
      invariantKind: "departure",
      statement:
        "The schema is not asked, because a file no page claims cannot stand and the naming grammar lets only this page claim a file carrying its whole name and one part more.",
    },
  ],
} as const satisfies Module
