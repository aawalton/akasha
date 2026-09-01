import type { Module } from "@akasha/code-system/module"

export const plainGrammar = {
  id: "01a05d93-dbee-7669-8dd5-73c44646e342",
  pageTypeSlug: "module",
  slug: "plain-grammar",
  definition: "a sentence judged plain, or named for the shape that refuses it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The grammar is read as text rather than built by hand.",
    },
    {
      invariantKind: "departure",
      statement: "Every rule the grammar holds is read from a sentence shape.",
    },
    {
      invariantKind: "departure",
      statement: "A sentence the plain grammar refuses is put to each refused shape in turn.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the first refused shape whose rules let the sentence parse.",
    },
    {
      invariantKind: "departure",
      statement: "One sentence carries one clause.",
    },
    {
      invariantKind: "gap",
      statement: "Every construction the grammar admits was put to Alan first.",
    },
  ],
} as const satisfies Module
