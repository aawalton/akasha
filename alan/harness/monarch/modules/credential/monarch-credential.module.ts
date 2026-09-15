import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchCredential = {
  id: "01a0685f-4ed9-74ca-87d5-38f3cedf684a",
  type: "page-type/module",
  slug: "monarch-credential",
  definition: "the Monarch session headers, built from the cookie a signed-in browser holds",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The credential is the whole Cookie header from a signed-in session rather than an issued key.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The CSRF token is cut from the cookie rather than held apart from that cookie.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A cookie with no csrftoken is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The headers are frozen.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The headers handed out cannot be altered by their holder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The refusal says the cookie expires and says who can produce another.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Only Alan at a signed-in browser can produce a cookie.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here keeps a cookie or reads a cookie from a file.",
    },
  ],
} as const satisfies Module
