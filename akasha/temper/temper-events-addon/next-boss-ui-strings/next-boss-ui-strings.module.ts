import type { Module } from "@akasha/code-system/module"

export const nextBossUiStrings = {
  id: "01a06157-8357-7537-a6bd-307d783c5836",
  pageTypeSlug: "module",
  slug: "next-boss-ui-strings",
  definition: "the words this tracker shows, and the string ids it makes for them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A string id is made at load rather than read from a language file.",
    },
    {
      invariantKind: "departure",
      statement: "A district's name opens with the number of its place on the round.",
    },
    {
      invariantKind: "departure",
      statement: "A key binding's name is a string id of its own.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here is written in a language other than English.",
    },
  ],
} as const satisfies Module
