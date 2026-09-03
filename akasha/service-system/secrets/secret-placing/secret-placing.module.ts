import type { Module } from "@akasha/code-system/module"

export const secretPlacing = {
  id: "01a06977-65e5-74e7-9c45-ae62673340e9",
  pageTypeSlug: "module",
  slug: "secret-placing",
  definition:
    "the secret values a plan's manifests ask for, put into the cluster from secret pages",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A value placed in the cluster comes from a secret page and from nowhere else.",
    },
    {
      invariantKind: "departure",
      statement:
        "Two secret pages placing a value in one resource under one key is refused before anything is applied.",
    },
    {
      invariantKind: "departure",
      statement:
        "A manifest asking for a secret no page holds is reported rather than passed over.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a secret page.",
    },
  ],
} as const satisfies Module
