import type { Module } from "../code-system/module/module.page-type.ts"

export const minting = {
  id: "01a04e33-9351-7e79-8041-89abfa036830",
  pageTypeSlug: "module",
  slug: "minting",
  definition: "the check pages a test stands up in a root of its own",
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
  ],
} as const satisfies Module
