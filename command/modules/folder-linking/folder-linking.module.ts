import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const folderLinking = {
  id: "01a08e0f-1a66-7dc0-8cec-1028a7c33ae9",
  type: "module",
  slug: "folder-linking",
  definition: "the folder a page owns linked where that page says the folder is reached from",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page saying where its folder is reached has that folder linked there.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The folder linked is the folder holding that page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only the pages among the paths handed in are weighed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body with no key written in it is not loaded.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path opening with a tilde is read under the home handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A link already pointing where it should is left alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A link pointing anywhere else is taken away and made again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A link is put in place by a rename, so no call finds the path holding nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Something there that is no link is left as it is and said as wrong.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Two paths naming one link place that link once.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A link that could not be placed is said rather than thrown.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "What a page says is read off the page rather than off a table kept here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes inside the repository.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here says when a link is placed.",
    },
  ],
} as const satisfies Module
