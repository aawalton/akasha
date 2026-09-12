import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const argumentNaming = {
  id: "01a09485-388d-7043-baf2-c88abca4e33e",
  type: "module",
  slug: "argument-naming",
  definition: "the argument pages a command names, as the index carries what each one states",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An argument is read by the slug the name after the page type carries.",
    },
    {
      invariantKind: "departure",
      statement: "What is read of an argument is how it is said and what it is for.",
    },
    {
      invariantKind: "departure",
      statement: "The arguments are answered in the order the command names them.",
    },
    {
      invariantKind: "departure",
      statement: "An argument name reaching no page is answered with nothing in its place.",
    },
    {
      invariantKind: "departure",
      statement: "A page stating neither how it is said nor what it is for is no argument here.",
    },
    {
      invariantKind: "departure",
      statement: "A command naming no argument is answered without the index being read.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here loads a page.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a help answer.",
    },
  ],
} as const satisfies Module
