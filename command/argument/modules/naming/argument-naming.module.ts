import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const argumentNaming = {
  id: "01a09485-388d-7043-baf2-c88abca4e33e",
  type: "module",
  slug: "argument-naming",
  definition: "the argument pages a command names, as the index carries what each one states",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An argument is read by the slug the name after the page type carries.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "What is read of an argument is how it is spelled, what it carries and what it is for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The arguments are answered in the order the command names them.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An argument name reaching no page is answered with nothing in its place.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page stating neither how it is said nor what it is for is no argument here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A command naming no argument is answered without the index being read.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here loads a page.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes a help answer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An argument is written down the way the command naming it lets a call fill it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An argument taken at its flag is written down as that flag and its placeholder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An argument stating no placeholder is written down as its flag alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An argument taken as a word is written down as its placeholder alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A word argument stating no placeholder is written down by its slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An argument taken either way is written down as a word and then at its flag.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A placeholder is written in the angle brackets a page leaves off it.",
    },
  ],
} as const satisfies Module
