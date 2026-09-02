import type { Module } from "../../code-system/modules/module.page-type.ts"

export const workspaceBins = {
  id: "01a05c48-deeb-700c-9384-d37c13743ae5",
  pageTypeSlug: "module",
  slug: "workspace-bins",
  definition:
    "the command names the manifests of a workspace declare, and which of them are absent",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A bin stated as one string is named for the manifest's own name without its scope.",
    },
  ],
} as const satisfies Module
