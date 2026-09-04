import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const manifestPath = {
  id: "01a06d23-a915-76dc-8349-443fecd47696",
  pageTypeSlug: "module",
  slug: "manifest-path",
  definition: "the path a synth writes one of its named manifests to",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A declaration names the synth file rather than the manifest that synth writes.",
    },
    {
      invariantKind: "departure",
      statement: "The synth file a declaration names is committed.",
    },
    {
      invariantKind: "departure",
      statement: "Where a synth writes its manifests is settled in one place.",
    },
  ],
} as const satisfies Module
