import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const googleAuthGuard = {
  id: "01a0bafa-a730-7735-bd9a-e26e4084eadb",
  type: "page-type/module",
  slug: "google-auth-guard",
  definition:
    "the contributor a request's cookie reaches, and where a request reaching none is sent",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Who is signed in is read off the cookie, and no page is read to answer it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A session naming no contributor is nobody.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cookie that will not read is nobody rather than an error.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A request reaching nobody goes to the sign-in page naming where it was headed.",
    },
  ],
} as const satisfies Module
