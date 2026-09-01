import type { Module } from "@akasha/code-system/module"

export const plainGrammar = {
  id: "01a05d93-dbee-7669-8dd5-73c44646e342",
  pageTypeSlug: "module",
  slug: "plain-grammar",
  definition: "the rules a sentence must parse under to be called plain",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The grammar is read as text rather than built by hand.",
    },
    {
      invariantKind: "departure",
      statement: "One sentence carries one clause.",
    },
    {
      invariantKind: "departure",
      statement: "A clause joined to another by `and` is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A relative clause is refused until Alan calls one plain.",
    },
    {
      invariantKind: "stopgap",
      statement: "`rather than` parses as an adverb before a preposition.",
    },
    {
      invariantKind: "gap",
      statement: "Every construction the grammar admits was put to Alan first.",
    },
  ],
} as const satisfies Module
