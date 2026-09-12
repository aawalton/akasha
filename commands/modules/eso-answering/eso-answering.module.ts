import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const esoAnswering = {
  id: "01a0958c-22fc-7986-9f8d-a89cff5c57f4",
  type: "module",
  slug: "eso-answering",
  definition: "the one way into an eso command, its call read against that command's own page",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The call is read against the page handed in rather than flags spelled here.",
    },
    {
      invariantKind: "departure",
      statement: "The work is handed what the call said, under the keys the argument pages name.",
    },
    {
      invariantKind: "departure",
      statement: "A call the reader refuses is answered with those reasons and no work runs.",
    },
    {
      invariantKind: "departure",
      statement: "A work that threw after writing names in its refusal what that run had written.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here spells a flag, so which arguments a command takes is on its page.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file or writes one.",
    },
  ],
} as const satisfies Module
