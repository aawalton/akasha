import type { Module } from "../../code-system/module/module.page-type.ts"

export const minting = {
  id: "01a04e33-9351-7e79-8041-89abfa036830",
  pageTypeSlug: "module",
  slug: "minting",
  definition: "the pages a test stands up in a root of its own, and the ids it mints them under",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A check a test mints states each phase it runs on, as a real check page does.",
    },
    {
      invariantKind: "departure",
      statement: "One place mints them, so a change to what a check page is lands in one place.",
    },
    {
      invariantKind: "departure",
      statement:
        "A minted id is worked out from the slug it is minted for, so nothing counts and no id turns on the order the mints ran in.",
    },
    {
      invariantKind: "departure",
      statement:
        "Two slugs minted into one root are two ids, and one slug minted twice is one id, because what a page is stands behind its identity.",
    },
  ],
} as const satisfies Module
