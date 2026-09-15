import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const buildShaDefine = {
  id: "01a05c48-deeb-7010-a5ad-81104931a96d",
  type: "page-type/module",
  slug: "build-sha-define",
  definition: "the commit a bundler compiles into the build it is making",
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
} as const satisfies Module
