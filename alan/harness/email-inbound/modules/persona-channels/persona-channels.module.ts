import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const personaChannels = {
  id: "01a0a026-66e5-7676-b4cd-dedec3726a54",
  type: "page-type/module",
  slug: "persona-channels",
  definition: "how code finds the persona that has an email address",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A persona stating no email address is on no channel.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An address is lowercased before anything matches a header against it.",
    },
  ],
  createdAt: "2026-09-14T13:41:06.405Z",
  updatedAt: "2026-10-30T15:48:03.638Z",
} as const satisfies Module
