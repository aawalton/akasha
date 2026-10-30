import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const signInNaming = {
  id: "01a0baf8-3272-7b17-8439-b3653a48597a",
  type: "page-type/module",
  slug: "sign-in-naming",
  definition: "the names of sign-ins and contributors",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An address is lowercased before hashing and changed no other way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a provider calls a person is hashed as that provider wrote it.",
    },
  ],
  createdAt: "2026-09-19T18:40:23.154Z",
  updatedAt: "2026-10-30T15:35:51.913Z",
} as const satisfies Module
