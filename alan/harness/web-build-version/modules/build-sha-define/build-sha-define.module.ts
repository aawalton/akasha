import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const buildShaDefine = {
  id: "01a05c48-deeb-7010-a5ad-81104931a96d",
  type: "page-type/module",
  slug: "build-sha-define",
  definition: "how code finds the id of the commit a website is built from",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The commit the environment states wins over the commit the checkout's head says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A checkout that cannot be asked yields an empty string rather than throwing.",
    },
  ],
  createdAt: "2026-09-01T09:24:34.667Z",
  updatedAt: "2026-10-30T16:02:51.140Z",
} as const satisfies Module
