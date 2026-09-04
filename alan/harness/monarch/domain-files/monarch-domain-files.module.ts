import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchDomainFiles = {
  id: "01a06865-ecc3-7ebe-8112-4082e54070c4",
  pageTypeSlug: "module",
  slug: "monarch-domain-files",
  definition: "the account, category, tag and holding pages, composed from Monarch's own rows",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A page is one TypeScript file holding one exported object named for the page's slug.",
    },
    {
      invariantKind: "departure",
      statement:
        "The whole body is composed rather than a line of it patched, because there is no front matter to patch.",
    },
    {
      invariantKind: "departure",
      statement: "The keys a page states are stated in one settled order.",
    },
    {
      invariantKind: "departure",
      statement:
        "A value whose line runs past the width the formatter wraps at stands on a line of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A page's identity is minted once and kept when the page is rewritten.",
    },
    {
      invariantKind: "departure",
      statement:
        "Two rows slugging alike are told apart by Monarch's own id rather than by a number.",
    },
    {
      invariantKind: "departure",
      statement: "A page holds the fields its readers name rather than a copy of Monarch's reply.",
    },
    {
      invariantKind: "departure",
      statement: "Every page landed is landed from inside akasha.",
    },
  ],
} as const satisfies Module
