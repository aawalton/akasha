import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const webPhraseSeeding = {
  id: "01a0e33b-e946-7109-a820-aa4d1d517a4f",
  type: "page-type/module",
  slug: "web-phrase-seeding",
  definition: "the web phrases a root's loader reads so the first draw already has them",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A phrase is read as its slug and its title and nothing else.",
    },
  ],
  createdAt: "2026-09-27T14:19:09.510Z",
  updatedAt: "2026-09-27T14:19:30.000Z",
} as const satisfies Module
