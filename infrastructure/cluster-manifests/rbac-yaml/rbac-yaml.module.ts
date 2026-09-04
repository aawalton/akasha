import type { Module } from "@akasha/code-system/module"

export const rbacYaml = {
  id: "01a06860-955d-701e-aae0-27c0fd9da4fc",
  pageTypeSlug: "module",
  slug: "rbac-yaml",
  definition:
    "an rbac rule, role, binding or service account written out as the yaml Kubernetes is applied",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rule carrying a comment writes the comment above itself.",
    },
    {
      invariantKind: "departure",
      statement: "A rule holding a raw resource list writes that list rather than its parsed one.",
    },
  ],
} as const satisfies Module
