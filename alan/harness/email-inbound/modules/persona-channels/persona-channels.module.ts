import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const personaChannels = {
  id: "01a0a026-66e5-7676-b4cd-dedec3726a54",
  type: "module",
  slug: "persona-channels",
  definition: "each persona's own email address against the persona that address names",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A persona stating no email address is on no channel.",
    },
    {
      invariantKind: "departure",
      statement: "An address is lowercased before anything matches a header against it.",
    },
  ],
} as const satisfies Module
