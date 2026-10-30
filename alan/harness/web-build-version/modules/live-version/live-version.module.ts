import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const liveVersion = {
  id: "01a05c48-deeb-700f-82ef-afcd8de33755",
  type: "page-type/module",
  slug: "live-version",
  definition:
    "how a website responds to a request for the id of the commit the website is built from",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer is never cached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build with no commit answers with the reason rather than with nothing.",
    },
  ],
  createdAt: "2026-09-01T09:24:34.667Z",
  updatedAt: "2026-10-30T16:03:16.413Z",
} as const satisfies Module
