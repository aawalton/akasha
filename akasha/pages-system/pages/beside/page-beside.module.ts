import type { Module } from "@akasha/code-system/module"

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
        "A file is beside a page when the file carries the page's whole name and a property's sections.",
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
        "A folder that is not there is answered as holding no file rather than as a read that failed.",
    },
    {
      invariantKind: "departure",
      statement: "What is answered is sorted.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which sections a property's file carries is answered by the naming grammar rather than here.",
    },
    {
      invariantKind: "departure",
      statement: "A property's file is beside its page whatever the property is called.",
    },
    {
      invariantKind: "departure",
      statement: "A name carrying sections that name no property of the page is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "What is beside several paths holds no repeated file.",
    },
    {
      invariantKind: "departure",
      statement: "What is beside several paths is sorted.",
    },
    {
      invariantKind: "departure",
      statement: "What is beside several paths holds no path handed in.",
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
        "The naming grammar lets only this page claim a file carrying its name and a property's sections.",
    },
  ],
} as const satisfies Module
