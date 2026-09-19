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
      statement: "A body may name the sort of push the token takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body naming no sort registers a token taking an alert.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sort that is neither an alert nor a live activity is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body carrying anything beyond those three is refused.",
    },
  ],
} as const satisfies Module
