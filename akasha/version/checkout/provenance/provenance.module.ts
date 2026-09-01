import type { Module } from "@akasha/code-system/module"

export const provenance = {
  id: "01a05c9d-dcce-77cf-b404-ef5d630d82f9",
  pageTypeSlug: "module",
  slug: "provenance",
  definition: "the commit, branch and cleanliness of the checkout a running file was loaded from",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A checkout is the nearest folder above whose manifest declares workspaces.",
    },
    {
      invariantKind: "departure",
      statement: "A tree git describes at another path is unattributable.",
    },
    {
      invariantKind: "departure",
      statement:
        "A commit is reported only beside a reading of the working tree the commit describes.",
    },
  ],
} as const satisfies Module
