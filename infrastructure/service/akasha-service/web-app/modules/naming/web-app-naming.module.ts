import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const webAppNaming = {
  id: "01a0e2ae-06dd-7a17-8896-1f2db3d74062",
  type: "page-type/module",
  slug: "web-app-naming",
  definition: "the name a web app is shown under, read off its page",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A web app is shown under its page's title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A web app whose page has no title is shown under its slug.",
    },
  ],
} as const satisfies Module
