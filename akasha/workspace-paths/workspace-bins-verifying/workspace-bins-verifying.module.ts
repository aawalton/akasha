import type { Module } from "../../code-system/modules/module.page-type.ts"

export const workspaceBinsVerifying = {
  id: "01a0683d-3c17-736b-ae61-e1f0c1749067",
  pageTypeSlug: "module",
  slug: "workspace-bins-verifying",
  definition:
    "whether every command name the workspace manifests declare is linked under node_modules/.bin",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The repository root is taken as an argument rather than worked out from here.",
    },
    {
      invariantKind: "departure",
      statement: "A bin declared by two manifests is counted once.",
    },
  ],
} as const satisfies Module
