import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const googleAuthGuard = {
  id: "01a0bafa-a730-7735-bd9a-e26e4084eadb",
  type: "page-type/module",
  slug: "google-auth-guard",
  definition: "the contributor a request's cookie reaches, and what ends that request's session",
  code: "ts",
  test: "ts",
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
      statement:
        "Better Auth states the cookies ending a session, and they are read off its answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A session that will not end hands back no cookie rather than an error.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A browser signed in as a person other than Alan only looks.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A session marked to look only is refused every request but a get, a head or an options.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That refusal is made before the request reaches any route.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A request with nobody signed in is left to the route to refuse.",
    },
  ],
  createdAt: "2026-09-19T18:43:04.112Z",
  updatedAt: "2026-10-24T21:46:01.700Z",
} as const satisfies Module
