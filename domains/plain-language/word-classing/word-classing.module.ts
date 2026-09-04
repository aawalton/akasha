import type { Module } from "@akasha/code-system/module"

export const wordClassing = {
  id: "01a05d93-dbed-7e96-a4d2-43e3cf407d27",
  pageTypeSlug: "module",
  slug: "word-classing",
  definition: "the classes a word may carry, before a grammar chooses between them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A closed class is written out word by word.",
    },
    {
      invariantKind: "departure",
      statement: "A word in no closed class is classed by its ending.",
    },
    {
      invariantKind: "departure",
      statement: "An auxiliary is a plain verb as well.",
    },
    {
      invariantKind: "departure",
      statement:
        "A pronoun naming what sits outside its sentence is classed apart from one naming what sits inside.",
    },
    {
      invariantKind: "departure",
      statement: "A relativizer naming what that relativizer refers to is a noun as well.",
    },
    {
      invariantKind: "departure",
      statement:
        "A relativizer that can open a clause used as a noun is classed apart from one that cannot.",
    },
    {
      invariantKind: "departure",
      statement: "A word opening with a backtick is a noun.",
    },
    {
      invariantKind: "absence",
      statement: "No word is looked up in a list built from example text.",
    },
  ],
} as const satisfies Module
