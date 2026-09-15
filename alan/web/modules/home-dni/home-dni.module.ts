import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const homeDni = {
  id: "01a0655d-daa7-7945-ac04-32daf772c01c",
  type: "module",
  slug: "home-dni",
  definition: "the navigation item the home screen opens on",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The home screen opens on the nav item this module's constant names.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing refuses taking away the nav page that constant names.",
    },
  ],
} as const satisfies Module
