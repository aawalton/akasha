import type { Module } from "../../../code-system/module/module.page-type.ts"

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
        "A file stands beside a page when it carries the page's whole name and one part more.",
    },
    {
      invariantKind: "departure",
      statement: "The folder is read rather than the index.",
    },
    {
      invariantKind: "departure",
      statement: "A path that is no TypeScript file holds no page.",
    },
    {
      invariantKind: "departure",
      statement:
        "A folder that is not there holds no file which is an answer rather than a failure to read one.",
    },
    {
      invariantKind: "departure",
      statement: "What is answered is sorted.",
    },
    {
      invariantKind: "departure",
      statement: "One part more is a property's file whatever the property is called.",
    },
    {
      invariantKind: "departure",
      statement:
        "What stands beside several paths is answered once and sorted and holding none of the paths themselves.",
    },
    {
      invariantKind: "departure",
      statement: "The schema is not asked.",
    },
    {
      invariantKind: "departure",
      statement: "A file no page claims cannot stand.",
    },
    {
      invariantKind: "departure",
      statement:
        "The naming grammar lets only this page claim a file carrying its whole name and one part more.",
    },
  ],
} as const satisfies Module
