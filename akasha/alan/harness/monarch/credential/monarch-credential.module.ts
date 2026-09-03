import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchCredential = {
  id: "01a0685f-4ed9-74ca-87d5-38f3cedf684a",
  pageTypeSlug: "module",
  slug: "monarch-credential",
  definition: "the Monarch session headers, built from the cookie a signed-in browser holds",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The credential is the whole Cookie header from a signed-in session rather than an issued key.",
    },
    {
      invariantKind: "departure",
      statement: "The CSRF token is cut from the cookie rather than held apart from it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A cookie carrying no csrftoken is refused, because Monarch matches the header against the cookie and refuses the pair when they disagree.",
    },
    {
      invariantKind: "departure",
      statement:
        "The headers are frozen, so what is handed out cannot be altered by whoever holds it.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal says the cookie expires and says who can produce another.",
    },
    {
      invariantKind: "constraint",
      statement: "Only Alan at a signed-in browser can produce a cookie.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here keeps a cookie or reads one from a file.",
    },
  ],
} as const satisfies Module
