import type { Module } from "@akasha/code-system/module"

export const routerAppDiscovery = {
  id: "01a06880-1000-7000-9000-000000000005",
  pageTypeSlug: "module",
  slug: "router-app-discovery",
  definition: "the router apps standing in the tree, each with its app folder and its build root",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A router app is marked by a react router configuration file.",
    },
    {
      invariantKind: "departure",
      statement: "An app's folder is read from that configuration.",
    },
    {
      invariantKind: "departure",
      statement: "An app's build root is the nearest folder above it holding a manifest.",
    },
    {
      invariantKind: "departure",
      statement: "An app under no manifest builds at the repository root.",
    },
    {
      invariantKind: "departure",
      statement: "Every path answered is relative to the repository root.",
    },
  ],
} as const satisfies Module
