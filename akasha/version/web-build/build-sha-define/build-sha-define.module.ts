import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const buildShaDefine = {
  id: "01a05c48-deeb-7010-a5ad-81104931a96d",
  pageTypeSlug: "module",
  slug: "build-sha-define",
  definition: "the commit a bundler compiles into the build it is making",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "What the environment states wins over what the checkout's head says.",
    },
    {
      invariantKind: "departure",
      statement: "A checkout that cannot be asked yields an empty string rather than throwing.",
    },
  ],
} as const satisfies Module
