import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pushRegisterBody = {
  id: "01a05b54-a907-7932-8f8a-8aed5987a345",
  type: "page-type/module",
  slug: "push-register-body",
  definition: "the body the push registration route takes",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A body with no token is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The only platform named is iOS.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body carrying anything beyond the token and the platform is refused.",
    },
  ],
  createdAt: "2026-09-01T04:57:50.087Z",
  updatedAt: "2026-10-18T13:24:10.292Z",
} as const satisfies Module
