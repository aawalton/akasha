import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const answerPageWrite = {
  id: "01a0640f-8510-7ab5-87bf-f593cb1eb7a7",
  type: "module",
  slug: "answer-page-write",
  definition: "a page write asked for over http, run and answered",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A writer who is not signed in is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A write is recorded against the name the caller writes as.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The name a site writes as is stated once at the site's first write.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A write that throws is answered as a bad request rather than as a failure.",
    },
  ],
} as const satisfies Module
