import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchCredential = {
  id: "01a0685f-4ed9-74ca-87d5-38f3cedf684a",
  type: "page-type/module",
  slug: "monarch-credential",
  definition: "the Monarch session headers, built from the cookie a signed-in browser holds",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The credential is the whole Cookie header from a signed-in session rather than an issued key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The CSRF token is cut from the cookie rather than held apart from that cookie.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cookie with no csrftoken is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The headers are frozen.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The headers handed out cannot be altered by their holder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The refusal says the cookie expires and says who can produce another.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Only Alan at a signed-in browser can produce a cookie.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here keeps a cookie or reads a cookie from a file.",
    },
  ],
} as const satisfies Module
