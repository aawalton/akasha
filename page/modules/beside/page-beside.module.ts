import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageBeside = {
  id: "01a04ea7-b2ea-7d22-ac4c-78cd0b3eaa92",
  type: "module",
  slug: "page-beside",
  definition: "the files beside a page, as they are on disk",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A file is beside a page when the file has the page's whole name and a property's sections.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The folder is read rather than the index.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path that is no TypeScript file has no page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A folder that is not there is answered as holding no file rather than as a read that failed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The files answered are sorted.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Which sections a property's file carries is answered by the naming grammar rather than here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A property's file is beside its page whatever the property is called.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name with sections that name no property of the page is left alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The files beside several paths have no repeated file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The files beside several paths are sorted.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The files beside several paths have no path handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The schema is not asked.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A section list of two is read only where the key set handed in has that key.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file no page claims cannot exist.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The naming grammar lets only this page claim a file with its name and a property's sections.",
    },
  ],
} as const satisfies Module
