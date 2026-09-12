import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const monarchDomainFiles = {
  id: "01a06865-ecc3-7ebe-8112-4082e54070c4",
  type: "module",
  slug: "monarch-domain-files",
  definition: "the account, category, tag and holding pages, composed from Monarch's own rows",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A page is one TypeScript file with one exported object named for the page's slug.",
    },
    {
      invariantKind: "departure",
      statement: "The whole body is composed rather than a line of that body patched.",
    },
    {
      invariantKind: "departure",
      statement: "The keys a page states are stated in one settled order.",
    },
    {
      invariantKind: "departure",
      statement: "A page's body is composed by `page-body` rather than composed here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges a line's width.",
    },
    {
      invariantKind: "departure",
      statement: "A page's identity is minted once and kept when the page is rewritten.",
    },
    {
      invariantKind: "departure",
      statement: "A page composed names its type from the root rather than by a relative path.",
    },
    {
      invariantKind: "departure",
      statement:
        "The type a page names sits one folder above the folder that page is written into.",
    },
    {
      invariantKind: "departure",
      statement:
        "Two rows slugging alike are told apart by Monarch's own id rather than by a number.",
    },

    {
      invariantKind: "departure",
      statement: "Every page landed is landed from inside akasha.",
    },
  ],
} as const satisfies Module
