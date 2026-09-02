import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const addonInit = {
  id: "01a060ae-335f-75cf-867a-8b88bb3db05e",
  pageTypeSlug: "module",
  slug: "addon-init",
  definition: "the callback the game runs once it has loaded the add-on that asked",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The loading announcement carries the name of whichever add-on loaded.",
    },
    {
      invariantKind: "departure",
      statement: "An announcement naming another add-on is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "The listener is dropped before the callback runs.",
    },
  ],
} as const satisfies Module
