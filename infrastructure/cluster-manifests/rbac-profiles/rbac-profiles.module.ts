import type { Module } from "@akasha/code-system/module"

export const rbacProfiles = {
  id: "01a06860-955d-701f-aec7-c1f9a35c58d5",
  pageTypeSlug: "module",
  slug: "rbac-profiles",
  definition: "every namespace role profile the cluster manifests declare, read off the checkout",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A profile source is found by where it stands rather than by anything importing it.",
    },
    {
      invariantKind: "departure",
      statement: "A profile source exporting no profile refuses the whole reading.",
    },
    {
      invariantKind: "departure",
      statement: "A profile source naming no package refuses the whole reading.",
    },
    {
      invariantKind: "absence",
      statement: "Finding no profile source at all is refused rather than read as nothing granted.",
    },
  ],
} as const satisfies Module
